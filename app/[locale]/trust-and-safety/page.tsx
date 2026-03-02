import { Footer } from "@/components";
import { CommitmentSection, TrustAndSafetyHero } from "./components";
import { ReadyToMove, Testimonials } from "@/app/components";

export default function Page() {
  return (
    <>
      <TrustAndSafetyHero />
      <CommitmentSection />
      <Testimonials/>
      <ReadyToMove
        title="Move with confidence"
        description="Start your inventory and experience the Zinter difference."
        buttonText="Start Your Move"
      />
      <Footer />
    </>
  );
}
