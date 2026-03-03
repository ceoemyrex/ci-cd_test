/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { HexagonIcon } from "@/app/icons";
import { ArrowRight } from "@/app/icons/arrow";
import { FlattenedBlogPost } from "@/services";
import { Locale, AppTranslator } from "@/app/utils";

function ServiceItem({ service, locale }: { service: FlattenedBlogPost; locale: Locale }) {
  return (
    <div className="p-4 border bg-white border-black/10 rounded-xl lg:rounded-4xl space-y-8">
      <div className="bg-theme/10 rounded-xl lg:rounded-3xl overflow-clip h-35 lg:h-75 relative">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl lg:rounded-3xl"
          src={service.image}
          alt={AppTranslator.getLocaleText({ locale, translations: {
            en:service.title,
            nl:service.title
          } })}
        />
      </div>
      <div className="space-y-4">
        <p className="text-lg lg:text-2xl font-medium text-dark">
          {AppTranslator.getLocaleText({ locale, translations: {
            en:service.title,
            nl:service.title
          }})}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: AppTranslator.getLocaleText({ locale, translations: {
            en:service.content,
            nl:service.content
          } }) }}
          className="text-xs lg:text-sm text-grey line-clamp-3"
        ></div>
        <Link
          href={`/${locale}/blog/${service.id}`}
          className="text-theme text-sm lg:text-base inline-flex items-center gap-x-3 border-b border-theme"
        >
          {AppTranslator.getLocaleText({ locale, translations: { en: "Read More", nl: "Lees Meer" } })}
          <span className="-rotate-180">
            <ArrowRight width={24} height={24} fill="currentColor" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export function Services({ blogs = [], locale = "nl" }: { blogs?: FlattenedBlogPost[]; locale?: Locale }) {
  return (
    <section className="py-18.5 lg:py-37.5 bg-[#F8FBFF]">
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <header className="text-center max-w-158.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            {AppTranslator.getLocaleText({ locale, translations: { en: "Our Services", nl: "Onze Diensten" } })}
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl lg:px-6">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Zinter BV does not carry out moves directly",
                  nl: "Zinter BV werkt samen met professionele verhuispartners",
                },
              })}
            </p>
            <p className="text-grey text-center text-sm lg:text-lg">
              {AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Instead, we connect customers with trusted and professional third-party moving service providers. We ensure a seamless booking and logistics experience",
                  nl: "Zinter BV werkt samen met professionele verhuispartners. Wij zorgen voor een duidelijke boeking en een snel verloop van de verhuizing.",
                },
              })}
            </p>
          </div>
        </header>

        <div className="my-10 space-y-8 lg:space-y-4 lg:my-20 lg:grid grid-cols-3 gap-x-6">
          {blogs.map((item) => (
            <ServiceItem key={item.id} service={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}