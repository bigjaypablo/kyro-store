const items = Array.from({ length: 8 });

export default function Ticker({ text = "Up to 20% off" }: { text?: string }) {
  return (
    <div className="overflow-hidden border-t border-ink/10 py-3 text-ink">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center">
            {items.map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-4 px-4 text-[10px] uppercase tracking-[0.2em]"
              >
                {text}
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-ink" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
