import { AppTranslator,Locale } from "@/app/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: `Zinter | ${AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "About Zinter",
        nl: "Over Zinter",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "Our mission is to revolutionize the logistics industry by offering seamless, tech-driven solutions that simplify and optimize the moving experience for individuals and businesses alike. Zinter BV is committed to innovation, efficiency, and customer satisfaction.",
        nl: "Onze missie is om de logistieke sector te revolutioneren door naadloze, technologiegedreven oplossingen te bieden die de verhuiservaring voor particulieren en bedrijven vereenvoudigen en optimaliseren. Zinter BV zet zich in voor innovatie, efficiëntie en klanttevredenheid.",
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
