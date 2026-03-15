export const dynamic = "force-dynamic";
import { Footer } from "@/components";
import {
  Blogs,
  FAQs,
  // Hero,
  HeroLg,
  HowItWorks,
  Partners,
  Steps,
  Testimonials,
} from "@/app/components";
import { ContentfulProvider } from "@/services";
import { Suspense } from "react";
import { Locale } from "../utils";

export const revalidate = 60;

export default async function Page({params}:{params:Promise<{
  locale:Locale
}>}) {

    const blogs = await ContentfulProvider.getBlogEntries();
    const locale = (await params).locale;

  return (
    <>
      <div>
        <HeroLg locale={locale}/>
      </div>
      {/* <div className="lg:hidden">
        <Hero locale={locale}/>
      </div> */}
      <Steps locale={locale} />
      <Partners locale={locale}/>
      <HowItWorks locale={locale}/>
      <Testimonials locale={locale}/>
      <Suspense fallback={null}>
         <Blogs locale={locale} blogs={blogs ?? []} limit={3} />
      </Suspense>
      <FAQs locale={locale}/>
      <Footer />
    </>
  );
}