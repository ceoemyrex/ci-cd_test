/* eslint-disable @next/next/no-img-element */
import { HexagonIcon } from "../icons";

export function Steps() {
  return (
    <section className="py-18.5 lg:py-37.5">
      <div className="max-w-310 px-4 lg:px-10 mx-auto">
        <div className="lg:flex gap-x-22">
          <div className="flex-1">
            <div className="relative h-100 lg:h-180 w-full">
              {[
                "/images/step-1.jpg",
                "/images/step-2.jpg",
                "/images/step-3.jpg",
                "/images/step-4.jpg",
              ].map((src, index, arr) => (
                <div
                  key={index}
                  className="absolute w-[75%] lg:w-[90%] mx-auto max-w-125 h-80 lg:h-162.5 border border-secondary rounded-[40px] overflow-hidden"
                  style={{
                    top: index < arr.length - 1 ? "50px" : "30px",
                    left: `${index * 25}px`,
                    zIndex: index + 10,
                  }}
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 pt-10">
            <div className="text-center lg:text-left">
              <span className="bg-[#CACACA1A]/10 px-4 text-xs lg:text-sm py-1.5 lg:py-2.5 rounded-[100px] text-secondary inline-flex items-center gap-x-1.5 border border-[#B6DDA8]">
                <HexagonIcon />
                Trusted Moves
              </span>
            </div>
            <header className="mt-3 lg:mt-6 text-center lg:text-left space-y-4">
              <p className="font-bold text-dark text-2xl lg:text-[42px]">
                Your Move, in 60 Seconds.
              </p>
              <p className="text-grey text-sm lg:text-base">
                Create and organize your entire move in just one minute. From
                building your inventory to booking trusted movers.
              </p>
            </header>
            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 lg:h-16 w-8 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">
                    Submit your move details
                  </p>
                  <p className="text-grey text-sm lg:text-base">
                    Fill in our quick form with your move{"'"}s start and end
                    locations and size of your move
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 lg:h-16 w-8 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      2
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">Snap your space</p>
                  <p className="text-grey text-sm lg:text-base">
                    Take a few quick photos of the rooms or items you&apos;re
                    moving.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 lg:h-16 w-8 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      3
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">Get real-time quotes</p>
                  <p className="text-grey text-sm lg:text-base">
                    Our AI scans your inventory and returns accurate estimates
                    from trusted pros.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-x-3">
                <div>
                  <div className="h-8 w-8 lg:h-16 lg:w-16 flex bg-secondary/10 rounded-full items-center justify-center">
                    <p className="text-secondary font-bold text-lg lg:text-2xl">
                      4
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-base lg:text-2xl">Pick your match</p>
                  <p className="text-grey text-sm lg:text-base">
                    Compare offers. Read reviews. Book the mover that fits your
                    needs and budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
