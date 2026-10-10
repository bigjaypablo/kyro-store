import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-screen bg-deep">
      <div className="relative h-24 bg-deep">
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
