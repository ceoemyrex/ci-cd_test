/* eslint-disable @next/next/no-img-element */
import { CheckListIcon, SettingIcon, CheckCircle } from "@/app/icons";
import { AppTag } from "@/components";

export function Process() {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310  px-4 2xl:max-w-350 mx-auto">
        <header className="text-center max-w-153.75 mx-auto">
          <AppTag title="Smooth Process" />
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">
              Simple, clear, and focused
            </p>
            <p className="text-grey text-center text-sm lg:text-lg">
              By starting with inventory, everything else falls into place. No
              hidden steps, no confusion just a clear path from start to finish.
            </p>
          </div>
        </header>
        <div className="relative mt-10 lg:mt-20">
          {/* Horizontal Line */}
          <div className="absolute hidden lg:block top-8 left-1/6 right-1/6 h-0.5 bg-secondary/20 z-0"></div>

          <div className="lg:grid grid-cols-3 gap-x-16 relative z-10 space-y-4">
            <div className="space-y-4 lg:space-y-8 text-center">
              <div className="h-12 lg:h-16 w-12 lg:w-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                <CheckListIcon />
              </div>
              <div className="space-y-1">
                <p className="text-dark text-base lg:text-2xl font-medium">
                  Create Inventory
                </p>
                <div className="h-45.75 lg:h-72.5 mt-5 lg:mt-12 overflow-clip rounded-2xl lg:rounded-4xl bg-secondary/10 relative">
                  <img
                    className="absolute top-0 left-0 object-cover h-full w-full object-center"
                    src="/images/how-it-works-1.png"
                    alt="How it Works Image 1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:space-y-8 text-center">
              <div className="h-12 lg:h-16 w-12 lg:w-16 rounded-full flex items-center justify-center bg-secondary mx-auto">
                <SettingIcon />
              </div>
              <div className="space-y-1">
                <p className="text-dark text-base lg:text-2xl font-medium">
                  Plan and Coordinate
                </p>
                <div className="h-45.75 lg:h-72.5 mt-5 lg:mt-12 overflow-clip rounded-2xl lg:rounded-4xl bg-secondary/10 relative">
                  <img
                    className="absolute top-0 left-0 object-cover h-full w-full object-center"
                    src="/images/how-it-works-2.png"
                    alt="How it Works Image 2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8 text-center">
              <div className="h-12 lg:h-16 w-12 lg:w-16 rounded-full flex items-center justify-center bg-secondary mx-auto">
                <CheckCircle />
              </div>
              <div className="space-y-1">
                <p className="text-dark text-base lg:text-2xl font-medium">
                  Finalize and move
                </p>
                 <div className="h-45.75 lg:h-72.5 mt-5 lg:mt-12 overflow-clip rounded-2xl lg:rounded-4xl bg-secondary/10 relative">
                 <img className="absolute top-0 left-0 object-cover h-full w-full object-center" src="/images/how-it-works-3.png" alt="How it Works Image 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
