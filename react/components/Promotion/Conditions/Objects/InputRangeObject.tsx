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

const InputRangeObject: React.FC<Props> = ({
  error,
  intl,
  placeholder,
  type,
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(
            {
              ...value,
              first: e.target.value,
            },
            error
          )
        }
        placeholder={placeholder}
        type={type}
        value={value && value.first ? value.first : ''}
      />

      <div className="mv4 mh3 c-muted-2 b">
        {intl.formatMessage({
          id: 'promotions.promotion.elligibility.conditions.operatorAnd',
        })}
      </div>

      <Input
        errorMessage={error}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(
            {
              ...value,
              last: e.target.value,
            },
            error
          )
        }
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value && value.last ? value.last : ''}
      />
    </div>
  )
}

export default injectIntl<Props>(InputRangeObject)
