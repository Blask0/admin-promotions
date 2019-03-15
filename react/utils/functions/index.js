export const applyFocus = ({ changeObject, changeFunction }) => {
  const fieldName = Object.keys(changeObject)[0]

  changeObject[fieldName].ref.current.focus()

  changeFunction({
    [fieldName]: {
      ...changeObject[fieldName],
      focus: false,
    },
  })
}
