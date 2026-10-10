import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import { CartProvider } from "./context/CartContext";
import BagDrawer from "./components/layout/BagDrawer";
import CookieBanner from "./components/ui/CookieBanner";
import LeadMagnet from "./components/ui/LeadMagnet";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import TrendingPage from "./pages/TrendingPage";
import ReviewsPage from "./pages/ReviewsPage";
import LookbookPage from "./pages/LookbookPage";
import NotFound from "./pages/NotFound";
import OgCard from "./pages/OgCard";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Delivery from "./pages/Delivery";
import { Privacy, Terms, Cookies } from "./pages/Legal";

const titles: Record<string, string> = {
  "/": "KYRO | Wear tomorrow, today",
  "/shop": "Shop | KYRO",
  "/trending": "Trending | KYRO",
  "/reviews": "Reviews | KYRO",
  "/lookbook": "Lookbook | KYRO",
  "/about": "About | KYRO",
  "/contact": "Contact | KYRO",
  "/delivery": "Delivery and returns | KYRO",
  "/checkout": "Checkout | KYRO",
  "/account": "Account | KYRO",
  "/privacy": "Privacy Policy | KYRO",
  "/terms": "Terms of Service | KYRO",
  "/cookies": "Cookie Policy | KYRO",
  "/credits": "Photo credits | KYRO",
};

const pageTitle = (p: string) =>
  titles[p] ?? (p.startsWith("/product/") ? "Product | KYRO" : "KYRO");

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitle(pathname);
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();
  return (
    <CartProvider>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/lookbook" element={<LookbookPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/og" element={<OgCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BagDrawer />
      <CookieBanner />
      <LeadMagnet />
    </CartProvider>
  );
}
