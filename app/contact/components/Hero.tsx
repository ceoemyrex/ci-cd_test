/* eslint-disable @next/next/no-img-element */
"use client";
import { SendIcon } from "@/app/icons";
import { AppTag, Navbar } from "@/components";

export function ContactHero() {
  return (
    <section className={`lg:pt-8 lg:px-8`}>
      <div className=" relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 mx-auto p-4 lg:py-10 lg:p-10">
          <Navbar />
          <div className="pt-12 max-w-150 mx-auto lg:pt-26.25">
            <div className="space-y-4  text-center">
              <div className="text-center">
                <AppTag title="Contact" />
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-6xl leading-[120%]">
                Contact Us
              </p>
              <p className="text-center text-sm lg:text-lg text-grey">
                Questions about your move or inventory options? Send a message
                and we&apos;ll help you move forward with clarity.
              </p>
            </div>
            <form className="bg-white shadow rounded-2xl mt-13 lg:mt-26">
              <div className="p-4 lg:p-10 border-b space-y-5 border-black/10">
                <div className="space-y-3">
                  <p className="text-dark lg:text-lg">Name</p>
                  <input
                    placeholder="Your name"
                    type="text"
                    name=""
                    className="w-full outline-theme/30 bg-[#F3F3F4] rounded-lg p-3 lg:p-5 placeholder:text-grey"
                    id=""
                  />
                </div>
                <div>
                  <p className="text-dark lg:text-lg">Email</p>
                  <input
                    placeholder="johndoe@example.com"
                    type="email"
                    name=""
                    className="w-full outline-theme/30 bg-[#F3F3F4] rounded-lg p-3 lg:p-5 placeholder:text-grey"
                    id=""
                  />
                </div>
                <div>
                  <p className="text-dark lg:text-lg">Message</p>
                  <textarea
                    placeholder="How can we help?"
                    className="w-full resize-none h-50 outline-theme/30 bg-[#F3F3F4] rounded-lg p-3 lg:p-5 placeholder:text-grey"
                    id=""
                  />
                </div>
              </div>
              <footer className="p-4 lg:p-10">
                <button className="w-full bg-theme  lg:text-lg font-medium p-3 lg:p-5 text-white rounded-xl flex items-center justify-center gap-x-2">
                  <SendIcon />
                  <span>Send Message</span>
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
