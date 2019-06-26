import React from 'react'
const DEFAULT_SIZE = 32

export default function Price({
  fill = 'none',
  color = 'currentColor',
  size = DEFAULT_SIZE,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`}
      fill={fill}>
      <g clipPath="url(#clip0)">
        <path
          d="M11 21L21 11"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M27 21L31 16L27 11V5H21L16 1L11 5H5V11L1 16L5 21V27H11L16 31L21 27H27V21Z"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width={DEFAULT_SIZE} height={DEFAULT_SIZE} fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
