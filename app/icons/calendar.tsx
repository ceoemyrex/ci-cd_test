import { SVGAttributes } from "react";

export function CalendarIcon(props:SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width={props.width ?? "32"}
      height={props.width ?? "32"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3346 2.66699V8.00033M10.668 2.66699V8.00033"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.3333 5.33301H14.6667C9.63835 5.33301 7.1242 5.33301 5.56209 6.8951C4 8.45721 4 10.9714 4 15.9997V18.6663C4 23.6946 4 26.2089 5.56209 27.7709C7.1242 29.333 9.63835 29.333 14.6667 29.333H17.3333C22.3616 29.333 24.8759 29.333 26.4379 27.7709C28 26.2089 28 23.6946 28 18.6663V15.9997C28 10.9714 28 8.45721 26.4379 6.8951C24.8759 5.33301 22.3616 5.33301 17.3333 5.33301Z"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 13.333H28"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
