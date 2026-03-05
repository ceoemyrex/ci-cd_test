import { SVGAttributes } from "react";

export function CheckBoxIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_247_1270)">
        <rect x="4" y="4" width="20" height="20" rx="10" fill="#94E976" />
        <path
          d="M12.5775 17.6675C12.3775 17.6675 12.1875 17.5875 12.0475 17.4475L9.2175 14.6175C8.9275 14.3275 8.9275 13.8475 9.2175 13.5575C9.5075 13.2675 9.9875 13.2675 10.2775 13.5575L12.5775 15.8575L17.7175 10.7175C18.0075 10.4275 18.4875 10.4275 18.7775 10.7175C19.0675 11.0075 19.0675 11.4875 18.7775 11.7775L13.1075 17.4475C12.9675 17.5875 12.7775 17.6675 12.5775 17.6675Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_247_1270"
          x="0"
          y="0"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_247_1270"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.580392 0 0 0 0 0.913725 0 0 0 0 0.462745 0 0 0 0.28 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_247_1270"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_247_1270"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function DoubleCheck(props:SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width={props.width ?? "28"}
      height={props.height ?? "28"}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 15.5555C3.5 15.5555 5.25 16.3333 7.58333 19.8333C7.58333 19.8333 7.91566 19.2724 8.54155 18.378M19.8333 7C17.1599 8.33673 14.3639 11.1438 12.1192 13.7927"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33594 15.5555C9.33594 15.5555 11.0859 16.3333 13.4193 19.8333C13.4193 19.8333 19.8359 9.91667 25.6693 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
