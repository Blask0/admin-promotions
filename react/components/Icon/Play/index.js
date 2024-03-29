import React from 'react'

export default function Play({
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
        d="M4.9 8.475L8.2 6L4.9 3.525V8.475ZM6 0.5C2.964 0.5 0.5 2.964 0.5 6C0.5 9.036 2.964 11.5 6 11.5C9.036 11.5 11.5 9.036 11.5 6C11.5 2.964 9.036 0.5 6 0.5ZM6 10.4C3.5745 10.4 1.6 8.4255 1.6 6C1.6 3.5745 3.5745 1.6 6 1.6C8.4255 1.6 10.4 3.5745 10.4 6C10.4 8.4255 8.4255 10.4 6 10.4Z"
        fill={color}
      />
    </svg>
  )
}
