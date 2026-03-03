import { Footer } from "@/components";
import { BlogHero } from "./components";
import { Blogs, ReadyToMove, Testimonials } from "@/app/components";
import { ContentfulProvider } from "@/services";
import { Suspense } from "react";
import { Locale } from "@/app/utils";

export const revalidate = 60;

export default async function Page({params}:{
  params:Promise<{
    locale:Locale
  }>
}) {
  const blogs = await ContentfulProvider.getBlogEntries();

  const locale = (await params).locale

  return (
    <>
      <BlogHero locale={locale}/>
      <Suspense fallback={null}>
        <Blogs locale={locale} blogs={blogs ?? []} showCta={false} />
      </Suspense>
      <Testimonials locale={locale}/>
      <ReadyToMove locale={locale}/>
      <Footer />
    </>
  );
}
