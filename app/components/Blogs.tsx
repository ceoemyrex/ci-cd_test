/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HexagonIcon } from "../icons";
import { ArrowRight } from "../icons/arrow";

function BlogItem({blog}:{
  blog:Record<string,any>
}){
  return(
    <>
     <div className="p-4 border border-black/10 rounded-xl lg:rounded-4xl space-y-8">
            <div className="bg-theme/10 rounded-xl lg:rounded-3xl overflow-clip h-35 lg:h-75 relative">
            <img className="absolute top-0 left-0 w-full h-full object-cover rounded-xl lg:rounded-3xl" src={blog.imageUrl} alt={blog.title} />
            </div>
            <div className="space-y-4">
              <p className="text-lg lg:text-2xl font-medium text-dark">{blog.title}</p>
              <p className="text-xs lg:text-sm text-grey">
                {blog.description}
              </p>
              <Link href={`/blogs/${blog.id}`} className="text-theme text-sm lg:text-base inline-flex items-center gap-x-3 border-b border-theme" >
                Read More
                <span className="-rotate-180">
                  <ArrowRight width={24} height={24} fill="currentColor" />
                </span>
              </Link>
            </div>
          </div>
    </>
  )
}

const items = [
  {
    title:"AI vs Manual Inventory: Which should you choose?",
    description:"Pick the best method for your move based on your needs and preferences.",
    imageUrl:"/images/blog1.png",
    id:1
  },
  {
    title:"Moving checklist: what to do first",
    description:"Start with inventory, then plan the rest. A simple guide to getting started.",
    imageUrl:"/images/blog2.png",
    id:2
  },
  {
    title:"How inventory helps avoid surprise costs",
    description:"Why clarity upfront reduces pricing surprises and builds trust with movers.",
    imageUrl:"/images/blog3.png",
    id:3
  }
]

export function Blogs() {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310 px-4 lg:px-10 mx-auto">
        <header className="text-center max-w-158.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            Blogs
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">Moving and inventory guides.</p>
            <p className="text-grey text-center text-sm lg:text-lg">
              Explore practical articles on move planning, inventory creation,
              pricing, and logistics.
            </p>
          </div>
        </header>

        <div className="my-10 space-y-4 lg:my-20 lg:grid grid-cols-3 gap-x-6">
        {items.map(item=>(
          <BlogItem key={item.id} blog={item}/>
        ))}
        </div>

        <div className="max-w-64.5 mx-auto">
          <Link
            href={"/blogs"}
            className="bg-theme block text-center w-full text-white text-sm lg:text-lg rounded-2xl px-5 lg:px-10 py-2.5 lg:py-5 font-medium"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
