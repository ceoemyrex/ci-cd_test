import { HexagonIcon, CheckListIcon, SettingIcon, CheckCircle } from "../icons";

export function HowItWorks() {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310 2xl:max-w-350 px-4 mx-auto">
        <header className="text-center max-w-153.75 mx-auto">
          <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
            <HexagonIcon />
            Clear Moving
          </span>
          <div className="mt-6 space-y-4">
            <p className="font-bold text-2xl lg:text-5xl">How Zinter works</p>
            <p className="text-grey text-center text-sm lg:text-lg">
              Start with inventory first. Then coordinate what you need..
            </p>
          </div>
        </header>
        <div className="relative mt-10 lg:mt-20">
          {/* Horizontal Line */}
          <div className="absolute hidden lg:block top-8 left-1/6 right-1/6 h-0.5 bg-secondary/20 z-0"></div>

          <div className="lg:grid grid-cols-3 gap-x-16 relative z-10 space-y-4">
            <div className="space-y-4 lg:space-y-8 text-center">
              <div className="h-16 w-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
                <CheckListIcon />
              </div>
              <div className="space-y-1">
                <p className="text-dark text-lg lg:text-2xl font-medium">
                  Create Inventory
                </p>
                <p className="text-grey text-xs lg:text-sm">
                  Choose AI photo upload or manual list from the start
                </p>
              </div>
            </div>

            <div className="space-y-4 lg:space-y-8 text-center">
              <div className="h-16 w-16 rounded-full flex items-center justify-center bg-secondary mx-auto">
                <SettingIcon />
              </div>
              <div className="space-y-1">
                <p className="text-dark text-lg lg:text-2xl font-medium">
                  Coordinate details
                </p>
                <p className="text-grey text-xs lg:text-sm">
                  Use inventory to plan services, timing, and requirements.
                </p>
              </div>
            </div>

            <div className="space-y-8 text-center">
              <div className="h-16 w-16 rounded-full flex items-center justify-center bg-secondary mx-auto">
                <CheckCircle />
              </div>
              <div className="space-y-1">
                <p className="text-dark text-lg lg:text-2xl font-medium">
                  Finalize with confidence
                </p>
                <p className="text-grey text-xs lg:text-sm">
                  Review, confirm, and complete with full visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
