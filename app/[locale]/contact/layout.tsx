import { AppTranslator, Locale } from "@/app/utils";
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
        en: "Contact Us",
        nl: "Neem contact met ons op",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "Questions about your move or inventory options? Send a message and we'll help you move forward with clarity.",
        nl: "Vragen over uw verhuizing of opslagmogelijkheden? Stuur ons een bericht en wij helpen u graag verder.",
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
