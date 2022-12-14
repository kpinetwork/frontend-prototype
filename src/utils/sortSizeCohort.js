export const order = (listObj) => {
  if (listObj.length !== 0) {
    const middleValues = getListFilteredByChar(listObj, '-')
    middleValues.sort((a, b) => getRangeValue(a) - getRangeValue(b))

    const endValue = getListFilteredByChar(listObj, '+')

    const initValue = listObj.filter(size => size.size_cohort.substring(0, 1) === '<').map(size => size.size_cohort)

    const finalArray = initValue.concat(middleValues).concat(endValue)
    return Object.fromEntries(finalArray.map((element, index) => [element, index]))
  }
  return {}
}

const getRangeValue = (label) => {
  const number = label.split('-')[0].substring(1)
  return number
}

const getListFilteredByChar = (sizeList, char) => sizeList.filter(size => size.size_cohort.includes(char)).map(size => size.size_cohort)

export const sortByKey = (array, key) => {
  return array.sort((a, b) => {
    const x = a[key]
    const y = b[key]
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
}
