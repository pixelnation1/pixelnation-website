import QRCode from "qrcode";
import jsQR from "jsqr";
import { PNG } from "pngjs";

const EXPECTED =
  "https://www.pixelnation.co/communities/check-in?location=store";

const pngBuffer = await QRCode.toBuffer(EXPECTED, {
  type: "png",
  errorCorrectionLevel: "M",
  margin: 2,
  width: 1024,
  color: { dark: "#041427", light: "#ffffff" },
});

const png = PNG.sync.read(pngBuffer);
const decoded = jsQR(
  new Uint8ClampedArray(png.data.buffer, png.data.byteOffset, png.data.byteLength),
  png.width,
  png.height,
);

if (!decoded) {
  console.error("DECODE_FAILED");
  process.exit(1);
}

console.log("DECODED=", decoded.data);
console.log("MATCH=", decoded.data === EXPECTED);
console.log(
  "HAS_SECRETS=",
  /token|secret|profile|key=|access_/i.test(decoded.data),
);

const svg = await QRCode.toString(EXPECTED, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 2,
  width: 1024,
  color: { dark: "#041427", light: "#ffffff" },
});
const urls = (svg.match(/https?:\/\/[^\s"'<>]+/g) ?? []).filter(
  (u) => !u.includes("w3.org"),
);
console.log("SVG_EMBEDDED_APP_URLS=", JSON.stringify(urls));
console.log(
  "SVG_OK=",
  svg.includes("<svg") && urls.every((u) => u === EXPECTED),
);
