import { SVGAttributes } from "react";

export function CheckListIcon(props: SVGAttributes<HTMLOrSVGElement>) {
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

export function CheckCircle(props: SVGAttributes<HTMLOrSVGElement>) {
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

export function TickIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83301 16.917C5.83301 16.917 7.58301 16.917 9.91634 21.0003C9.91634 21.0003 16.4016 10.3059 22.1663 8.16699"
        stroke="#73C057"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckedDocument(props:SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      width={props.width ?? "32"}
      height={props.height ?? "32"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9727 9.35547C19.9727 9.35547 20.6393 10.0221 21.306 11.3555C21.306 11.3555 23.4236 8.02214 25.306 7.35547"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3278 2.6913C9.99648 2.55026 7.4228 2.93402 7.4228 2.93402C5.79766 3.05022 2.68325 3.96131 2.68328 9.28223C2.6833 14.5579 2.64882 21.0619 2.68328 23.6547C2.68328 25.2388 3.6641 28.9339 7.05898 29.1319C11.1854 29.3727 18.6183 29.4239 22.0286 29.1319C22.9415 29.0804 25.9808 28.3638 26.3655 25.057C26.764 21.6312 26.6847 19.2504 26.6847 18.6838"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.3344 9.35417C29.3344 13.0361 26.3468 16.0209 22.6613 16.0209C18.9759 16.0209 15.9883 13.0361 15.9883 9.35417C15.9883 5.67227 18.9759 2.6875 22.6613 2.6875C26.3468 2.6875 29.3344 5.67227 29.3344 9.35417Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.30859 17.3555H14.6419"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.30859 22.6875H19.9752"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
