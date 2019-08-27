import React, { useRef } from 'react'
import { injectIntl, InjectedIntlProps } from 'react-intl'

import { Input } from 'vtex.styleguide'

export interface Props extends InjectedIntlProps {
  error?: string
  operator: string
  placeholder?: string
  onChange: (value: Props['value'], error?: Props['error']) => void
  type?: string
  value?: {
    first?: string
    last?: string
  }
}

const InputNumberRangeObject: React.FC<Props> = ({
  error,
  intl,
  placeholder,
  onChange,
  value,
}) => {
  const ref = useRef<HTMLInputElement>(null)

  if (error && ref.current) {
    ref.current.focus()
  }

  return (
    <div className="flex">
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newFirstValue = e.target.value

          let error: string | undefined
          if (
            value &&
            value.last &&
            parseFloat(value.last) < parseFloat(newFirstValue)
          ) {
            error = intl.formatMessage({
              id: 'promotions.validation.rangeInput',
            })
          }

          onChange(
            {
              ...value,
              first: newFirstValue,
            },
            error
          )
        }}
        placeholder={placeholder}
        type="number"
        value={value && value.first ? value.first : ''}
      />

      <div className="mv4 mh3 c-muted-2 b">
        {intl.formatMessage({
          id: 'promotions.promotion.elligibility.conditions.operatorAnd',
        })}
      </div>

      <Input
        errorMessage={error}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newLastValue = e.target.value

          let error: string | undefined
          if (
            value &&
            value.first &&
            parseFloat(value.first) > parseFloat(newLastValue)
          ) {
            error = intl.formatMessage({
              id: 'promotions.validation.rangeInput',
            })
          }

          onChange(
            {
              ...value,
              last: newLastValue,
            },
            error
          )
        }}
        placeholder={placeholder}
        ref={ref}
        type="number"
        value={value && value.last ? value.last : ''}
      />
    </div>
  )
}

export default injectIntl<Props>(InputNumberRangeObject)
