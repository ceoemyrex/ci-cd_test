export type Locale = "en" | "nl";

export type Translation = {
  [K in Locale]: string;
};

export type GetLocaleTextConfig = {
  locale?: Locale;
  translations: Translation;
  defaultText?: string;
};

  export const languages = [
    {
      locale: "en",
      title: "UK(English)",
      flag: "/images/uk.svg",
    },
    {
      locale: "nl",
      title: "Netherlands(Dutch)",
      flag: "/flag.png",
    },
  ];

  export const defaultLocale =  {
      locale: "nl",
      title: "Netherlands(Dutch)",
      flag: "/flag.png",
    }

export class AppTranslator {
  static getLocaleText({
    locale = "nl",
    translations,
    defaultText,
  }: GetLocaleTextConfig) {
    const translated = translations[locale];
    if (translated) return translated;
    return defaultText ?? "";
  }
}
