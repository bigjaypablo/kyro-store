import PageShell from "../components/layout/PageShell";
import Trending from "../components/sections/Trending";
import TopClothing from "../components/sections/TopClothing";

export default function TrendingPage() {
  return (
    <PageShell>
      <Trending />
      <TopClothing />
    </PageShell>
  );
}
