import assert from "node:assert/strict";
import { POST } from "../app/api/events/register/route";
import { STORE_EVENTS, seatsRemaining, registrationStatusLabel } from "../lib/events";

const event = STORE_EVENTS.find(event => event.slug === "magic-draft-aug-29")!;
const savedEvent = { ...event };
const keys = ["EVENT_REGISTRATION_WEBHOOK_URL", "CONTACT_WEBHOOK_URL", "RESEND_API_KEY", "RESEND_FROM_EMAIL"] as const;
const savedEnv = keys.map(key => process.env[key]);
const originalFetch = globalThis.fetch;
const payload = { eventSlug: event.slug, name: "Test", email: "test@example.com", playerCount: 1 };
let serial = 0;
async function request(body: unknown) {
  return POST(new Request("https://example.com/api/events/register", { method: "POST", headers: { "x-forwarded-for": `test-${serial++}` }, body: JSON.stringify(body) }));
}
async function main() {
  try {
    Object.assign(event, { startDate: "2099-01-01", status: "scheduled" });
    assert.equal(seatsRemaining(event), null);
    assert.match(registrationStatusLabel(event), /confirm availability/);
    for (const body of [null, [], { ...payload, name: 123 }, { ...payload, phone: {} }, { ...payload, playerCount: "1" }, { ...payload, playerCount: 0 }]) {
      assert.equal((await request(body)).status, 400);
    }
    const cases = [
      { label: "no delivery configuration", env: {}, status: 503, calls: 0 },
      { label: "key without sender", env: { RESEND_API_KEY: "test" }, status: 503, calls: 0 },
      ...[200, 204, 400, 500].map(code => ({ label: `webhook ${code}`, env: { EVENT_REGISTRATION_WEBHOOK_URL: "https://example.com/hook" }, code, status: code < 300 ? 200 : 503, calls: 1 })),
      { label: "network timeout", env: { CONTACT_WEBHOOK_URL: "https://example.com/hook" }, throws: true, status: 503, calls: 1 },
      { label: "webhook takes precedence", env: { EVENT_REGISTRATION_WEBHOOK_URL: "https://example.com/hook", RESEND_API_KEY: "test", RESEND_FROM_EMAIL: "test@example.com" }, code: 204, status: 200, calls: 1 },
      { label: "email accepted", env: { RESEND_API_KEY: "test", RESEND_FROM_EMAIL: "test@example.com" }, receipt: true, status: 200, calls: 1 },
      { label: "email missing receipt", env: { RESEND_API_KEY: "test", RESEND_FROM_EMAIL: "test@example.com" }, status: 503, calls: 1 },
    ];
    for (const test of cases) {
      keys.forEach(key => delete process.env[key]);
      Object.assign(process.env, test.env);
      let calls = 0;
      globalThis.fetch = async (_url, init) => {
        calls++;
        assert.ok(init?.signal);
        if ("throws" in test) throw new DOMException("timeout", "TimeoutError");
        const code = "code" in test ? test.code : 200;
        return new Response(code === 204 ? null : JSON.stringify("receipt" in test ? { id: "receipt" } : {}), { status: code });
      };
      const response = await request(payload);
      assert.equal(response.status, test.status, test.label);
      const result = await response.json();
      assert.equal(result.ok, test.status === 200, test.label);
      if (result.ok) {
        assert.equal(result.status, "requested");
        assert.match(result.message, /not reserved/);
      }
      assert.equal(calls, test.calls, test.label);
      console.log(`PASS ${test.label}`);
    }
    event.status = "sold-out";
    assert.equal((await request(payload)).status, 400);
    event.status = "cancelled";
    assert.equal((await request(payload)).status, 400);
    Object.assign(event, savedEvent);
    assert.equal((await request(payload)).status, 400);
    console.log("PASS invalid input, manual capacity, sold-out, cancelled, and past-event guards");
  } finally {
    Object.assign(event, savedEvent);
    globalThis.fetch = originalFetch;
    keys.forEach((key, i) => { if (savedEnv[i] === undefined) delete process.env[key]; else process.env[key] = savedEnv[i]; });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
