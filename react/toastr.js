import React from 'react'

import { ToastProvider } from 'vtex.styleguide'

export default function({ children }) {
  return <ToastProvider positioning="window">{children}</ToastProvider>
}
