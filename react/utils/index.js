export function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}