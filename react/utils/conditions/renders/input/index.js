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
        // ref={statements[statementIndex].refs.object}
        errorMessage={statements[statementIndex].error}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          statements[statementIndex].error = undefined

          update({
            statements: {
              ...statements,
              value: statements,
              error: undefined,
            },
          })
        }}
      />
    </div>
  )
}

export default renderInputObject
