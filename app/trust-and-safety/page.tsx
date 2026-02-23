import { Footer } from "@/components";
import { CommitmentSection, TrustAndSafetyHero } from "./components";
import { ReadyToMove } from "../components";

export default function Page() {
  return (
    <>
      <TrustAndSafetyHero />
      <CommitmentSection />
      <ReadyToMove
        title="Move with confidence"
        description="Start your inventory and experience the Zinter difference."
        buttonText="Start Your Move"
      />
      <Footer />
    </>
  );
}
