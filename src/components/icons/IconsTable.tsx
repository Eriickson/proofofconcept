import React from "react";

export function InactiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 21 20">
      <g opacity="0.5">
        <rect width="20" height="20" x="0.896" fill="#DFE3E3" rx="5.714"></rect>
        <path
          stroke="#93AEB9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.576"
          d="M9.846 7.295l-4.662 7.694H16.35l-1.226-1.895M13.634 10.817l-.354-.548-.476-.716"
        ></path>
        <path
          fill="#93AEB9"
          d="M12.315 6.008a1.733 1.733 0 11-3.467 0 1.733 1.733 0 013.466 0zm-2.243 0a.51.51 0 101.019 0 .51.51 0 00-1.02 0z"
        ></path>
      </g>
    </svg>
  );
}

export function ActiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 21 20">
      <rect width="20" height="20" x="0.896" fill="#CC214F" rx="5.714"></rect>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.576"
        d="M9.846 7.295l-4.662 7.694H16.35l-1.226-1.895M13.634 10.817l-.354-.548-.476-.716"
      ></path>
      <path
        fill="#fff"
        d="M12.315 6.008a1.733 1.733 0 11-3.467 0 1.733 1.733 0 013.466 0zm-2.243 0a.51.51 0 101.019 0 .51.51 0 00-1.02 0z"
      ></path>
    </svg>
  );
}
