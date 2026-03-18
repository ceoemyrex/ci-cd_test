/* eslint-disable @next/next/no-img-element */
import { AppTag, Navbar } from "@/components";
import { ContentfulProvider } from "@/services";
import { DateTime } from "luxon";
import { CalendarIcon, TimerIcon } from "@/app/icons";
import { BlogBackButton } from "../components";
import { AppTranslator, Locale } from "@/app/utils";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{
    blog_id: string;
    locale: Locale;
  }>;
}) {
  const pageParams = await params;
  const { blog_id, locale } = pageParams;

  const blog = await ContentfulProvider.getBlogEntry(blog_id);

  // 1. Not Found State (Matches your design pattern)
  if (!blog) {
    return (
      <section className="relative pb-15 lg:pb-30 lg:rounded-t-4xl min-h-screen">
        <img
          src="/hero-bg.png"
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 mx-auto p-4 lg:py-10 lg:p-10 text-center">
          <Navbar />
          <div className="pt-20 lg:pt-40">
            <h1 className="text-4xl lg:text-6xl font-bold text-dark">404</h1>
            <p className="text-grey mt-4">
              {AppTranslator.getLocaleText({
                locale,
                translations: { en: "Blog post not found", nl: "Blogbericht niet gevonden" }
              })}
            </p>
            <div className="mt-10">
              <BlogBackButton locale={locale} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 2. Calculate Reading Time
  const content = AppTranslator.getLocaleText({
    locale,
    translations: { en: blog.content_english, nl: blog.content }
  });
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Average 200 wpm

  const timestamp = new Date(blog?.createdAt ?? "");
  const formattedTimeStamp = DateTime.fromJSDate(timestamp)
    .setLocale(locale)
    .toFormat("LLLL dd, yyyy");

  return (
    <>
      <section className={``}>
        <div className=" relative pb-15 lg:pb-30 lg:rounded-t-4xl">
          <img
            src={"/hero-bg.png"}
            alt="hero-bg"
            className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
          />
          <div className="relative max-w-310 mx-auto p-4 lg:py-10 lg:p-10">
            <Navbar />
            <div className="pt-12 max-w-250 mx-auto lg:pt-26.25">
              <BlogBackButton locale={locale}/>
              <div className="space-y-4 mt-12">
                <div>
                  <AppTag title={AppTranslator.getLocaleText({
                    locale,
                    translations: { en: blog.tag_english, nl: blog.tag }
                  })} />
                </div>
                <p className="font-bold text-dark text-3xl lg:text-5xl leading-[120%]">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: { en: blog.title_english, nl: blog.title }
                  })}
                </p>
                <header className="flex items-center gap-x-6">
                  <div className="flex items-center gap-x-2">
                    <span className="lg:hidden"><CalendarIcon width={14} height={14} /></span>
                    <span className="hidden lg:inline-block"><CalendarIcon /></span>
                    <p className="text-grey text-xs lg:text-base">{formattedTimeStamp}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span className="lg:hidden"><TimerIcon height={14} width={14} /></span>
                    <span className="hidden lg:inline-block"><TimerIcon /></span>
                    <p className="text-grey text-xs lg:text-base">
                      {readingTime} {AppTranslator.getLocaleText({
                        locale,
                        translations: { en: "min Read", nl: "min Leestijd" }
                      })}
                    </p>
                  </div>
                </header>
                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="text-sm lg:text-lg space-y-4 text-grey"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Updated CTA Section with Translations */}
      <section className="bg-white py-18.5 lg:py-37.5 px-4">
        <div className="max-w-310 mx-auto px-4 lg:px-10 border border-black/10 rounded-3xl py-10 relative ">
          <img
            src="/images/ready-to-inventory.svg"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
            alt="Ready to Inventory"
          />
          <div className="relative max-w-164.5 space-y-2 mx-auto">
            <header className="text-center">
              <AppTag title="CTA" />
            </header>
            <p className="text-center text-3xl lg:text-5xl font-bold">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Ready to create your inventory?",
                  nl: "Klaar om je inventaris aan te maken?"
                }
              })}
            </p>
            <p className="text-grey text-sm lg:text-base text-center">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Start planning your move with confidence.",
                  nl: "Begin met een gerust hart aan het plannen van je verhuizing."
                }
              })}
            </p>
            <div className="text-center">
              <Link href={`/${locale}/book-move`} className="bg-theme inline-flex items-center justify-center rounded-2xl text-white h-12 lg:h-17.5 px-12 lg:px-16 mt-5 lg:mt-10 font-medium text-base lg:text-xl">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Start your move",
                    nl: "Start je verhuizing"
                  }
                })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}