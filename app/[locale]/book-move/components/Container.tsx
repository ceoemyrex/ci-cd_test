/* eslint-disable @next/next/no-img-element */
"use client";
import { Navbar } from "@/components";
import { ReactNode } from "react";


export function PageContainer({children}:{children:ReactNode}) {
  return (
    <section className={``}>
      <div className="relative pb-15 lg:pb-30">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 mx-auto p-4 lg:py-10">
          <Navbar />
        <div className="mt-18 lg:mt-37">{children}</div>
        </div>
      </div>
    </section>
  );
}
