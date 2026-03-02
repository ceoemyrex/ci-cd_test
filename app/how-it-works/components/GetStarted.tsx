import { HexagonIcon } from "@/app/icons";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export function GetStarted() {
  return (
    <section className="max-w-310 2xl:max-w-350 mx-auto px-4">
      <div className="relative rounded-4xl overflow-clip lg:min-h-140">
        <img
          src="/images/get-started.png"
          className="absolute object-cover top-0 right-0 h-full w-full lg:w-8/12"
          alt="Get Started"
        />
        <img
          src="/images/get-started-art.png"
          className="absolute object-cover top-0 left-0 h-full w-full rounded-4xl"
          alt="Get Started"
        />

        <div className="relative py-10 bg-secondary/80 lg:bg-transparent lg:min-h-140 flex items-center p-4 lg:px-30">
          <div className="flex-1 text-center lg:text-left">
            <span className="border gap-x-2 items-center border-[#B6DDA8] bg-[#CACACA1A]/10 backdrop-blur-xs inline-flex rounded-[100px] text-white px-3 lg:px-6 py-2 text-xs lg:text-sm lg:py-3">
              <HexagonIcon fill="#ffffff"/>
              <span>CTA</span>
            </span>
            <div className="mt-6 mb-12 space-y-4 text-white">
                <p className="text-white text-2xl lg:text-6xl text-center lg:text-left font-bold">Ready to get started?</p>
                <p className="text-sm lg:text-base text-center lg:text-left">Create your inventory and take the first step toward a smoother move.</p>
            </div>
            <Link href={"/book-move"} className="bg-theme inline-flex items-center justify-center px-6 lg:px-13 min-h-12 lg:py-5 text-sm lg:text-lg text-white rounded-2xl font-medium">Start Your Move</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
