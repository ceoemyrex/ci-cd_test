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
        en: "Moving and inventory Guides",
        nl: "Verhuis- en inventarisgidsen",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "Explore practical articles on move planning, inventory creation, pricing, and logistics.",
        nl: "Ontdek praktische artikelen over verhuisplanning, inventarisatie, prijsstelling en logistiek.",
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
