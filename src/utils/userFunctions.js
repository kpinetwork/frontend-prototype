export const isEmptyObject = (object) => {
  if (object == null) return true
  return Object.entries(object).length === 0
}
