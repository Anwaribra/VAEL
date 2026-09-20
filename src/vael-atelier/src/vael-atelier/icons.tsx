import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const IconUp = () => (
  <svg {...base}>
    <path d="M3.5 10 8 5.5 12.5 10" />
  </svg>
);
export const IconDown = () => (
  <svg {...base}>
    <path d="M3.5 6 8 10.5 12.5 6" />
  </svg>
);
export const IconEye = () => (
  <svg {...base}>
    <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" />
    <circle cx="8" cy="8" r="2" />
  </svg>
);
export const IconEyeOff = () => (
  <svg {...base}>
    <path d="M2 2l12 12" />
    <path d="M6.3 3.8A6.6 6.6 0 0 1 8 3.5c4 0 6.5 4.5 6.5 4.5a11 11 0 0 1-2 2.5M9.7 12.2a6.6 6.6 0 0 1-1.7.3C4 12.5 1.5 8 1.5 8a11 11 0 0 1 2.3-2.7" />
    <path d="M6.6 6.6a2 2 0 0 0 2.8 2.8" />
  </svg>
);
export const IconClose = () => (
  <svg {...base}>
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
  </svg>
);
export const IconPlus = () => (
  <svg {...base}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);
export const IconReplay = () => (
  <svg {...base}>
    <path d="M3 8a5 5 0 1 0 1.6-3.7" />
    <path d="M3 2.5v3h3" />
  </svg>
);
export const IconGrip = () => (
  <svg {...base} strokeWidth={0} fill="currentColor">
    <circle cx="6" cy="4" r="1" />
    <circle cx="10" cy="4" r="1" />
    <circle cx="6" cy="8" r="1" />
    <circle cx="10" cy="8" r="1" />
    <circle cx="6" cy="12" r="1" />
    <circle cx="10" cy="12" r="1" />
  </svg>
);
export const IconChevronLeft = () => (
  <svg {...base}>
    <path d="M10 3.5 5.5 8l4.5 4.5" />
  </svg>
);
export const IconChevronRight = () => (
  <svg {...base}>
    <path d="M6 3.5 10.5 8 6 12.5" />
  </svg>
);
