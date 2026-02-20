import { SVGAttributes } from "react";

export function ArrowRight(props:SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width={props.width ?? "32"}
      height={props.height ?? "32"}
      className={props.className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33346 16L25.3335 16"
        stroke={props.fill ?? "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6665 8C14.6665 8 6.66651 13.8919 6.66651 16C6.66651 18.1083 14.6665 24 14.6665 24"
        stroke={props.fill ?? "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
