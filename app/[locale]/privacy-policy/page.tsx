/* eslint-disable @next/next/no-img-element */
import { Navbar, AppTag, Footer } from "@/components";
import { AppTranslator, Locale } from "@/app/utils";
import { privacyTranslations as t } from "@/translations";

export default async function PrivacyPolicyPage({ params}: {
  params:Promise<{ locale?: Locale }>
}) {

  const locale = (await (params)).locale

  return (
    <>
      <section>
        <div className="relative pb-15 lg:pb-30 lg:rounded-t-4xl">
          <img
            src={"/hero-bg.png"}
            alt="hero-bg"
            className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
          />
          <div className="relative max-w-310 mx-auto p-4 lg:py-10 lg:p-10">
            <Navbar />

            <div className="pt-12 max-w-250 mx-auto lg:pt-26.25">
              <div className="space-y-4 mt-12">

                {/* Tag */}
                <div className="text-center">
                  <AppTag title={AppTranslator.getLocaleText({ locale, translations: t.tag })} />
                </div>

                {/* Page Title */}
                <p className="font-bold text-center text-dark text-3xl lg:text-5xl leading-[120%]">
                  {AppTranslator.getLocaleText({ locale, translations: t.title })}
                </p>

                {/* Section 1 */}
                <div className="text-sm mt-4 lg:mt-10 lg:text-lg space-y-8 text-grey">
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section1.title })}
                    </p>
                    <p>{AppTranslator.getLocaleText({ locale, translations: t.section1.content })}</p>
                  </div>

                  {/* Section 2 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section2.title })}
                    </p>
                    <p>{AppTranslator.getLocaleText({ locale, translations: t.section2.line1 })}</p>
                    <ul className="list-disc ml-6 mt-1 space-y-1">
                      {t.section2.items.map((item, idx) => (
                        <li key={idx}>{AppTranslator.getLocaleText({ locale, translations: item })}</li>
                      ))}
                    </ul>
                    <p className="mt-2">{AppTranslator.getLocaleText({ locale, translations: t.section2.line2 })}</p>
                    <ul className="list-disc ml-6 mt-1 space-y-1">
                      {t.section2.items2.map((item, idx) => (
                        <li key={idx}>{AppTranslator.getLocaleText({ locale, translations: item })}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section3.title })}
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      {t.section3.items.map((item, idx) => (
                        <li key={idx}>{AppTranslator.getLocaleText({ locale, translations: item })}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 4 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section4.title })}
                    </p>
                    <p>{AppTranslator.getLocaleText({ locale, translations: t.section4.content })}</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      {t.section4.items.map((item, idx) => (
                        <li key={idx}>{AppTranslator.getLocaleText({ locale, translations: item })}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 5 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section5.title })}
                    </p>
                    <p>{AppTranslator.getLocaleText({ locale, translations: t.section5.content })}</p>
                  </div>

                  {/* Section 6 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section6.title })}
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      {t.section6.items.map((item, idx) => (
                        <li key={idx}>{AppTranslator.getLocaleText({ locale, translations: item })}</li>
                      ))}
                    </ul>
                    <p className="mt-2">{AppTranslator.getLocaleText({ locale, translations: t.section6.line1 })}</p>
                  </div>

                  {/* Section 7 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section7.title })}
                    </p>
                    <p>{AppTranslator.getLocaleText({ locale, translations: t.section7.content })}</p>
                  </div>

                  {/* Section 8 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section8.title })}
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      {t.section8.items.map((item, idx) => (
                        <li key={idx}>{AppTranslator.getLocaleText({ locale, translations: item })}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 9 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section9.title })}
                    </p>
                    <p>{AppTranslator.getLocaleText({ locale, translations: t.section9.content })}</p>
                  </div>

                  {/* Section 10 */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section10.title })}
                    </p>
                    <p>{AppTranslator.getLocaleText({ locale, translations: t.section10.content })}</p>
                  </div>

                </div>
              </div>
            </div>

            <div className="space-y-4 mt-20 max-w-200 mx-auto lg:mt-40"></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}