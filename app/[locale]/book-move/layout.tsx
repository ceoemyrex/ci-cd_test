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
        en: "Get a quote for a move",
        nl: "Vraag een verhuisofferte aan",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "Get a quote for a move",
        nl: "Vraag een verhuisofferte aan",
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
