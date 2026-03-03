/* eslint-disable @next/next/no-img-element */
"use client";
import { UserGroupIcon, BulbIcon, Smile } from "@/app/icons";
import { SectionHeader } from "@/components";
import { ReactNode } from "react";
import { Locale, AppTranslator } from "@/app/utils";

interface CurrentVisionProps {
  step: number;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: ReactNode;
  image: string;
}

function CurrentVision({ step, title, description, image, icon, locale }: CurrentVisionProps & { locale: Locale }) {
  const isReversed = step % 2 === 0;

  return (
    <div className={`lg:flex space-y-8 ${isReversed ? "flex-row-reverse" : ""} items-center gap-x-36`}>
      <div className="flex-1">
        <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="mt-4 lg:mt-8 space-y-2">
          <p className="text-dark lg:text-2xl font-medium">
            {AppTranslator.getLocaleText({ locale, translations: title })}
          </p>
          <p className="text-grey text-sm lg:text-base">
            {AppTranslator.getLocaleText({ locale, translations: description })}
          </p>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-[#F3F5F7] relative rounded-xl h-50 lg:h-110 overflow-clip">
          <img src={image} alt={AppTranslator.getLocaleText({ locale, translations: title })} className="absolute top-0 left-0 h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export function Vision({ locale = "nl" }: { locale?: Locale }) {
  const visions: CurrentVisionProps[] = [
    {
      title: { en: "User Satisfaction", nl: "Klanttevredenheid" },
      description: {
        en: "Our vision is to provide a stress-free moving experience where every customer feels understood, supported, and cared for through clear communication, dependable service, and respectful handling of every home and belonging.",
        nl: "Onze visie is een zorgeloze verhuiservaring waarin elke klant zich begrepen en goed ondersteund voelt. Met duidelijke communicatie, betrouwbare service en respectvolle omgang met iedere woning en spullen.",
      },
      icon: <UserGroupIcon />,
      image: "/images/vision-1.png",
      step: 1,
    },
    {
      title: { en: "Innovation", nl: "Innovatie" },
      description: {
        en: "Our vision is to transform the moving experience with advanced AI, creating a faster, easier, and more personalized user journey where technology enhances every step without losing the human touch.",
        nl: "Onze visie is om de verhuiservaring te vernieuwen met onze slimme AI-herkenning. Zo maken we het proces sneller en persoonlijker. Terwijl technologie elke stap ondersteunt, zorgen wij dat klanten nooit menselijk contact verliezen.",
      },
      icon: <BulbIcon />,
      image: "/images/vision-2.png",
      step: 2,
    },
    {
      title: { en: "Simplicity", nl: "Eenvoud en overzicht " },
      description: {
        en: "Our vision is to make moving simple and effortless by creating a clear, organized, and easy-to-navigate experience from the first inquiry to the final delivery.",
        nl: "Zinter maakt verhuizen soepel en zorgeloos. Met een duidelijke en overzichtelijke aanpak begeleiden we je van begin tot eind.",
      },
      icon: <Smile />,
      image: "/images/vision-3.png",
      step: 3,
    },
  ];

  return (
    <section className="py-18.75 lg:py-37.5 max-w-310 2xl:max-w-350 px-4 mx-auto">
      <SectionHeader
        tag={AppTranslator.getLocaleText({ locale, translations: { en: "Our Vision", nl: "Onze visie" } })}
        title={
          <p className="lg:px-4">
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "At Zinter we envision a world where logistics.",
                nl: "Bij Zinter streven wij naar een wereld waarin logistiek moeiteloos en overzichtelijk verloopt.",
              },
            })}
            <span className="text-secondary"> Zinter</span>
          </p>
        }
        description={
          <p>
            {AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "By leveraging cutting-edge technology, we aim to provide a hassle-free experience that eliminates common challenges associated with moving and transportation services.",
                nl: "Met slimme technologie maken we verhuizen soepel en overzichtelijk. Geen onnodig gedoe, maar een duidelijke en zorgeloze aanpak.",
              },
            })}
          </p>
        }
      />
      <div className="mt-10 lg:mt-20 space-y-10 lg:space-y-16">
        {visions.map((vision) => (
          <CurrentVision key={`vision-${vision.step}`} {...vision} locale={locale} />
        ))}
      </div>
    </section>
  );
}