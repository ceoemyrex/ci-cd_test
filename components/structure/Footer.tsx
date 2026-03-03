/* eslint-disable @next/next/no-img-element */
"use client";

import { MailingProvider } from "@/services";
import { CheckCircle, CircleAlertIcon, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

/* ============================= */
/*       TRANSLATIONS            */
/* ============================= */
const footerText = {
  companyName: {
    en: "ZINTER",
    nl: "ZINTER",
  },
  description: {
    en: "Inventory-first move coordination. Create a clear inventory first, then coordinate your move with confidence.",
    nl: "Inventaris-georiënteerde verhuiscoördinatie. Maak eerst een duidelijke inventaris, en coördineer daarna je verhuizing met vertrouwen.",
  },
  sections: {
    zinter: {
      en: "Zinter",
      nl: "Zinter",
    },
    resources: {
      en: "Resources",
      nl: "Hulpmiddelen",
    },
    social: {
      en: "Social",
      nl: "Sociaal",
    },
    getUpdates: {
      en: "Get Updates",
      nl: "Updates ontvangen",
    },
  },
  links: {
    howItWorks: { en: "How it Works", nl: "Hoe het werkt" },
    inventoryOptions: { en: "Inventory Options", nl: "Inventarisopties" },
    trustAndSafety: { en: "Trust & Safety", nl: "Vertrouwen & Veiligheid" },
    faq: { en: "FAQ", nl: "FAQ" },
    blog: { en: "Blog", nl: "Blog" },
    contact: { en: "Contact", nl: "Contact" },
    facebook: { en: "Facebook", nl: "Facebook" },
    twitter: { en: "Twitter", nl: "Twitter" },
    instagram: { en: "Instagram", nl: "Instagram" },
    linkedin: { en: "Linkedin", nl: "Linkedin" },
  },
  placeholder: {
    email: { en: "Enter your email", nl: "Voer je e-mail in" },
    submit: { en: "Submit", nl: "Verzenden" },
  },
  messages: {
    enterEmail: { en: "Please enter your email", nl: "Voer je e-mail in" },
    success: { en: "Email successfully added to mailing list", nl: "E-mail succesvol toegevoegd aan de mailinglijst" },
    error: { en: "An error occurred, could not add to mailing list", nl: "Er is een fout opgetreden, kon niet aan de mailinglijst toevoegen" },
  },
  copyright: {
    en: "© 2026 Zinter. All rights reserved.",
    nl: "© 2026 Zinter. Alle rechten voorbehouden.",
  },
  disclaimer: {
    en: "AI is optional. Manual inventory is always available. Inventory data and images are handled securely.",
    nl: "AI is optioneel. Handmatige inventaris is altijd beschikbaar. Inventarisgegevens en afbeeldingen worden veilig behandeld.",
  },
};

/* ============================= */
/*        FOOTER COMPONENT       */
/* ============================= */
export function Footer() {
  const params = useParams();
  const locale = (params.locale ?? "en") as "en" | "nl";

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"error" | "success" | null>(null);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => {
        setStatus(null);
      }, 10000);
      return () => clearTimeout(t);
    }
  }, [message]);

  const joinMailingList = async () => {
    if (!email) {
      setStatus("error");
      setMessage(footerText.messages.enterEmail[locale]);
      return;
    }
    setLoading(true);
    try {
      const res = await MailingProvider.addMailingList(email);
      if (!res.responseStatus) {
        throw new Error(res.responseMessage ?? footerText.messages.error[locale]);
      }
      setMessage(footerText.messages.success[locale]);
      setStatus("success");
    } catch (error) {
      const err = (error as Error)?.message ?? footerText.messages.error[locale];
      setStatus("error");
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative">
      <img
        src="/footer-bg-image.png"
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt=""
      />
      <div className="relative">
        <div className="py-16.5 lg:py-33">
          <div className="max-w-310 2xl:max-w-350 px-4 mx-auto space-y-4 lg:flex">
            {/* Logo + Description */}
            <div className="flex-1">
              <div className="flex w-full gap-x-4 items-center">
                <img src={"/logo.svg"} alt="Logo" className="h-11 w-11" />
                <p className="font-bold text-4xl text-dark">{footerText.companyName[locale]}</p>
              </div>
              <p className="mt-5 text-grey">{footerText.description[locale]}</p>
            </div>

            {/* Navigation Links */}
            <div className="flex-2 text-sm lg:text-base space-y-4 lg:flex justify-center gap-x-20">
              {/* Zinter */}
              <div>
                <p className="font-medium text-dark">{footerText.sections.zinter[locale]}</p>
                <div className="mt-6 space-y-4 text-grey">
                  <Link href={`/${locale}/how-it-works`} className="block">{footerText.links.howItWorks[locale]}</Link>
                  <Link href={`/${locale}/trust-and-safety`} className="block">{footerText.links.inventoryOptions[locale]}</Link>
                  <Link href={`/${locale}/trust-and-safety`} className="block">{footerText.links.trustAndSafety[locale]}</Link>
                  <Link href={`/${locale}/faqs`} className="block">{footerText.links.faq[locale]}</Link>
                </div>
              </div>

              {/* Resources */}
              <div>
                <p className="font-medium text-dark">{footerText.sections.resources[locale]}</p>
                <div className="mt-6 space-y-4 text-grey">
                  <Link href={`/${locale}/blog`} className="block">{footerText.links.blog[locale]}</Link>
                  <Link href={`/${locale}/contact`} className="block">{footerText.links.contact[locale]}</Link>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="font-medium text-dark">{footerText.sections.social[locale]}</p>
                <div className="mt-6 space-y-4 text-grey">
                  <Link href={`/${locale}`} className="block">{footerText.links.facebook[locale]}</Link>
                  <Link href={`/${locale}`} className="block">{footerText.links.twitter[locale]}</Link>
                  <Link href={`/${locale}`} className="block">{footerText.links.instagram[locale]}</Link>
                  <Link href={`/${locale}`} className="block">{footerText.links.linkedin[locale]}</Link>
                </div>
              </div>
            </div>

            {/* Mailing List */}
            <div className="flex-1 pt-6 lg:pt-0">
              <p className="font-medium text-dark">{footerText.sections.getUpdates[locale]}</p>
              <div className="bg-white mt-3 lg:mt-6 flex rounded-2xl p-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footerText.placeholder.email[locale]}
                  className="w-full text-sm lg:text-base px-1 lg:px-3 text-dark placeholder:text-[#CCCCCC] outline-0"
                />
                <button
                  disabled={loading}
                  onClick={joinMailingList}
                  className="bg-theme disabled:opacity-70 px-6 py-2 flex items-center gap-x-2 lg:py-4 text-white font-medium text-sm lg:text-base rounded-lg lg:rounded-2xl"
                >
                  {loading && <LoaderCircle className="animate-spin" />}
                  <span>{footerText.placeholder.submit[locale]}</span>
                </button>
              </div>

              {status && (
                status === "success" ? (
                  <p className="text-secondary flex items-center gap-x-1 text-xs lg:text-sm p-2 font-medium">
                    <CheckCircle size={16} />
                    <span className="capitalize">{message}</span>
                  </p>
                ) : (
                  <p className="text-red-400 flex items-center gap-x-1 text-xs lg:text-sm p-2 font-medium">
                    <CircleAlertIcon size={16} />
                    <span>{message}</span>
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t py-5 relative border-dark/10">
          <div className="lg:flex items-center max-w-310 text-xs space-y-4 lg:text-sm mx-auto px-10">
            <p className="text-grey text-center lg:text-left">{footerText.copyright[locale]}</p>
            <p className="text-grey text-center lg:text-left ml-auto">{footerText.disclaimer[locale]}</p>
          </div>
        </div>

        <div className="px-10 max-w-310 mt-8 lg:mt-16 mx-auto">
          <img src={"/zinter.png"} alt="Zinter Watermark" />
        </div>
      </div>
    </footer>
  );
}