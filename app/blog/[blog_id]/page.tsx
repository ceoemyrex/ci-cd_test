/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "@/app/icons/arrow";
import { AppTag, Navbar } from "@/components";
import { ContentfulProvider } from "@/services";
import Link from "next/link";
import { DateTime } from "luxon";
import { CalendarIcon, TimerIcon } from "@/app/icons";

export default async function Page({
  params,
}: {
  params: Promise<{
    blog_id: string;
  }>;
}) {
  const pageParams = await params;
  const blog_id = pageParams.blog_id;

  const blog = await ContentfulProvider.getBlogEntry(blog_id);

  const timestamp = new Date(blog?.createdAt ?? "");
  const formattedTimeStamp =
    DateTime.fromJSDate(timestamp).toFormat("LLLL dd, yyyy");

  return (
    <>
      <section className={`lg:pt-8 lg:px-8`}>
        <div className=" relative pb-15 lg:pb-30 lg:rounded-t-4xl">
          <img
            src={"/hero-bg.png"}
            alt="hero-bg"
            className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
          />
          <div className="relative max-w-310 mx-auto p-4 lg:py-10 lg:p-10">
            <Navbar />
            <div className="pt-12 max-w-250 mx-auto lg:pt-26.25">
              <Link
                href="/blog"
                className="bg-white inline-flex text-sm lg:text-base items-center gap-x-2 py-2 font-medium lg:py-4 px-4 lg:px-8 rounded-xl text-dark"
              >
                <ArrowRight fill="currentColor" />
                Back To Blog
              </Link>
              <div className="space-y-4 mt-12">
                <div className="">
                  <AppTag title={blog?.tag ?? ""} />
                </div>
                <p className="font-bold text-dark text-3xl lg:text-5xl leading-[120%]">
                  {blog?.title}
                </p>
                <header className="flex items-center gap-x-6">
                  <div className="flex items-center gap-x-2">
                    <span className="lg:hidden"><CalendarIcon width={14} height={14}/></span>
                    <span className="hidden lg:inline-block"><CalendarIcon/></span>
                    <p className="text-grey text-xs lg:text-base">
                      {formattedTimeStamp}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                   <span className="lg:hidden"> <TimerIcon height={14} width={14} /></span>
                   <span className="hidden lg:inline-block"> <TimerIcon /></span>
                    <p className="text-grey text-xs lg:text-base">5 min Read</p>
                  </div>
                </header>
                <div
                  dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }}
                  className=" text-sm lg:text-lg space-y-4 text-grey"
                />
              </div>
            </div>
            <div className="space-y-4 mt-20 max-w-200 mx-auto lg:mt-40"></div>
          </div>
        </div>
      </section>
      <section className="bg-white py-18.5 lg:py-37.5 px-4">
        <div className="max-w-310 mx-auto px-4 lg:px-10 border border-black/10 rounded-3xl py-10 relative ">
          <img
            src="/images/ready-to-inventory.svg"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
            alt="Ready to Inventory"
          />
          <div className="relative max-w-164.5 space-y-2 mx-auto">
            <header className="text-center">
              <AppTag title="CTA" />
            </header>
            <p className="text-center text-3xl lg:text-5xl font-bold">
              Ready to create your inventory?
            </p>
            <p className="text-grey text-sm lg:text-base text-center">
              Start planning your move with confidence.
            </p>
            <div className="text-center">
              <button className="bg-theme rounded-2xl text-white h-12 lg:h-17.5 px-12 lg:px-16 mt-5 lg:mt-10 font-medium text-base lg:text-xl">
                Start your move
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
