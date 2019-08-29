import React from 'react'
import PropTypes from 'prop-types'

declare global {
  interface Window {
    Element: new (...args: any[]) => unknown
  }
}

// For more info see: https://stackoverflow.com/a/51127130/10725088
const Element =
  typeof window === 'undefined' || typeof window.Element === 'undefined'
    ? ((function() {} as unknown) as Window['Element'])
    : window.Element

export const refShape = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.instanceOf(Element)]),
  }),
])

export type ForwardedRefProps<T> = {
  ref: React.Ref<T>
}

export function withForwardedRef<T, P>(
  Component: React.ComponentType<P & ForwardedRefProps<T>>
) {
  const ComponentWithRef = React.forwardRef<T, P>((props, ref) => {
    return <Component {...props} ref={ref} />
  })

  ComponentWithRef.displayName = Component.displayName || Component.name

  return ComponentWithRef
}
