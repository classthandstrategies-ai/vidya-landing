import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { CoverageGrid } from "@/components/CoverageGrid";
import { ExamPicker } from "@/components/ExamPicker";
import { Verification } from "@/components/Verification";
import { FeatureTour } from "@/components/FeatureTour";
import { OfflineProof } from "@/components/OfflineProof";
import { Status } from "@/components/Status";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

// Section order is deliberate — proof before ask. See LANDING-PAGE-BRIEF.md §4.
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <CoverageGrid />
        <ExamPicker />
        <Verification />
        <FeatureTour />
        <OfflineProof />
        <Status />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}