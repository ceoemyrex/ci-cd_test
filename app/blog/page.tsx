import { Footer } from "@/components";
import { BlogHero } from "./components";
import { Blogs, ReadyToMove, Testimonials } from "../components";
import { ContentfulProvider } from "@/services";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Page() {
  const blogs = await ContentfulProvider.getBlogEntries();
  return (
    <>
      <BlogHero />
      <Suspense fallback={null}>
        <Blogs blogs={blogs ?? []} showCta={false} />
      </Suspense>
      <Testimonials/>
      <ReadyToMove />
      <Footer />
    </>
  );
}
