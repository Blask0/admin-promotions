export const ucfirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

type DynamicObject = {
  [prop: string]: any
}

export const uniqByProp = (arr: DynamicObject[], prop: string) => {
  var seen: Record<any, boolean> = {}
  return arr.filter(item => {
    return seen.hasOwnProperty(prop) ? false : (seen[item[prop]] = true)
  })
}
