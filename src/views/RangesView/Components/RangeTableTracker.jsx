
export const useRangeTrackChanges = (
  { ranges, setRanges, rangesToDelete, setRangesToDelete, setEditedRanges, editedRanges, errors, setErrors }
) => {
  const defaultRange = { min_value: '', max_value: '' }
  const handleAddSpecificRow = (idx, isRangesEmpty) => {
    const newRanges = !hasRowEdgeValues() && isRangesEmpty ? [...ranges, { min_value: null, max_value: null }, { min_value: null, max_value: null }] : [...ranges]
    const range = { ...defaultRange, defaultIndex: idx }
    newRanges.splice(idx, 0, range)
    if (idx === newRanges.length - 2) {
      newRanges[newRanges.length - 1].min_value = newRanges[newRanges.length - 2].max_value
    }
    setRanges(newRanges)
  }

  const getEdgeRanges = () => ranges.filter(range => range?.min_value === null || range?.max_value === null).map(range => range.id)

  const handleRemoveSpecificRow = (idx) => {
    const deletedRow = ranges[idx + 1]
    const edgeRanges = getEdgeRanges()
    const deletedRanges = isDeletingAllRanges(idx) ? [...rangesToDelete, deletedRow.id, ...edgeRanges].filter(id => id !== '') : [...rangesToDelete, deletedRow.id].filter(id => id !== '')
    const newRanges = [...ranges]
    newRanges.splice(idx + 1, 1)
    if (idx === 0) {
      newRanges[0].max_value = newRanges[1].min_value
      newRanges[1].defaultIndex = 1
      setEditedRanges([...editedRanges, newRanges[0]])
    }
    if (idx === newRanges.length - 2) {
      newRanges[newRanges.length - 1].min_value = newRanges[newRanges.length - 2].max_value
      setEditedRanges([...editedRanges, newRanges[newRanges.length - 1]])
    }
    if (isDeletingAllRanges(idx)) {
      setEditedRanges([])
    }
    setRanges(newRanges)
    setRangesToDelete(deletedRanges)
  }

  const handleInputChange = (idx) => (e) => {
    const { name, value } = e.target
    const actualRange = ranges[idx + 1]
    if (name === 'min_value') {
      actualRange.min_value = value
    }
    if (name === 'max_value') {
      actualRange.max_value = value
    }
    const newRanges = [...ranges]
    newRanges[idx + 1] = {
      ...actualRange
    }
    if (actualRange.id !== undefined) {
      editExistingRanges(actualRange, idx)
    }
    if (idx === newRanges.length - 3) {
      editUpperEdgeRange(newRanges)
    }
    if (idx === 0) {
      editLowerEdgeRange(newRanges)
    }
    setRanges(newRanges)
  }

  const validateRanges = () => {
    ranges.forEach((range, index) => {
      if (rowHasSpecificError('rangeError', index) && isRangeCorrect(range)) {
        const updatedError = errors.filter(error => error?.row !== index || error?.type !== 'rangeError')
        setErrors([...updatedError])
      }
      if (rowHasSpecificError('limitError', index) && isRangeLimitCorrect(range, ranges[index + 1])) {
        const updatedError = errors.filter(error => (error?.row !== index || error?.type !== 'limitError'))
        setErrors([...updatedError])
      }
      if (!rowHasSpecificError('rangeError', index) && !isRangeCorrect(range)) {
        setErrors([...errors, { row: index, type: 'rangeError', errorMessage: `row ${index}: The minimum value must be less than the maximum value in the same range` }])
      }
      if (!rowHasSpecificError('limitError', index) && !isRangeLimitCorrect(range, ranges[index + 1]) && index !== 0) {
        setErrors([...errors, { row: index, type: 'limitError', errorMessage: `row ${index}: The upper limit must be equal to the lower limit of the next range` }])
      }
    })
  }

  const castToNumber = (number) => {
    return number !== null ? parseFloat(number) : number
  }

  const isRangeCorrect = (range) => (castToNumber(range?.min_value) < castToNumber(range?.max_value)) || (range?.max_value == null || range?.min_value == null)

  const isRangeLimitCorrect = (range, nextRange) => castToNumber(range?.max_value) === castToNumber(nextRange?.min_value) || (nextRange?.max_value == null || nextRange?.min_value == null) || (range?.max_value == null || range?.min_value == null)

  const rowHasSpecificError = (errorType, index) => errors.find(error => error?.row === index && error?.type === errorType)

  const editExistingRanges = (range, idx) => {
    const modifiedRange = editedRanges.find(elem => elem.id === range.id)
    range.defaultIndex = idx + 1
    if (modifiedRange === undefined) {
      setEditedRanges([...editedRanges, range])
    } else {
      const indexRange = editedRanges.map(elem => elem.id).indexOf(modifiedRange.id)
      editedRanges[indexRange] = range
      setEditedRanges(editedRanges)
    }
  }

  const editLowerEdgeRange = (newRanges) => {
    newRanges[0].max_value = newRanges[1].min_value
    newRanges[0].min_value = null
    const updatedRange = editedRanges.find(elem => elem.id === newRanges[0].id)
    if (updatedRange === undefined) {
      setEditedRanges([...editedRanges, newRanges[0]])
    }
    removeEdgeRangesFromRangesToDelete()
  }

  const editUpperEdgeRange = (newRanges) => {
    newRanges[newRanges.length - 1].min_value = newRanges[newRanges.length - 2].max_value
    const updatedRange = editedRanges.find(elem => elem.id === newRanges[newRanges.length - 1].id)
    if (updatedRange === undefined) {
      setEditedRanges([...editedRanges, newRanges[newRanges.length - 1]])
    }
    removeEdgeRangesFromRangesToDelete()
  }

  const removeEdgeRangesFromRangesToDelete = () => {
    getEdgeRanges().forEach(edgeRange => {
      if (rangesToDelete.includes(edgeRange)) {
        const newRangesToDelete = [...rangesToDelete].filter(id => id !== edgeRange)
        setRangesToDelete(newRangesToDelete)
      }
    })
  }

  const getRangesWithoutEdges = () => ranges.filter(range => range?.min_value !== null && range?.max_value !== null)

  const isDeletingAllRanges = (idx) => {
    return idx === 0 && getRangesWithoutEdges().length === 1
  }

  const hasRowEdgeValues = () => {
    const minEdgeRange = ranges.find(range => range.min_value === null && range.max_value !== null)
    const maxEdgeRange = ranges.find(range => range.max_value === null && range.min_value !== null)
    const defaultEdgeRange = ranges.find(range => range.min_value === null && range.max_value === null)
    return (minEdgeRange && maxEdgeRange) || defaultEdgeRange
  }

  return {
    handleAddSpecificRow,
    handleRemoveSpecificRow,
    handleInputChange,
    validateRanges,
    getRangesWithoutEdges
  }
}
