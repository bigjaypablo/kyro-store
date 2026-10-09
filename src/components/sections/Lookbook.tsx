import Reveal from "../ui/Reveal";
import ParallaxImage from "../ui/ParallaxImage";
import Ticker from "../ui/Ticker";

function Caption({ name, price }: { name: string; price: string }) {
  return (
    <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-ink/60">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
}

export default function Lookbook() {
  return (
    <section id="workshop" className="bg-deep px-3 md:px-5">
      <div className="bg-mist pt-6 text-ink">
        <div className="px-4 md:px-6">
          <Reveal>
            <h2 className="text-[10vw] font-light uppercase leading-[1] tracking-tight md:text-[3.2vw]">
              Discover our
              <br />
              workshop
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            <div>
              <ParallaxImage
                slot="work1"
                bg="#D9D3CC"
                className="aspect-[4/5] rounded-sm"
              />
              <Caption name="Linen two-piece" price="$89.00" />
            </div>

            <div>
              <div className="relative">
                <ParallaxImage
                  slot="work2"
                  bg="#E64A5F"
                  delay={0.15}
                  className="aspect-[4/5] rounded-sm"
                />
                <a
                  href="#trending"
                  aria-label="See more"
                  className="group absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 hover:bg-ink hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-500 group-hover:rotate-45"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <Caption name="Color block puffer" price="$120.00" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Ticker />
        </div>
      </div>
    </section>
  );
}
