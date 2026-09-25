"use client";

type CheckInSignActionsProps = {
  svg: string;
  pngDataUrl: string;
  checkInUrl: string;
};

function downloadBlob(filename: string, blob: Blob) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export function CheckInSignActions({
  svg,
  pngDataUrl,
  checkInUrl,
}: CheckInSignActionsProps) {
  function handlePrint() {
    window.print();
  }

  function handleDownloadSvg() {
    downloadBlob(
      "pixelnation-store-check-in-qr.svg",
      new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
    );
  }

  function handleDownloadPng() {
    const anchor = document.createElement("a");
    anchor.href = pngDataUrl;
    anchor.download = "pixelnation-store-check-in-qr.png";
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
    <div className="check-in-sign-actions print:hidden mx-auto mt-8 flex max-w-3xl flex-col gap-3 px-4 sm:flex-row sm:flex-wrap sm:justify-center">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-background transition hover:bg-accent-hover"
      >
        Print sign
      </button>
      <button
        type="button"
        onClick={handleDownloadSvg}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-accent-secondary/50 bg-accent-secondary-muted px-5 text-sm font-semibold text-accent-secondary transition hover:border-accent-secondary"
      >
        Download SVG
      </button>
      <button
        type="button"
        onClick={handleDownloadPng}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-card-border bg-card px-5 text-sm font-semibold text-foreground transition hover:border-accent"
      >
        Download PNG
      </button>
      <p className="w-full text-center text-xs text-muted sm:basis-full">
        QR destination (public URL only):{" "}
        <span className="break-all text-foreground">{checkInUrl}</span>
      </p>
    </div>
  );
}
