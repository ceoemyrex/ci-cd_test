/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HexagonIcon, Star } from "../icons";
import { ArrowRight } from "../icons/arrow";

export function Testimonials({theme="light"}:{theme?:"light"|"white"}) {
  return (
    <section className={`py-18.5 lg:py-37.5 ${theme == "white"?"bg-white":"bg-[#F8FBFF]"}`}>
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <header className="text-center max-w-153.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            Testimonials
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">
              Real People Real Moves Real Peace of Mind.
            </p>
            <p className="text-grey text-center text-sm lg:text-lg">
              Behind every move is a real story, real belongings, and real
              trust.
            </p>
          </div>
        </header>
        <div className="lg:flex my-10 lg:my-20 gap-x-10">
          <div className="flex-1 hidden  lg:flex flex-col justify-between">
            <div className="bg-theme ml-auto h-16 w-16 rounded-full flex items-center justify-center">
              <ArrowRight />
            </div>
            <div className="relative h-45.75 bg-theme/10 rounded-2xl lg:rounded-4xl">
              <img
                src="/images/testimonials-1.png"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl lg:rounded-4xl"
                alt="Testimonial 1"
              />
            </div>
          </div>
          <div className="flex-4">
            <div className="bg-white shadow-2xl rounded-[40px] p-4 space-y-4 lg:flex gap-x-8">
              <div className="flex-1">
                <div className="bg-theme/10 h-50 lg:h-100 relative rounded-4xl">
                  <img
                    src="/images/testimonials-2.png"
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl"
                    alt="Testimonial 2"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4 flex flex-col justify-between">
                <p className="text-sm lg:text-2xl text-[#2D2F36]">
                  “I uploaded five photos from my phone and had a quote in
                  minutes. Movers showed up exactly when they said they would!”
                </p>
                <div className="">
                  <p className="text-base lg:text-2xl text-[#2D2F36] font-medium">
                    Fatima Noor
                  </p>
                  <div className="lg:flex items-center gap-x-3 text-lg">
                    <p className="text-grey text-sm lg:text-base">Studio</p>
                    <p className="text-[#2D2F36] text-sm lg:text-base">RotterHam</p>
                    <div className="ml-auto flex items-center my-4 lg:my-1 gap-x-1">
                      <p className="text-[#2D2F36] text-base lg:text-2xl font-bold">5.0</p>
                      <div className="flex items-center">
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         <div className="flex-1 hidden lg:flex flex-col-reverse justify-between">
            <div className="bg-theme h-16 w-16 rounded-full flex items-center justify-center">
              <span className="rotate-180"><ArrowRight /></span>
            </div>
            <div className="relative h-45.75 bg-theme/10 rounded-4xl">
              <img
                src="/images/testimonials-3.png"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl"
                alt="Testimonial 1"
              />
            </div>
          </div>
        </div>
        <div className="max-w-129 flex-wrap  mx-auto flex justify-center items-center gap-4">
            <Link href={"/book-move"} className="bg-theme inline-flex items-center justify-center lg:flex-1 text-white text-xs lg:text-lg rounded-xl lg:rounded-2xl px-5 lg:px-10 py-2.5 w-full lg:w-auto lg:py-5 font-medium">Start Your Move</Link>
            <button className="bg-white lg:flex-1 text-dark border border-black/10  text-xs lg:text-lg rounded-xl lg:rounded-2xl px-5 w-full lg:w-auto lg:px-10 py-2.5 lg:py-5 font-medium">Give Review </button>
        </div>
      </div>
    </section>
  );
}
