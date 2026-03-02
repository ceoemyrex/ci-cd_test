"use client";

import { ArrowRight } from "@/app/icons/arrow";
import { useRouter } from "next/navigation";

export function BlogBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="bg-white inline-flex text-sm lg:text-base items-center gap-x-2 py-2 font-medium lg:py-4 px-4 lg:px-8 rounded-xl text-dark"
    >
      <ArrowRight fill="currentColor" />
      Back To Blog
    </button>
  );
}
