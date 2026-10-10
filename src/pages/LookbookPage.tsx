import PageShell from "../components/layout/PageShell";
import Collection from "../components/sections/Collection";
import StyleComfort from "../components/sections/StyleComfort";
import Lookbook from "../components/sections/Lookbook";

export default function LookbookPage() {
  return (
    <PageShell>
      <Collection />
      <StyleComfort />
      <Lookbook />
    </PageShell>
  );
}
