import React from 'react'
import { Input } from 'vtex.styleguide'

const renderRangeInputObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const { placeholder, type, update, intl } = extraParams

  return (
    <div className="flex">
      <Input
        type={type}
        placeholder={placeholder}
        errorMessage={
          statements[statementIndex].object &&
          parseInt(statements[statementIndex].object.first) >=
            parseInt(statements[statementIndex].object.last)
            ? intl.formatMessage({ id: 'promotions.validation.rangeInput' })
            : ''
        }
        value={values && values.first ? values.first : ''}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.first = e.target.value.replace(/\D/g, '')

          statements[statementIndex].object = currentObject
          update({
            statements,
          })
        }}
      />

      <div className="mv4 mh3 c-muted-2 b">
        {intl.formatMessage({
          id: 'promotions.promotion.elligibility.conditions.operatorAnd',
        })}
      </div>

      <Input
        type={type}
        placeholder={placeholder}
        value={values && values.last ? values.last : ''}
        onChange={e => {
          const currentObject = statements[statementIndex].object || {}
          currentObject.last = e.target.value.replace(/\D/g, '')

          statements[statementIndex].object = currentObject
          update({
            statements,
          })
        }}
      />
    </div>
  )
}

export default renderRangeInputObject
