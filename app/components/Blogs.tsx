/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HexagonIcon } from "../icons";
import { ArrowRight } from "../icons/arrow";
import { FlattenedBlogPost } from "@/services";

function BlogItem({ blog }: { blog: FlattenedBlogPost }) {
  return (
    <>
      <div className="p-4 border border-black/10 rounded-xl lg:rounded-4xl space-y-8">
        <div className="bg-theme/10 rounded-xl lg:rounded-3xl overflow-clip h-35 lg:h-75 relative">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl lg:rounded-3xl"
            src={blog.image}
            alt={blog.title}
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg lg:text-2xl font-medium text-dark">
            {blog.title}
          </p>
          <div
  dangerouslySetInnerHTML={{ __html: blog.content }}
  className="text-xs lg:text-sm space-y-2 text-grey line-clamp-3"
/>
          <Link
            href={`/blog/${blog.id}`}
            className="text-theme text-sm lg:text-base inline-flex items-center gap-x-3 border-b border-theme"
          >
            Read More
            <span className="-rotate-180">
              <ArrowRight width={24} height={24} fill="currentColor" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

// const items = [
//   {
//     title:"AI vs Manual Inventory: Which should you choose?",
//     description:"Pick the best method for your move based on your needs and preferences.",
//     imageUrl:"/images/blog1.png",
//     id:1
//   },
//   {
//     title:"Moving checklist: what to do first",
//     description:"Start with inventory, then plan the rest. A simple guide to getting started.",
//     imageUrl:"/images/blog2.png",
//     id:2
//   },
//   {
//     title:"How inventory helps avoid surprise costs",
//     description:"Why clarity upfront reduces pricing surprises and builds trust with movers.",
//     imageUrl:"/images/blog3.png",
//     id:3
//   },
//   {
//     title:"5 things movers wish you knew",
//     description:"Insider tips to make your move smoother for everyone involved.",
//     imageUrl:"/images/blog4.png",
//     id:4
//   },
//   {
//     title:"Planning a long-distance move",
//     description:"Key considerations for interstate moves and how inventory helps.",
//     imageUrl:"/images/blog5.png",
//     id:5
//   },
//   {
//     title:"How to inventory special items",
//     description:"Documenting fragile, valuable, and unusual items for accurate quotes.",
//     imageUrl:"/images/blog6.png",
//     id:6
//   }
// ]

export function Blogs({
  limit,
  showCta = true,
  blogs = [],
}: {
  limit?: number;
  showCta?: boolean;
  blogs?: FlattenedBlogPost[];
}) {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <header className="text-center max-w-158.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            Blogs
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">
              Moving and inventory guides.
            </p>
            <p className="text-grey text-center text-sm lg:text-lg">
              Explore practical articles on move planning, inventory creation,
              pricing, and logistics.
            </p>
          </div>
        </header>

        <div className="my-10 space-y-4 lg:my-20 lg:grid grid-cols-3 gap-x-6">
          {blogs.slice(0, limit).map((item) => (
            <BlogItem key={item.title} blog={item} />
          ))}
        </div>

        {showCta && (
          <div className="max-w-64.5 mx-auto">
            <Link
              href={"/blog"}
              className="bg-theme block text-center w-full text-white text-sm lg:text-lg rounded-2xl px-5 lg:px-10 py-2.5 lg:py-5 font-medium"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
