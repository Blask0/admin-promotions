import React from 'react'
import PropTypes from 'prop-types'
import { withForwardedRef } from './withForwardedRef'

import { Input } from 'vtex.styleguide'

const MIN_PERCENTAGE = 0
const MAX_PERCENTAGE = 100

function InputPercentage({ forwardedRef, value, errorMessage, onChange }) {
  return (
    <Input
      type="number"
      min={MIN_PERCENTAGE}
      max={MAX_PERCENTAGE}
      value={value}
      ref={forwardedRef}
      errorMessage={errorMessage}
      onChange={e => {
        const value = parseFloat(e.target.value)
        onChange({
          target: {
            value: isNaN(value) ? '' : value,
          },
        })
      }}
      prefix={<span className="b f6">%</span>}
    />
  )
}

InputPercentage.propTypes = {
  ...Input.propTypes,
}

export default withForwardedRef(InputPercentage)
