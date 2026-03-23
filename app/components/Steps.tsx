import Image from "next/image";
import { HexagonIcon } from "../icons";
import { AppTranslator, Locale } from "../utils";

/* ---------------- STEPS TRANSLATIONS ---------------- */

const stepsText = {
  badge: {
    en: "Trusted Moves",
    nl: "Betrouwbare verhuizingen",
  },
  title: {
    en: "Your Move, in 60 Seconds.",
    nl: "Vraag een scherpe offerte aan",
  },
  description: {
    en: "Create and organize your entire move in just one minute. From building your inventory to booking trusted movers.",
    nl: "Organiseer je volledige verhuizing in slechts één minuut: Van het opstellen van je spullen tot het boeken van betrouwbare verhuizers.",
  },

  step1Title: {
    en: "Submit your move details",
    nl: "Vul je verhuisgegevens in.",
  },
  step1Desc: {
    en: "Fill in our quick form with your move's start and end locations and size of your move",
    nl: "Vul je begin- en eindadres in en geef je verhuisgegevens door.",
  },

  step2Title: {
    en: "Snap your space",
    nl: "Maak foto’s van je woning.",
  },
  step2Desc: {
    en: "Take a few quick photos of the rooms or items you're moving.",
    nl: "Maak foto’s van de ruimtes en spullen die je gaat verhuizen.",
  },

  step3Title: {
    en: "Get real-time quotes",
    nl: "Ontvang direct offertes.",
  },
  step3Desc: {
    en: "Our AI scans your inventory and returns accurate estimates from trusted pros.",
    nl: "Onze AI analyseert je spullen en geeft nauwkeurige prijzen van betrouwbare verhuisbedrijven.",
  },

  step4Title: {
    en: "Pick your match",
    nl: "Kies de beste match.",
  },
  step4Desc: {
    en: "Compare offers. Read reviews. Book the mover that fits your needs and budget.",
    nl: "Vergelijk offertes, lees beoordelingen en boek het verhuisbedrijf dat het best bij jou past.",
  },
};

export function Steps({ locale = "nl" }: { locale?: Locale }) {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <div className="lg:flex gap-x-22">
          <div className="flex-1">
            <div className="relative h-100 lg:h-180 w-full">
              {[
                "/images/step-1.jpg",
                "/images/step-2.jpg",
                "/images/step-3.jpg",
                "/images/step-4.jpg",
              ].map((src, index, arr) => (
                <div
                  key={index}
                  className="absolute w-[75%] lg:w-[90%] mx-auto max-w-125 h-80 lg:h-162.5 border border-secondary rounded-[40px] overflow-hidden"
                  style={{
                    top: index < arr.length - 1 ? "50px" : "30px",
                    left: `${index * 25}px`,
                    zIndex: index + 10,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 75vw, 500px"
                    quality={75}
                    priority={index === 3} // only first image
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 pt-10">
            <div className="text-center lg:text-left">
              <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
                <HexagonIcon />
                {AppTranslator.getLocaleText({
                  locale,
                  translations: stepsText.badge,
                  defaultText: "Trusted Moves",
                })}
              </span>
            </div>

            <header className="mt-3 lg:mt-6 text-center lg:text-left space-y-4">
              <p className="font-bold text-dark text-2xl lg:text-[42px]">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: stepsText.title,
                })}
              </p>

              <p className="text-grey text-sm lg:text-base">
                {AppTranslator.getLocaleText({
                  locale,
                  translations: stepsText.description,
                })}
              </p>
            </header>

            <div className="mt-12 space-y-8">
              {/* STEP 1 */}
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 lg:h-16 w-8 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step1Title,
                    })}
                  </p>
                  <p className="text-grey text-sm lg:text-base">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step1Desc,
                    })}
                  </p>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 lg:h-16 w-8 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      2
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step2Title,
                    })}
                  </p>
                  <p className="text-grey text-sm lg:text-base">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step2Desc,
                    })}
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 lg:h-16 w-8 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      3
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step3Title,
                    })}
                  </p>
                  <p className="text-grey text-sm lg:text-base">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step3Desc,
                    })}
                  </p>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 w-8 lg:h-16 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      4
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step4Title,
                    })}
                  </p>
                  <p className="text-grey text-sm lg:text-base">
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: stepsText.step4Desc,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
