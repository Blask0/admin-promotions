import React from 'react'

import { ToastProvider } from 'vtex.styleguide'

import './styles.global.css'

export default function({ children }) {
  return <ToastProvider positioning="window">{children}</ToastProvider>
}
