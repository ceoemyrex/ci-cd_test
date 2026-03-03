import { Footer } from "@/components";
import { CommitmentSection, TrustAndSafetyHero } from "./components";
import { ReadyToMove, Testimonials } from "@/app/components";
import { Locale } from "@/app/utils";

export default async function Page({params}:{
  params:Promise<{
    locale:Locale
  }>
}) {

  const locale =  (await params).locale

  return (
    <>
      <TrustAndSafetyHero locale={locale} />
      <CommitmentSection locale={locale}/>
      <Testimonials locale={locale}/>
      <ReadyToMove
        locale={locale}
        title="Move with confidence"
        description="Start your inventory and experience the Zinter difference."
        buttonText="Start Your Move"
      />
      <Footer />
    </>
  );
}
