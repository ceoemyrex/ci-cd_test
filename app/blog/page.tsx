import { Footer } from "@/components";
import { BlogHero } from "./components";
import { Blogs, ReadyToMove } from "../components";
import { ContentfulProvider } from "@/services";
import { Suspense } from "react";

export default async function Page() {
  const blogs = await ContentfulProvider.getBlogEntries();
  return (
    <>
      <BlogHero />
      <Suspense fallback={null}>
        <Blogs blogs={blogs ?? []} showCta={false} />
      </Suspense>
      <ReadyToMove />
      <Footer />
    </>
  );
}
