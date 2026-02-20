import { SVGAttributes } from "react"

export function HexagonIcon(props:SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width={props.width ?? "9"}
      height={props.height ?? "10"}
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.33008 0L8.66021 2.5V7.5L4.33008 10L-4.91142e-05 7.5V2.5L4.33008 0Z"
        fill={props?.fill ?? "#73C057"}
      />
    </svg>
  );
}
