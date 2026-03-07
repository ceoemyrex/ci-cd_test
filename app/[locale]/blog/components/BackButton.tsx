"use client";

import { ArrowRight } from "@/app/icons/arrow";
import { useRouter } from "next/navigation";
import { AppTranslator, Locale } from "@/app/utils";

export function BlogBackButton({ locale }: { locale: Locale }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-white inline-flex text-sm lg:text-base items-center gap-x-2 py-2 font-medium lg:py-4 px-4 lg:px-8 rounded-xl text-dark"
    >
      {/* Note: Added a -scale-x-100 if the arrow needs to point left for "Back" */}
      <span className="rotate-180 -scale-x-100">
        <ArrowRight fill="currentColor" />
      </span>
      {AppTranslator.getLocaleText({
        locale,
        translations: {
          en: "Back To Blog",
          nl: "Terug naar Blog"
        }
      })}
    </button>
  );
}