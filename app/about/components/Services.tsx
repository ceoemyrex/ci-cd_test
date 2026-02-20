/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HexagonIcon } from "@/app/icons";
import { ArrowRight } from "@/app/icons/arrow";

function ServiceItem({service}:{
  service:Record<string,any>
}){
  return(
    <>
     <div className="p-4 border bg-white border-black/10 rounded-xl lg:rounded-4xl space-y-8">
            <div className="bg-theme/10 rounded-xl lg:rounded-3xl overflow-clip h-35 lg:h-75 relative">
            <img className="absolute top-0 left-0 w-full h-full object-cover rounded-xl lg:rounded-3xl" src={service.imageUrl} alt={service.title} />
            </div>
            <div className="space-y-4">
              <p className="text-lg lg:text-2xl font-medium text-dark">{service.title}</p>
              <p className="text-xs lg:text-sm text-grey">
                {service.description}
              </p>
              <Link href={`/blogs/${service.id}`} className="text-theme text-sm lg:text-base inline-flex items-center gap-x-3 border-b border-theme" >
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
    title:"Residential Moving",
    description:"Tailored solutions for individuals and families moving to new homes",
    imageUrl:"/images/services-1.jpg",
    id:1
  },
  {
    title:"Commercial Moving",
    description:"Efficient and reliable business relocations with minimal downtime",
    imageUrl:"/images/services-2.jpg",
    id:2
  },
  {
    title:"Customized Solutions",
    description:"Personalized services to meet unique transportation needs",
    imageUrl:"/images/services-3.jpg",
    id:3
  },
  {
    title:"Technology-Driven Logistics",
    description:"As a logistics tech company, Zinter BV integrates advanced technology to optimize processes",
    imageUrl:"/images/services-4.jpg",
    id:4
  },
  {
    title:"AI Image Recognition Inventory",
    description:"leveraging AI to accurately recognize, categorize, and track items, making moves more efficient and organized.",
    imageUrl:"/images/services-5.jpg",
    id:5
  },
  {
    title:"Easy Booking Process",
    description:"Documenting fragile, valuable, and unusual items for accurate quotes.",
    imageUrl:"/images/services-6.png",
    id:6
  }
]

export function Services() {
  return (
    <section className="py-18.5 lg:py-37.5 bg-[#F8FBFF] ">
      <div className="max-w-310 px-4 lg:px-10 mx-auto">
        <header className="text-center max-w-158.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            Our Services
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl lg:px-6">Zinter BV does not carry out moves directly</p>
            <p className="text-grey text-center text-sm lg:text-lg">
              Instead, we connect customers with trusted and professional third-party moving service providers. We ensure a seamless booking and logistics experience
            </p>
          </div>
        </header>

        <div className="my-10 space-y-8 lg:space-y-4 lg:my-20 lg:grid grid-cols-3 gap-x-6">
        {items.map(item=>(
          <ServiceItem key={item.id} service={item}/>
        ))}
        </div>
      </div>
    </section>
  );
}
