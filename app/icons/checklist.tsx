import { SVGAttributes } from "react";

export function CheckListIcon(props:SVGAttributes<HTMLOrSVGElement>) {
  return (
    <>
      <svg
        {...props}
        width={props.width ?? "32"}
        height={props.height ?? "32"}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.3268 2.66797H12.6602C11.5556 2.66797 10.6602 3.5634 10.6602 4.66797C10.6602 5.77253 11.5556 6.66797 12.6602 6.66797H19.3268C20.4314 6.66797 21.3268 5.77253 21.3268 4.66797C21.3268 3.5634 20.4314 2.66797 19.3268 2.66797Z"
          stroke={props.fill ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.3281 4.66797C23.3995 4.73038 24.6348 4.9614 25.4899 5.81645C26.6615 6.98802 26.6615 8.87361 26.6615 12.6448V21.3339C26.6615 25.1052 26.6615 26.9908 25.4899 28.1624C24.3183 29.3339 22.4327 29.3339 18.6615 29.3339H13.3281C9.5569 29.3339 7.67129 29.3339 6.49971 28.1624C5.32814 26.9908 5.32814 25.1052 5.32812 21.334L5.32815 12.6449C5.32814 8.87364 5.32814 6.98801 6.49971 5.81644C7.35475 4.96138 8.59015 4.73038 10.6613 4.66797"
          stroke={props.fill ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99609 14.668L11.3294 16.0013L13.9961 12.668"
          stroke={props.fill ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.3281 22.668H21.3281M17.3281 14.668H21.3281"
          stroke={props.fill ?? "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.3125 22.4922H11.3258"
          stroke={props.fill ?? "white"}
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function CheckCircle(props:SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width={props.width ?? "32"}
      height={props.height ?? "32"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0013 3.27837C18.7386 2.88177 17.3949 2.66797 16.0013 2.66797C8.6375 2.66797 2.66797 8.6375 2.66797 16.0013C2.66797 23.365 8.6375 29.3346 16.0013 29.3346C23.365 29.3346 29.3346 23.365 29.3346 16.0013C29.3346 14.6077 29.1208 13.264 28.7242 12.0013"
        stroke={props.fill ?? "white"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11.332 12.6667L15.9987 17.3333L27.999 4"
        stroke={props.fill ?? "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
