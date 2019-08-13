export const applyFocus = ({ changeObject, changeFunction }) => {
  const fieldName = Object.keys(changeObject)[0]

  const ref = changeObject[fieldName].ref
  if (ref.current.focus) {
    ref.current.focus()
  } else if (ref.current.setFocus) {
    // this is for <DatePicker /> components
    ref.current.setFocus()
  } else {
    console.warn(
      'Tried to focus on object that does not support focus',
      ref.current
    )
  }

  changeFunction({
    [fieldName]: {
      ...changeObject[fieldName],
      focus: false,
    },
  })
}
