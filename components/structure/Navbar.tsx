"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDropDownIcon } from "@/app/icons";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { XCircle } from "lucide-react";
import { AppTranslator, defaultLocale, languages, Locale } from "@/app/utils";

/* eslint-disable @next/next/no-img-element */

const navLinks = [
  {
    url: "/",
    translations: {
      en: "Home",
      nl: "Home",
    },
  },
  {
    url: "/track-move",
    translations: {
      en: "Track Move",
      nl: "Volg Verhuizing",
    },
  },
  {
    url: "/how-it-works",
    translations: {
      en: "How it Works",
      nl: "Hoe het Werkt",
    },
  },
  {
    url: "/about",
    translations: {
      en: "About",
      nl: "Over Ons",
    },
  },
  {
    url: "/blog",
    translations: {
      en: "Blog",
      nl: "Blog",
    },
  },
  {
    url: "/contact",
    translations: {
      en: "Contact",
      nl: "Contact",
    },
  },
];

export function Navbar() {
  const { locale } = useParams<{ locale: Locale }>();
  const [isOpen, setIsOpen] = useState(false);
  const [languageSwitchOpen, setLanguageOpen] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);
  const pathname = usePathname();

  const siteLocale = useMemo(() => {
    const currentLocale = languages.find((item) => item.locale == locale);
    return currentLocale ?? defaultLocale;
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => {
      const passedViewport = window.scrollY >= 50;
      setHasBackground(passedViewport);
    };

    handleScroll(); // run once on mount

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`
    fixed top-0 w-full z-40 left-0 transition-all duration-300
    ${hasBackground ? "bg-[#F8FBFF] shadow-sm" : "bg-transparent"}
  `}
      >
        <nav className="flex w-full p-4 items-center max-w-310  2xl:max-w-350 mx-auto relative">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-x-2 lg:gap-x-4">
            <img
              src="/logo.svg"
              className="lg:h-11 w-8 h-8 lg:w-11"
              alt="Logo"
            />
            <p className="uppercase text-xl lg:text-4xl text-dark font-bold">
              Zinter
            </p>
          </Link>

          {/* Desktop Nav */}
          <div className="mx-auto border-b-2 border-[#D3E6FA] hidden xl:flex gap-x-5 justify-center">
            {navLinks.map((link) => {
              // Ensure pathname and link.url both start without the locale prefix
              const normalizedPath = pathname.replace(`/${locale}`, "") || "/";
              const normalizedLink = link.url || "/";

              const isActive = normalizedPath === normalizedLink;

              return (
                <Link
                  href={`/${locale}${link.url}`}
                  key={AppTranslator.getLocaleText({
                    translations: link.translations,
                    locale,
                  })}
                  className={`pb-1.5 px-2 ${
                    isActive
                      ? "text-theme font-medium -mb-px border-b-2 border-theme"
                      : "text-grey"
                  }`}
                >
                  {AppTranslator.getLocaleText({
                    translations: link.translations,
                    locale,
                  })}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right */}
          <div
            onClick={() => setLanguageOpen(true)}
            className="hidden xl:flex items-center gap-x-8"
          >
            <button className="flex rounded-[80px] gap-x-2 items-center p-2 border border-dark/10">
              <span className="h-8.5 block w-8.5 border relative border-dark-shade rounded-full">
                <img
                  src={siteLocale.flag}
                  className="absolute top-0 object-cover left-0 w-full h-full rounded-full"
                  alt="Flag"
                />
              </span>
              <p className="text-lg text-dark">
                {siteLocale.locale.toUpperCase()}
              </p>
              <ArrowDropDownIcon />
            </button>

            <button className="bg-theme text-sm lg:text-xl font-medium rounded-lg lg:rounded-2xl py-2.5 lg:py-5 px-6 lg:px-10 text-white">
              Partner
            </button>
          </div>

          {/* Floating Mobile Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="xl:hidden bg-white h-10 w-10 rounded-full ml-auto top-4 right-4 z-50 text-dark border border-grey/10 shadow-xl flex items-center justify-center"
          >
            <i className="bi bi-list text-lg"></i>
          </button>
        </nav>

        {/* Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-6">
            <p className="text-xl font-bold">Menu</p>
            <button onClick={() => setIsOpen(false)}>
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={AppTranslator.getLocaleText({
                  translations: link.translations,
                  locale,
                })}
                href={`${locale}${link.url}`}
                onClick={() => setIsOpen(false)}
                className={`
                font-medium text-sm
                ${pathname == link.url ? "text-theme" : "text-grey"}
                `}
              >
                {AppTranslator.getLocaleText({
                  translations: link.translations,
                  locale,
                })}
              </Link>
            ))}

            <button className="mt-6 bg-theme text-white py-3 rounded-xl">
              Partner
            </button>
          </div>
        </div>
      </div>
      {languageSwitchOpen && (
        <div className="bg-black/10 backdrop-blur fixed top-0 left-0 h-full w-full z-1000 flex items-end lg:items-center justify-center">
          <div className="bg-white flex-1 max-w-80 rounded-t-2xl lg:rounded-2xl">
            <header className="p-4 border flex items-center justify-between border-black/10">
              <p className="font-medium text-black text-sm lg:text-xl">
                Select Language
              </p>
              <button onClick={() => setLanguageOpen(false)}>
                <XCircle />
              </button>
            </header>
            <div className="py-2 lg:py-4">
              {languages.map((language) => {
                const currentPathWithoutLocale =
                  pathname.replace(`/${locale}`, "") || "/";

                return (
                  <a
                    onClick={() => setLanguageOpen(false)}
                    href={`/${language.locale}${currentPathWithoutLocale}`}
                    key={language.title}
                    className="flex items-center w-full gap-x-2 p-2"
                  >
                    <span>
                      <span className="bg-black/10 h-6 w-6 lg:h-10 lg:w-10 inline-block rounded-full relative">
                        <img
                          src={language.flag}
                          className="absolute top-0 object-cover left-0 w-full h-full rounded-full"
                          alt="Flag"
                        />
                      </span>
                    </span>
                    <span className="text-sm lg:text-base">
                      {language.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
