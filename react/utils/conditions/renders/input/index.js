import React from 'react'
import { Input } from 'vtex.styleguide'

const renderInputObject = ({
  statements,
  values,
  statementIndex,
  error,
  extraParams,
}) => {
  const { placeholder, type, update } = extraParams

  return (
    <div className="flex">
      <Input
        type={type}
        placeholder={placeholder}
        value={values || ''}
        errorMessage={statements[statementIndex].error}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          update({
            statements: {
              value: statements,
            },
          })
        }}
      />
    </div>
  )
}

export default renderInputObject
