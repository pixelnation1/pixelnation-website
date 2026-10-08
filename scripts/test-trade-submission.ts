import assert from "node:assert/strict";
import { POST } from "../app/api/trade/submissions/route";
const valid = { firstName: "Test", lastName: "Only", email: "test@example.com", phone: "620-779-7158", category: "PlayStation", brand: "Sony", model: "PS5", workingStatus: "Working", cosmeticCondition: "Good", includedAccessories: "Controller", preferredPayment: "Cash", consent: true };
async function main() {
 const keys = ["CONTACT_WEBHOOK_URL", "RESEND_API_KEY", "RESEND_FROM_EMAIL"];
 const saved = keys.map(key => process.env[key]);
 const originalFetch = globalThis.fetch;
 let index = 0;
 async function check(body: unknown, status: number) {
  const response = await POST(new Request("https://example.com/api/trade/submissions", { method: "POST", headers: { "x-real-ip": `test-${index++}` }, body: JSON.stringify(body) }));
  assert.equal(response.status, status);
  const result = await response.json();
  assert.equal(result.ok === true, status === 200);
 }
 try {
  keys.forEach(key => delete process.env[key]);
  globalThis.fetch = async () => { throw new Error("No delivery expected"); };
  for (const body of [null, [], { ...valid, firstName: 42 }, { ...valid, consent: "true" }, { ...valid, photoDataUrls: {} }, { ...valid, photoDataUrls: ["invalid"] }]) await check(body, 400);
  await check(valid, 503);
  process.env.CONTACT_WEBHOOK_URL = "https://example.com/hook";
  globalThis.fetch = async () => new Response(null, { status: 500 });
  await check(valid, 503);
  globalThis.fetch = async () => { throw new Error("Network failure"); };
  await check(valid, 503);
  const photo = "data:image/png;base64,YQ==";
  globalThis.fetch = async (_url, init) => {
   assert.ok(init?.signal);
   assert.deepEqual(JSON.parse(String(init?.body)).photoDataUrls, [photo]);
   return new Response(null, { status: 204 });
  };
  await check({ ...valid, photoDataUrls: [photo] }, 200);
  delete process.env.CONTACT_WEBHOOK_URL;
  process.env.RESEND_API_KEY = "test";
  process.env.RESEND_FROM_EMAIL = "test@example.com";
  globalThis.fetch = async () => Response.json({});
  await check(valid, 503);
  globalThis.fetch = async () => Response.json({ id: "test-receipt" });
  await check(valid, 200);
  console.log(`PASS: ${index} trade form validation and delivery-response cases; no real messages sent.`);
 } finally {
  globalThis.fetch = originalFetch;
  keys.forEach((key, i) => { if (saved[i] === undefined) delete process.env[key]; else process.env[key] = saved[i]; });
 }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
