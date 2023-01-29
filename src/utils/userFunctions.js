export const isEmptyObject = (object) => {
  if (object == null) return true
  return Object.entries(object).length === 0
}

export const isEmptyArray = (array) => {
  return array.length === 0
}
