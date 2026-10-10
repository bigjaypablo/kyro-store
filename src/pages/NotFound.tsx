import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="flex min-h-[60vh] flex-col items-center justify-center bg-ink px-4 py-20 text-center">
          <p className="label">404</p>
          <h1 className="mt-4 text-[12vw] font-light uppercase leading-none tracking-tight md:text-[5vw]">
            Page not found
          </h1>
          <p className="mt-4 text-fog">This page does not exist, or it is coming soon.</p>
          <Link
            to="/"
            className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink"
          >
            Back to home
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
