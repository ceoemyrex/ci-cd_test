export const dynamic = "force-dynamic";
import { Footer } from "@/components";
import {
  Blogs,
  FAQs,
  Hero,
  HowItWorks,
  Partners,
  Steps,
  Testimonials,
} from "./components";
import { ContentfulProvider } from "@/services";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Page() {

    const blogs = await ContentfulProvider.getBlogEntries();

  return (
    <>
      <Hero />
      <Steps />
      <Partners />
      <HowItWorks />
      <Testimonials />
      <Suspense fallback={null}>
         <Blogs blogs={blogs ?? []} limit={3} />
      </Suspense>
      <FAQs/>
      <Footer />
    </>
  );
}