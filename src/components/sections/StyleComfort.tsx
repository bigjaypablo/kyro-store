import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import ParallaxImage from "../ui/ParallaxImage";

export default function StyleComfort() {
  return (
    <section id="lookbook" className="bg-deep px-3 md:px-5">
      <div className="bg-mist px-4 pb-14 pt-4 text-ink md:px-6 md:pb-20">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          {/* left: heading + wide image */}
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="text-[10vw] font-light uppercase leading-[1] tracking-tight md:text-[3.2vw]">
                Where style
                <br />
                meets comfort
              </h2>
            </Reveal>
            <ParallaxImage
              slot="style1"
              bg="#F2A33B"
              delay={0.1}
              className="mt-6 aspect-[16/10] rounded-sm"
            />
          </div>

          {/* right: image + text */}
          <div className="md:col-span-5">
            <ParallaxImage
              slot="style2"
              bg="#E4562E"
              delay={0.2}
              className="aspect-[4/3] rounded-sm"
            />
            <Reveal delay={0.25} className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-[220px] text-[13px] leading-relaxed text-ink/70">
                Clothes that look great and feel even better. Made for every day.
              </p>
              <Button href="#trending">View Collection</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
