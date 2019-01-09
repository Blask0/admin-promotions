import React from 'react'

export default function Present({ fill = 'none', color = '#111111', size = 32 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill={fill}>
      <g clip-path="url(#clip0)">
        <path d="M28.4488 17V27C28.4488 27.7956 28.1327 28.5587 27.5701 29.1213C27.0075 29.6839 26.2444 30 25.4488 30H7.44879C6.65314 30 5.89008 29.6839 5.32747 29.1213C4.76486 28.5587 4.44879 27.7956 4.44879 27V17" stroke={color} stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
        <path d="M31.4488 8H1.44879V13H31.4488V8Z" stroke={color} stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
        <path d="M7.44879 5C7.44879 4.20435 7.76486 3.44129 8.32747 2.87868C8.89008 2.31607 9.65314 2 10.4488 2C14.8868 2 16.4488 8 16.4488 8H10.4488C9.65314 8 8.89008 7.68393 8.32747 7.12132C7.76486 6.55871 7.44879 5.79565 7.44879 5V5Z" stroke={color} stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
        <path d="M25.4488 5C25.4488 4.20435 25.1327 3.44129 24.5701 2.87868C24.0075 2.31607 23.2444 2 22.4488 2C18.0108 2 16.4488 8 16.4488 8H22.4488C23.2444 8 24.0075 7.68393 24.5701 7.12132C25.1327 6.55871 25.4488 5.79565 25.4488 5V5Z" stroke={color} stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
        <path d="M19.4488 8H13.4488V30H19.4488V8Z" stroke={color} stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width={size} height={size} fill="white" transform="translate(0.897583)"/>
        </clipPath>
      </defs>
    </svg>
  )
}
