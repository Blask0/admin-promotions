import React from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import InputRangeObject from './InputRangeObject'

export interface Props extends InjectedIntlProps {
  error?: string
  operator: string
  placeholder?: string
  onChange: (value: Props['value'], error?: Props['error']) => void
  value?: {
    first?: string
    last?: string
  }
}

const InputNumberRangeObject: React.FC<Props> = ({
  intl,
  onChange,
  ...props
}) => {
  return (
    <InputRangeObject
      {...props}
      onChange={value => {
        console.log('number range change:', value)

        let error: string | undefined
        if (
          value &&
          value.first &&
          value.last &&
          parseFloat(value.first) >= parseFloat(value.last)
        ) {
          error = intl.formatMessage({
            id: 'promotions.validation.rangeInput',
          })
        }

        onChange(value, error)
      }}
      type="number"
    />
  )
}

export default injectIntl<Props>(InputNumberRangeObject)
