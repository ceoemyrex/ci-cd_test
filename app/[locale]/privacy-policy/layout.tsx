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
        en: "Privacy Policy",
        nl: "Privacybeleid",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: `Zinter BV ("we," "us," or "our") is a logistics tech company specializing in moving services. Zinter BV is registered in the Netherlands. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy & Cookies Statement explains how we collect, use, and protect your data when you use our services, including our website and any associated platforms.`,
        nl: `Zinter BV ("wij," "ons," of "onze") is een logistiek techbedrijf dat gespecialiseerd is in verhuisdiensten. Zinter BV is geregistreerd in Nederland. Wij zetten ons in om uw privacy te beschermen en de beveiliging van uw persoonsgegevens te waarborgen. Deze Privacy- en Cookiesverklaring legt uit hoe wij uw gegevens verzamelen, gebruiken en beschermen wanneer u onze diensten gebruikt, inclusief onze website en bijbehorende platforms.`,
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
