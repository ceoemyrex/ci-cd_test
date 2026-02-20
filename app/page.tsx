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

export default function Page() {
  return (
    <>
      <Hero />
      <Steps />
      <Partners />
      <HowItWorks />
      <Testimonials />
      <Blogs limit={3} />
      <FAQs/>
      <Footer />
    </>
  );
}