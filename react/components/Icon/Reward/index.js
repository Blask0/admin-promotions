import React from 'react'

export default function Reward({ fill = 'none', color = '#111111', size = 32 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill={fill}>
      <g clip-path="url(#clip0)">
        <path d="M15.4794 11.037L11.3464 1H2.34644L8.19544 15.205" stroke={color} stroke-width="2" stroke-miterlimit="10"/>
        <path d="M17.2134 11.037L21.3464 1H30.3464L24.4974 15.205" stroke={color} stroke-width="2" stroke-miterlimit="10"/>
        <path d="M16.3464 31C21.8693 31 26.3464 26.5228 26.3464 21C26.3464 15.4772 21.8693 11 16.3464 11C10.8236 11 6.34644 15.4772 6.34644 21C6.34644 26.5228 10.8236 31 16.3464 31Z" stroke={color} stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
        <path d="M16.3464 16.0576L17.9524 19.3116L21.5424 19.8326L18.9444 22.3656L19.5574 25.9416L16.3464 24.2536L13.1354 25.9416L13.7484 22.3656L11.1504 19.8326L14.7404 19.3116L16.3464 16.0576Z" fill={color}/>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width={size} height={size} fill="white" transform="translate(0.346436)"/>
        </clipPath>
      </defs>
    </svg>
  )
}
