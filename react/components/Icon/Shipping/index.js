import React from 'react'
const DEFAULT_SIZE = 32

export default function Shipping({
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
          d="M12.8976 3H1.89758V25H12.8976V3Z"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M24.8976 25H31.8976V16L25.8976 14L23.8976 7H12.8976"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M12.8976 25H16.8976"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M20.8976 29C23.1067 29 24.8976 27.2091 24.8976 25C24.8976 22.7909 23.1067 21 20.8976 21C18.6884 21 16.8976 22.7909 16.8976 25C16.8976 27.2091 18.6884 29 20.8976 29Z"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M17.8976 11V14H21.8976"
          stroke={color}
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width={DEFAULT_SIZE}
            height={DEFAULT_SIZE}
            fill="white"
            transform="translate(0.897583)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
