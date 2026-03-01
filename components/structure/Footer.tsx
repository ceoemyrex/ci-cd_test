"use client"
import { MailingProvider } from "@/services";
import { CheckCircle, CircleAlertIcon, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


/* eslint-disable @next/next/no-img-element */
export function Footer() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"error" | "success" | null>(null);


  useEffect(()=>{
    if(message){
      setTimeout(()=>{
        setStatus(null)
      },10000)
    }
  },[message])

  const joinMailingList = async () => {
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const res = await MailingProvider.addMailingList(email);
      if (!res.responseStatus) {
        throw new Error(
          res.responseMessage ??
            "An error occurred could not add to mailing list",
        );
      }
      setMessage("email successfully added to mailing list");
      setStatus("success");
    } catch (error) {
      const err =
        (error as Error)?.message ??
        "An error occurred could not add to mailing list";
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
          <div className="max-w-310  2xl:max-w-350 px-4 mx-auto space-y-4 lg:flex">
            <div className="flex-1">
              <div className="flex w-full gap-x-4 items-center">
                <img src={"/logo.svg"} alt="Logo" className="h-11 w-11" />
                <p className="font-bold text-4xl text-dark">ZINTER</p>
              </div>
              <p className="mt-5  text-grey">
                Inventory-first move coordination. Create a clear inventory
                first, then coordinate your move with confidence.
              </p>
            </div>
            <div className="flex-2 text-sm lg:text-base space-y-4 lg:flex justify-center gap-x-20">
              <div className="">
                <p className="font-medium text-dark">Zinter</p>
                <div className="mt-6 space-y-4 text-grey">
                  <Link href={"/how-it-works"} className="block">
                    How it Works
                  </Link>
                  <Link href={"/trust-and-safety"} className="block">
                    Inventory Options
                  </Link>
                  <Link href={"/trust-and-safety"} className="block">
                    Trust & Safety
                  </Link>
                  <Link href={"/faqs"} className="block">
                    FAQ
                  </Link>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-dark">Resources</p>
                <div className="mt-6 space-y-4 text-grey">
                  <Link href={"/blog"} className="block">
                    Blog
                  </Link>
                  <Link href={"/contact"} className="block">
                    Contact
                  </Link>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-dark">Social</p>
                <div className="mt-6 space-y-4 text-grey">
                  <Link href={"/"} className="block">
                    Facebook
                  </Link>
                  <Link href={"/"} className="block">
                    Twitter
                  </Link>
                  <Link href={"/"} className="block">
                    Instagram
                  </Link>
                  <Link href={"/"} className="block">
                    Linkedin
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 pt-6 lg:pt-0">
              <p className="font-medium text-dark">Get Updates</p>
              <div className="bg-white mt-3 lg:mt-6 flex rounded-2xl p-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-sm lg:text-base px-1 lg:px-3 text-dark placeholder:text-[#CCCCCC] outline-0"
                />
                <button 
                disabled={loading}
                onClick={joinMailingList}
                className="bg-theme disabled:opacity-70 px-6 py-2 flex items-center gap-x-2 lg:py-4 text-white font-medium text-sm lg:text-base rounded-lg lg:rounded-2xl">
                  {loading && (
                    <LoaderCircle className="animate-spin"/>
                  )}
                  <span>Submit</span>
                </button>
              </div>
              {status && (
                status == "success"
                ?<p className="text-secondary flex items-center gap-x-1 text-xs lg:text-sm p-2 font-medium">
                  <CheckCircle size={"16"}/>
                  <span className="capitalize">{message}</span>
                  </p>
                :<p className="text-red-400 gap-x-1 flex items-center text-xs p-2 font-medium lg:text-sm">
                  <CircleAlertIcon size={"16"}/>
                  <span>{message}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="border-t py-5 relative border-dark/10">
          <div className="lg:flex items-center max-w-310 text-xs space-y-4 lg:text-sm mx-auto px-10">
            <p className="text-grey text-center lg:text-left">
              © 2026 Zinter. All rights reserved.
            </p>
            <p className="text-grey text-center lg:text-left ml-auto">
              AI is optional. Manual inventory is always available. Inventory
              data and images are handled securely.
            </p>
          </div>
        </div>
        <div className="px-10 max-w-310 mt-8 lg:mt-16 mx-auto">
          <img src={"/zinter.png"} alt="Zinter Watermark" />
        </div>
      </div>
    </footer>
  );
}
