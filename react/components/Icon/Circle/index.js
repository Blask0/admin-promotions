import React from 'react'
const DEFAULT_SIZE = 14

export default function Circle({
  active = true,
  size = DEFAULT_SIZE,
}) {
  const fill = active ? '#8BC34A' : '#FF4C4C'
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="7" fill={fill}/>
    </svg>
  )
}
