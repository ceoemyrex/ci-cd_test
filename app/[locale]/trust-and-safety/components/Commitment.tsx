/* eslint-disable @next/next/no-img-element */
"use client";
import { Shield } from "@/app/icons";
import { AppTag } from "@/components";
import { AppTranslator, Locale } from "@/app/utils";

function CommitmentPoint({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex items-center gap-x-3">
      <div>
        <div className="h-8 lg:h-12 w-8 lg:w-12 flex bg-secondary/10 rounded-full items-center justify-center">
          <Shield />
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm lg:text-xl">{title}</p>
      </div>
    </div>
  );
}

export function CommitmentSection({ locale }: { locale: Locale }) {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <div className="lg:flex gap-x-22">
          <div className="flex-1 pt-10">
            <div className="text-center lg:text-left">
              <AppTag
                title={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Best & Trusted Place",
                    nl: "Beste en meest vertrouwde plek  ",
                  },
                })}
              />
            </div>

            <header className="mt-3 lg:mt-6 text-center lg:text-left space-y-4">
              <p className="font-bold text-dark text-2xl lg:text-[42px]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Our commitment to you",
                    nl: "Onze belofte aan jou",
                  },
                })}
              </p>

              <p className="text-grey text-sm lg:text-base">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "We understand that moving involves sharing personal information and trusting others with your belongings. That's why we've built Zinter with security and transparency at its core.",
                    nl: "Bij verhuizen komt veel meer kijken dan alleen dozen verplaatsen. Je deelt persoonlijke gegevens en vertrouwt anderen met je waardevolle spullen. Daarom hebben we Zinter gebouwd met veiligheid en transparantie als basis.",
                  },
                })}
              </p>
            </header>

            <div className="mt-12 space-y-8">
              <CommitmentPoint
                title={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Your data is never sold to third parties",
                    nl: "We verkopen je gegevens nooit",
                  },
                })}
              />

              <CommitmentPoint
                title={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "AI is always optional — manual options are always available",
                    nl: "Je kiest zelf of je AI gebruikt",
                  },
                })}
              />

              <CommitmentPoint
                title={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "You control what information is shared with movers",
                    nl: "Jij bepaalt wat je deelt met verhuisbedrijven",
                  },
                })}
              />

              <CommitmentPoint
                title={AppTranslator.getLocaleText({
                  locale,
                  translations: {
                    en: "Delete your data at any time",
                    nl: "Je kunt je gegevens altijd verwijderen",
                  },
                })}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative h-100 lg:h-180 w-full">
              {[
                "/images/stats-image-4.jpg",
                "/images/blog3.png",
                "/images/stats-image-2.jpg",
              ].map((src, index, arr) => (
                <div
                  key={index}
                  className="absolute w-[85%] ml-auto shadow lg:w-[90%] mx-auto max-w-125 h-80 lg:h-152.5 border border-secondary rounded-[40px] overflow-hidden"
                  style={{
                    top: index < arr.length - 1 ? "50px" : "30px",
                    right: `${index * 25}px`,
                    zIndex: index + 10,
                  }}
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}