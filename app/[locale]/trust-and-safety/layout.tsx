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
        en: "How inventory reduces Surprise Costs",
        nl: "Hoe inventaris onverwachte kosten voorkomt",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "One of the most common complaints about moving is unexpected costs. Here's how creating a clear inventory helps avoid pricing surprises.",
        nl: "Een van de meest voorkomende klachten over verhuizen zijn onverwachte kosten. Zo helpt een duidelijke inventaris om prijssurprises te voorkomen.",
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
