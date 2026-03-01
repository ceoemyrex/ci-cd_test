/* eslint-disable @next/next/no-img-element */
import { LockIcon, PrivacyIcon, Shield, UserCheckIcon } from "@/app/icons";
import { Navbar, AppTag } from "@/components";
import { ReactNode } from "react";

function TrustCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-white p-4 lg:p-8 border border-black/10 rounded-2xl">
      <div className="h-10 lg:h-16 w-10 lg:w-16 rounded-xl flex items-center justify-center bg-[#EBF5EF]">
        {icon}
      </div>
      <div className="mt-6 lg:mt-17 space-y-2">
        <p className="text-base lg:text-2xl font-medium text-dark">{title}</p>
        <p className="text-sm lg:text-base text-grey">{description}</p>
      </div>
    </div>
  );
}

export function TrustAndSafetyHero() {
  return (
    <section className={``}>
      <div className=" relative pb-15 lg:pb-30 lg:rounded-t-4xl">
        <img
          src={"/hero-bg.png"}
          alt="hero-bg"
          className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
        />
        <div className="relative max-w-310 2xl:max-w-350  mx-auto p-4 lg:py-10 lg:p-10">
          <Navbar />
          <div className="pt-22 max-w-150 mx-auto lg:pt-36.25">
            <div className="space-y-4  text-center">
              <div className="text-center">
                <AppTag title="Trust and Safety" />
              </div>
              <p className="font-bold text-dark text-center text-3xl lg:text-5xl leading-[120%]">
                How inventory reduces{" "}
                <span className="text-secondary">Surprise Costs</span>
              </p>
              <p className="text-center text-sm lg:text-lg text-grey">
                One of the most common complaints about moving is unexpected
                costs. Here&apos;s how creating a clear inventory helps avoid
                pricing surprises.
              </p>
            </div>
          </div>
          <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 gap-8 mt-20 lg:mt-60">
            <TrustCard
              icon={<LockIcon/>}
              title="Data Protection"
              description="Inventory data and images are handled securely and responsibly. We use industry-standard encryption to protect your information."
            />
            <TrustCard
              icon={<PrivacyIcon/>}
              title="Privacy First"
              description="AI is optional. We never force you to use features you're not comfortable with. Your choices are always respected."
            />
            <TrustCard
              icon={<Shield/>}
              title="Transparency"
              description="No hidden fees, no surprise charges. Clear inventory leads to clear pricing and honest communication."
            />
            <TrustCard
              icon={<UserCheckIcon/>}
              title="Verified Partners"
              description="We work with trusted moving partners who meet our quality and reliability standards."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
