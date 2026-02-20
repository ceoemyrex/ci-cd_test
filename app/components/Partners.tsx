import { HexagonIcon, StarOutlineTheme } from "../icons";
import { HomeIcon } from "../icons/home";
import { PackageIcon } from "../icons/package";
import { TruckIcon } from "../icons/truck";

export function Partners() {
  return (
    <section className="py-18.5 lg:py-37.5 bg-[#F8FBFF]">
      <div className="max-w-310 px-4 lg:px-10 mx-auto">
        <header className="text-center max-w-153.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-sm py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            Trusted Partners
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">
              Moving services powered by reliable partners
            </p>
            <p className="text-grey text-sm lg:text-lg">
              Zinter works with verified moving companies and service providers
              to ensure smooth coordination and dependable service delivery.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <p className="text-lg lg:text-3xl font-medium">Want to become a partner?</p>
            <button className="py-2.5 lg:py-5 px-10 lg:px-[72.5px] font-medium bg-theme text-white rounded-2xl text-base lg:text-xl">
              Join As A Partner
            </button>
          </div>
        </header>
        <div className="mt-10 lg:mt-20 space-y-2 lg:grid grid-cols-4 gap-x-8">
          <div className="bg-white border border-black/10 rounded-2xl px-4 py-5 lg:py-10">
            <div>
              <div className="bg-[#EBF5EF] mx-auto h-16 w-16 rounded-2xl flex items-center justify-center">
                <TruckIcon />
              </div>
              <div className="mt-6 lg:mt-12 space-y-4 text-center">
                <p className="font-medium text-lg lg:text-2xl">
                  SwiftMove Logistics
                </p>
                <span className="text-secondary border-secondary/10 text-sm py-2 px-4 rounded-[100px] bg-[#CACACA1A]/10">
                  Verified Partner
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl px-4 py-4 lg:py-10">
            <div>
              <div className="bg-[#EBF5EF] mx-auto h-16 w-16 rounded-2xl flex items-center justify-center">
                <PackageIcon />
              </div>
              <div className="mt-12 space-y-4 text-center">
                <p className="font-medium text-lg lg:text-2xl">
                  MetroPack Movers
                </p>
                <span className="text-secondary border-secondary/10 text-sm py-2 px-4 rounded-[100px] bg-[#CACACA1A]/10">
                  Licensed & Insured
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl px-4 py-4 lg:py-10">
            <div>
              <div className="bg-[#EBF5EF] mx-auto h-16 w-16 rounded-2xl flex items-center justify-center">
                <StarOutlineTheme />
              </div>
              <div className="mt-12 space-y-4 text-center">
                <p className="font-medium text-lg lg:text-2xl">
                  NorthStar Transport
                </p>
                <span className="text-secondary border-secondary/10 text-sm py-2 px-4 rounded-[100px] bg-[#CACACA1A]/10">
                  Local Expert
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl px-4 py-4 lg:py-10">
            <div>
              <div className="bg-[#EBF5EF] mx-auto h-16 w-16 rounded-2xl flex items-center justify-center">
                <HomeIcon />
              </div>
              <div className="mt-12 space-y-4 text-center">
                <p className="font-medium text-lg lg:text-2xl">
                  UrbanShift Storage
                </p>
                <span className="text-secondary border-secondary/10 text-sm py-2 px-4 rounded-[100px] bg-[#CACACA1A]/10">
                  Storage Partner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
