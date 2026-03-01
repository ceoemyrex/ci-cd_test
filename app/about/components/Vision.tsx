/* eslint-disable @next/next/no-img-element */
import {
  UserGroupIcon,
  BulbIcon,
  Smile,
} from "@/app/icons";
import { SectionHeader } from "@/components";
import { ReactNode } from "react";

interface CurrentVisionProps {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
}

function CurrentVision({
  step,
  title,
  description,
  image,
  icon,
}: CurrentVisionProps) {
  const isReversed = step % 2 == 0;

  return (
    <div
      className={`lg:flex space-y-8 ${isReversed ? "flex-row-reverse" : ""} items-center gap-x-36`}
    >
      <div className="flex-1">
        <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="mt-4 lg:mt-8 space-y-2">
          <p className="text-dark lg:text-2xl font-medium">{title}</p>
          <p className="text-grey text-sm lg:text-base">{description}</p>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-[#F3F5F7] relative rounded-xl h-50 lg:h-110 overflow-clip">
          <img
            src={image}
            alt={title}
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export function Vision() {
  const visions: CurrentVisionProps[] = [
    {
      title: "User Satisfaction",
      description:
        "Our vision is to provide a stress-free moving experience where every customer feels understood, supported, and cared for through clear communication, dependable service, and respectful handling of every home and belonging.",
      icon: <UserGroupIcon />,
      image: "/images/vision-1.png",
      step: 1,
    },
    {
      title: "Innovation",
      description:
        "Our vision is to transform the moving experience with advanced AI, creating a faster, easier, and more personalized user journey where technology enhances every step without losing the human touch.",
      icon: <BulbIcon />,
      image: "/images/vision-2.png",
      step: 2,
    },
    {
      title: "Simplicity",
      description:
        "Our vision is to make moving simple and effortless by creating a clear, organized, and easy-to-navigate experience from the first inquiry to the final delivery.",
      icon: <Smile />,
      image: "/images/vision-3.png",
      step: 3,
    },
  ];

  return (
    <section className="py-18.75 lg:py-37.5 max-w-310 2xl:max-w-350 px-4 mx-auto">
      <SectionHeader
        tag="Our Vision"
        title={
          <p className="lg:px-4">
            At <span className="text-secondary">Zinter</span> we envision a
            world where logistics.
          </p>
        }
        description={
          <p>
            By leveraging cutting-edge technology, we aim to provide a
            hassle-free experience that eliminates common challenges associated
            with moving and transportation services.
          </p>
        }
      />
      <div className="mt-10 lg:mt-20 space-y-10 lg:space-y-16">
        {visions.map((vision) => {
          return <CurrentVision key={`vision-${vision.step}`} {...vision} />;
        })}
      </div>
    </section>
  );
}
