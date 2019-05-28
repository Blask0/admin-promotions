import React from 'react'

export default function File({
  fill = 'none',
  color = 'currentColor',
  size = 32,
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M4.5 11.5H11.5"
          stroke="#134CD8"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 8.5H11.5"
          stroke="#134CD8"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 5.5H6.5"
          stroke="#134CD8"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.79289 0.792893C9.60536 0.605357 9.351 0.5 9.08579 0.5H2.5C1.94772 0.5 1.5 0.947715 1.5 1.5V14.5C1.5 15.0523 1.94772 15.5 2.5 15.5H13.5C14.0523 15.5 14.5 15.0523 14.5 14.5V5.91421C14.5 5.649 14.3946 5.39464 14.2071 5.20711L9.79289 0.792893Z"
          stroke="#134CD8"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 0.5V5.5H14.5"
          stroke="#134CD8"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
