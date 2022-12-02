export const order = {
  '<$10 million': 0,
  '$10-<$30 million': 1,
  '$30-<$50 million': 2,
  '$50-<$100 million': 3,
  '$100 million+': 4
}

export const sortByKey = (array, key) => {
  return array.sort((a, b) => {
    const x = a[key]
    const y = b[key]
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
}
