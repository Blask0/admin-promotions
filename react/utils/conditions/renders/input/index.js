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
  // if (statements[statementIndex].focus) {
  // statements[statementIndex].ref.current.focus()
  //   statements[statementIndex].focus = false

  //   update({
  //     statements: {
  //       ...statements,
  //       value: statements,
  //       error: undefined,
  //     },
  //   })
  // }

  return (
    <div className="flex">
      <Input
        type={type}
        placeholder={placeholder}
        value={values || ''}
        ref={ref}
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
