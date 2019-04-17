import React from 'react'

export default function Completed({
  fill = 'none',
  color = 'currentColor',
  size = 12,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={fill}>
      <path
        d="M6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C9.3 12 12 9.3 12 6C12 2.7 9.3 0 6 0ZM6 10.5C3.525 10.5 1.5 8.475 1.5 6C1.5 3.525 3.525 1.5 6 1.5C8.475 1.5 10.5 3.525 10.5 6C10.5 8.475 8.475 10.5 6 10.5Z"
        fill={color}
      />
    </svg>
  )
}
