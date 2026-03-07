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
        en: "Terms and Conditions",
        nl: "Algemene voorwaarden",
      },
    })}`,
    description: AppTranslator.getLocaleText({
      locale,
      translations: {
        en: "Welcome to Zinter BV! These Terms & Conditions govern your use of our services, including our website, logistics, and moving solutions. By using our services, you agree to comply with these terms. If you do not agree, please refrain from using our services.",
        nl: "Welkom bij Zinter BV! Deze Algemene voorwaarden regelen uw gebruik van onze diensten, inclusief onze website, logistiek en verhuisoplossingen. Door gebruik te maken van onze diensten gaat u akkoord met deze voorwaarden. Indien u niet akkoord gaat, verzoeken wij u onze diensten niet te gebruiken.",
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
