import assert from "node:assert/strict";
import { POST } from "../app/api/contact/route";

const payload = { name: "Delivery test", email: "test@example.com", phone: "620-779-7158", service: "General Question", description: "Automated delivery regression test", preferredContact: "Email", smsConsent: false };
const keys = ["CONTACT_WEBHOOK_URL", "RESEND_API_KEY", "RESEND_FROM_EMAIL"] as const;
const saved = keys.map(key => process.env[key]);
const originalFetch = globalThis.fetch;
const cases = [
  { name: "unconfigured", env: {}, status: 503, calls: 0 },
  { name: "key without sender", env: { RESEND_API_KEY: "test" }, status: 503, calls: 0 },
  { name: "sender without key", env: { RESEND_FROM_EMAIL: "test@example.com" }, status: 503, calls: 0 },
  ...[200, 204, 400, 429, 500].map(code => ({ name: `webhook ${code}`, env: { CONTACT_WEBHOOK_URL: "https://example.com/hook" }, code, status: code < 300 ? 200 : 503, calls: 1 })),
  { name: "webhook network failure", env: { CONTACT_WEBHOOK_URL: "https://example.com/hook" }, throws: true, status: 503, calls: 1 },
  { name: "webhook takes precedence", env: { CONTACT_WEBHOOK_URL: "https://example.com/hook", RESEND_API_KEY: "test", RESEND_FROM_EMAIL: "test@example.com" }, code: 204, status: 200, calls: 1 },
  ...[200, 403, 429, 500].map(code => ({ name: `resend ${code}`, env: { RESEND_API_KEY: "test", RESEND_FROM_EMAIL: "test@example.com" }, code, receipt: true, status: code === 200 ? 200 : 503, calls: 1 })),
  { name: "resend missing receipt", env: { RESEND_API_KEY: "test", RESEND_FROM_EMAIL: "test@example.com" }, code: 200, status: 503, calls: 1 },
  { name: "resend timeout", env: { RESEND_API_KEY: "test", RESEND_FROM_EMAIL: "test@example.com" }, throws: true, status: 503, calls: 1 },
];
async function main() {
  try {
    for (const test of cases) {
      for (const key of keys) delete process.env[key];
      Object.assign(process.env, test.env);
      let calls = 0;
      globalThis.fetch = async (_input, init) => {
        calls++;
        assert.ok(init?.signal, "delivery must have a timeout signal");
        if ("throws" in test && test.throws) throw new DOMException("timeout", "TimeoutError");
        const body = JSON.parse(String(init?.body));
        assert.equal(body.to instanceof Array ? body.to[0] : body.to, "support@pixelnation.co");
        if (!process.env.CONTACT_WEBHOOK_URL) assert.equal(body.reply_to, payload.email);
        const code = "code" in test ? test.code : 200;
        return new Response(code === 204 ? null : JSON.stringify("receipt" in test && test.receipt ? { id: "test-receipt" } : {}), { status: code });
      };
      const result = await POST(new Request("https://example.com/api/contact", { method: "POST", body: JSON.stringify(payload) }));
      assert.equal(result.status, test.status, test.name);
      const body = await result.json();
      assert.equal(body.ok === true, test.status === 200, test.name);
      if (test.status === 503) assert.match(body.error, /call.*email/);
      assert.equal(calls, test.calls, test.name);
      console.log(`PASS ${test.name}`);
    }
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, i) => { if (saved[i] === undefined) delete process.env[key]; else process.env[key] = saved[i]; });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
