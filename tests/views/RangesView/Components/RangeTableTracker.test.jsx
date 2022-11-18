import { renderHook, act } from '@testing-library/react-hooks'
import { useRangeTrackChanges } from '../../../../src/views/RangesView/Components/RangeTableTracker'

const defaultProps = {
  ranges: [{ id: '1', max_value: 10, min_value: null }, { id: '1', max_value: 20, min_value: 10 }, { id: '1', max_value: null, min_value: 20 }],
  setRanges: jest.fn(),
  rangesToDelete: [],
  setRangesToDelete: jest.fn(),
  editedRanges: [],
  setEditedRanges: jest.fn(),
  errors: [],
  setErrors: jest.fn()
}

describe('useRangeTrackChanges', () => {
  it('useRangeTrackChanges should handle adding a row when range is not last range', async () => {
    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(defaultProps))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.handleAddSpecificRow(0, true)
    })

    expect(defaultProps.setRanges).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should handle adding a row when adding in last range', async () => {
    let useComparisonPeersResult
    const props = {
      ...defaultProps,
      ranges: [{ min_value: 10, max_value: 18 }, { min_value: 18, max_value: 20 }, { min_value: 20, max_value: 25 }, { min_value: 25, max_value: 30 }],
      errors: [{ row: 1, type: 'rangeError' }]
    }
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(props))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.handleAddSpecificRow(3, false)
    })

    expect(defaultProps.setRanges).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should handle removing a row', async () => {
    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(defaultProps))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.handleRemoveSpecificRow(0)
    })

    expect(defaultProps.setRangesToDelete).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should validate range error when there are not errors', async () => {
    let useComparisonPeersResult
    const props = { ...defaultProps, ranges: [{ min_value: 10, max_value: 8 }, { min_value: 18, max_value: 20 }] }
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(props))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.validateRanges()
    })

    expect(defaultProps.setErrors).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should validate limit error when there are not errors', async () => {
    let useComparisonPeersResult
    const props = { ...defaultProps, ranges: [{ min_value: 10, max_value: 18 }, { min_value: 18, max_value: 20 }, { min_value: 21, max_value: 25 }] }
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(props))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.validateRanges()
    })

    expect(defaultProps.setErrors).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should validate range error when there are errors', async () => {
    let useComparisonPeersResult
    const props = {
      ...defaultProps,
      ranges: [{ min_value: 10, max_value: 18 }, { min_value: 18, max_value: 20 }, { min_value: 21, max_value: 25 }],
      errors: [{ row: 1, type: 'rangeError' }]
    }
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(props))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.validateRanges()
    })

    expect(defaultProps.setErrors).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should validate limit error when there are errors', async () => {
    let useComparisonPeersResult
    const props = {
      ...defaultProps,
      ranges: [{ min_value: 10, max_value: 18 }, { min_value: 18, max_value: 20 }, { min_value: 20, max_value: 25 }],
      errors: [{ row: 1, type: 'limitError' }]
    }
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(props))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.validateRanges()
    })

    expect(defaultProps.setErrors).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should handle editing a min value in a row', async () => {
    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(defaultProps))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.handleInputChange({ target: { name: 'min_value', value: '10' } }, 1)
    })

    expect(defaultProps.setEditedRanges).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should handle editing a max value in a row', async () => {
    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(defaultProps))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.handleInputChange({ target: { name: 'max_value', value: '10' } }, 1)
    })

    expect(defaultProps.setEditedRanges).toHaveBeenCalled()
  })

  it('useRangeTrackChanges should handle editing a max value in first row', async () => {
    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useRangeTrackChanges(defaultProps))
    })
    await act(async () => {
      useComparisonPeersResult.result.current.handleInputChange({ target: { name: 'max_value', value: '10' } }, 0)
    })

    expect(defaultProps.setEditedRanges).toHaveBeenCalled()
  })
})
