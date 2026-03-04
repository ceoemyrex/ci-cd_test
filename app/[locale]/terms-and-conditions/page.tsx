/* eslint-disable @next/next/no-img-element */
import { Navbar, AppTag, Footer } from "@/components";
import { AppTranslator, Locale } from "@/app/utils";
import { termsTranslations as t } from "@/translations";

export default async function Page({ params }: {
  params:Promise<{ locale?: Locale }>
}) {


  const locale = (await params).locale

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
                  <AppTag
                    title={AppTranslator.getLocaleText({
                      locale,
                      translations: t.tag,
                    })}
                  />
                </div>

                {/* Title */}
                <p className="font-bold text-center text-dark text-3xl lg:text-5xl leading-[120%]">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: t.title,
                  })}
                </p>

                {/* Terms content */}
                <div className="text-sm mt-4 lg:mt-10 lg:text-lg space-y-8 text-grey">

                  {/* 1. Introduction */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section1.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section1.content })}
                    </p>
                  </div>

                  {/* 2. Definitions */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section2.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section2.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section2.line2 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section2.line3 })}
                    </p>
                  </div>

                  {/* 3. Use of Service */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section3.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section3.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section3.line2 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section3.line3 })}
                    </p>
                  </div>

                  {/* 4. Bookings and Payments */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section4.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section4.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section4.line2 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section4.line3 })}
                    </p>
                  </div>

                  {/* 5. Liability and Insurance */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section5.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section5.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section5.line2 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section5.line3 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section5.line4 })}
                    </p>
                  </div>

                  {/* 6. Prohibited Items */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section6.title })}
                    </p>
                    <ul className="list-disc ml-6 mt-2">
                      <li>{AppTranslator.getLocaleText({ locale, translations: t.section6.item1 })}</li>
                      <li>{AppTranslator.getLocaleText({ locale, translations: t.section6.item2 })}</li>
                      <li>{AppTranslator.getLocaleText({ locale, translations: t.section6.item3 })}</li>
                    </ul>
                  </div>

                  {/* 7. Service Limitations */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section7.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section7.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section7.line2 })}
                    </p>
                  </div>

                  {/* 8. Intellectual Property */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section8.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section8.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section8.line2 })}
                    </p>
                  </div>

                  {/* 9. Amendments and Termination */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section9.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section9.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section9.line2 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section9.line3 })}
                    </p>
                  </div>

                  {/* 10. Governing Law & Dispute Resolution */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section10.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section10.line1 })}<br />
                      {AppTranslator.getLocaleText({ locale, translations: t.section10.line2 })}
                    </p>
                  </div>

                  {/* 11. Contact Information */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">
                      {AppTranslator.getLocaleText({ locale, translations: t.section11.title })}
                    </p>
                    <p>
                      {AppTranslator.getLocaleText({ locale, translations: t.section11.line1 })}<br />
                      <a
                        href="mailto:support@zinter.nl"
                        className="text-theme underline"
                      >
                        support@zinter.nl
                      </a>
                    </p>
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