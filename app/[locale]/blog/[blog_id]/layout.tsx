import { AppTranslator,Locale } from "@/app/utils";
import { ContentfulProvider } from "@/services";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale,blog_id:string }>;
}): Promise<Metadata> {
  const paramRes = await params;
  const {locale,blog_id} = paramRes

  const blog = await ContentfulProvider.getBlogEntry(blog_id);

  return {
    title: `Zinter | ${AppTranslator.getLocaleText({
      locale,
      translations: {
        en: blog?.title_english ?? "",
        nl: blog?.title ?? "",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: blog?.tag_english ?? "",
        nl: blog?.title ?? "",
      },
    }),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
