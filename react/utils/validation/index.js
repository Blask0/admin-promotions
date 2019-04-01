import React from 'react'

export const newFieldWithValidation = value => ({
  value,
  error: undefined,
  focus: undefined,
  ref: React.createRef(),
})
