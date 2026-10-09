import { useLenis } from "./hooks/useLenis";
import Hero from "./components/sections/Hero";
import Collection from "./components/sections/Collection";
import TopClothing from "./components/sections/TopClothing";
import StyleComfort from "./components/sections/StyleComfort";
import Trending from "./components/sections/Trending";
import Reviews from "./components/sections/Reviews";
import Lookbook from "./components/sections/Lookbook";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

export default function App() {
  useLenis();
  return (
    <div className="grain min-h-screen bg-deep">
      <Hero />
      <Collection />
      <TopClothing />
      <StyleComfort />
      <Trending />
      <Reviews />
      <Lookbook />
      <Contact />
      <Footer />
    </div>
  );
}
