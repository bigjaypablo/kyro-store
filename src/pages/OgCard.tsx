import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { pic } from "../data/images";

export default function OgCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);
  const photo = pic("hero", 1200);

  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 24) / 1200));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const download = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const url = await toPng(cardRef.current, {
        width: 1200,
        height: 630,
        pixelRatio: 1,
        cacheBust: true,
        style: { transform: "none" },
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = "og.png";
      a.click();
    } catch (e) {
      alert("Could not make the image. Wait for the photo to load and try again.");
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-deep p-3 text-white">
      <div style={{ width: 1200 * scale, height: 630 * scale }}>
        <div
          ref={cardRef}
          style={{
            width: 1200,
            height: 630,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="relative flex overflow-hidden bg-ink"
        >
          <div className="relative z-10 flex w-[660px] flex-col justify-between p-16">
            <p className="text-[26px] font-light tracking-[0.3em]">KYRO</p>
            <div>
              <p className="text-[18px] uppercase tracking-[0.25em] text-fog">
                New drops every week
              </p>
              <h1 className="mt-4 text-[96px] font-light leading-[0.95] tracking-tight">
                Wear tomorrow, <span className="text-lime">today.</span>
              </h1>
              <p className="mt-6 text-[26px] text-fog">
                Simple clothes that look good and feel good.
              </p>
            </div>
            <p className="text-[20px] text-fog">
              Free delivery over $50 · Easy 14 day returns
            </p>
          </div>

          <div className="absolute inset-y-0 right-0 w-[640px]">
            {photo ? (
              <img
                src={photo}
                crossOrigin="anonymous"
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-deep" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
          </div>
        </div>
      </div>

      <button
        onClick={download}
        disabled={busy}
        className="mt-5 rounded-full bg-lime px-6 py-3 text-sm font-medium text-ink disabled:opacity-60"
      >
        {busy ? "Making image..." : "Download og.png"}
      </button>
      <p className="mt-3 text-xs text-fog">
        Dismiss the cookie popup first if it is in the way. This page is only for making the image.
      </p>
    </div>
  );
}
