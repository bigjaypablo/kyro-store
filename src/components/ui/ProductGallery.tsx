import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PanInfo } from "framer-motion";

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const many = images.length > 1;

  const go = (n: number) => setI((n + images.length) % images.length);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(i + 1);
    else if (info.offset.x > 60) go(i - 1);
  };

  return (
    <div>
      <div
        className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-xl bg-[#EEF5F7]"
        onMouseMove={(e) => {
          if (!canHover()) return;
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({
            on: true,
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
          });
        }}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={i}
            src={images[i]}
            alt={`${name} view ${i + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: zoom.on ? 1.8 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            draggable={false}
            style={{ transformOrigin: `${zoom.x}% ${zoom.y}%` }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {many && (
          <>
            <button
              aria-label="Previous photo"
              onClick={() => go(i - 1)}
              className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-ink backdrop-blur md:flex"
            >
              ‹
            </button>
            <button
              aria-label="Next photo"
              onClick={() => go(i + 1)}
              className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-ink backdrop-blur md:flex"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 z-10 rounded-full bg-ink/70 px-3 py-1 text-[11px] text-white">
              {i + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, n) => (
            <button
              key={src}
              onClick={() => setI(n)}
              aria-label={`View photo ${n + 1}`}
              className={`aspect-[4/5] overflow-hidden rounded-lg border-2 transition-all ${
                n === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
