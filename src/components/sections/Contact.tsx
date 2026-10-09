import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

export default function Contact() {
  return (
    <section id="contact" className="bg-deep px-3 md:px-5">
      <div className="bg-mist px-4 pb-20 pt-16 text-ink md:px-6 md:pb-28 md:pt-24">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-ink/50">
            /Contact
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-4xl text-[11vw] font-light uppercase leading-[0.98] tracking-tight md:text-[5.5vw]">
            We would love to hear from you
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Button href="mailto:hello@kyro.store">Let's talk</Button>
        </Reveal>
      </div>
    </section>
  );
}
