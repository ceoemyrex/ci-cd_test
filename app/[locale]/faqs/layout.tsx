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
        en: "Frequently asked questions",
        nl: "Veelgestelde vragen",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "Find answers to common questions about inventory options, booking, pricing, and privacy.",
        nl: "Vind antwoorden op veelgestelde vragen over opslagmogelijkheden, reserveringen, prijzen en privacy.",
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
