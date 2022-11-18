import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import useMetricRanges from '../../src/hooks/useMetricRanges'
import { getMetricRanges, getRangesByMetric, modifyMetricRanges } from '../../src/service/metricRanges'
import { getMetricsType } from '../../src/service/metrics'
import { DATA } from '../data/ranges'

jest.mock('../../src/service/metricRanges')
jest.mock('../../src/service/metrics')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const metrics = ['Revenue', 'Ebitda']

describe('useMetricRanges', () => {
  describe('render', () => {
    it('should render hook with no empty data when api calls are successful', async () => {
      mockService(getMetricRanges, DATA)
      mockService(getMetricsType, metrics)
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      expect(hookResponse.result.current.total).toEqual(DATA.total)
      expect(hookResponse.result.current.isLoading).toBeFalsy()
      expect(hookResponse.result.current.allMetricRanges).toEqual(DATA.ranges)
      expect(hookResponse.result.current.metrics).toEqual([...metrics, 'Gross profit', 'Revenue per employee'])
    })

    it('should render hook with empty data when api calls fail', async () => {
      mockService(getMetricRanges, 'error')
      mockService(getMetricsType, 'error')
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      expect(hookResponse.result.current.total).toEqual(0)
      expect(hookResponse.result.current.isLoading).toBeFalsy()
      expect(hookResponse.result.current.allMetricRanges).toEqual([])
      expect(hookResponse.result.current.metrics).toEqual([])
    })

    it('should return ranges by metric with no empty data when api call is successful', async () => {
      mockService(getRangesByMetric, DATA.ranges)
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      await act(async () => {
        hookResponse.result.current.getRangesBySpecificMetric()
      })

      expect(hookResponse.result.current.isLoading).toBeFalsy()
      expect(hookResponse.result.current.metricRanges).toEqual(DATA.ranges)
    })

    it('should return ranges by metric with empty data when api call fail', async () => {
      mockService(getRangesByMetric, 'error')
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      await act(async () => {
        hookResponse.result.current.getRangesBySpecificMetric()
      })

      expect(hookResponse.result.current.isLoading).toBeFalsy()
      expect(hookResponse.result.current.metricRanges).toEqual([])
    })
  })

  describe('pagination', () => {
    it('should call next ranges when a page changes and is called for first time', async () => {
      mockService(getMetricRanges, DATA)
      mockService(getMetricsType, metrics)
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      await act(async () => {
        hookResponse.result.current.handleChangePage('', 1)
      })

      expect(hookResponse.result.current.page).toEqual(1)
      expect(getMetricRanges).toHaveBeenCalledTimes(2)
    })

    it('should not call ranges service function when previous page ranges were already called', async () => {
      mockService(getMetricRanges, DATA)
      mockService(getMetricsType, metrics)
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      await act(async () => {
        hookResponse.result.current.handleChangePage('', 1)
      })
      await act(async () => {
        hookResponse.result.current.handleChangePage('', 0)
      })

      expect(hookResponse.result.current.page).toEqual(0)
      expect(getMetricRanges).toHaveBeenCalledTimes(2)
    })

    it('should not call ranges service function when next page ranges were already called', async () => {
      mockService(getMetricRanges, DATA)
      mockService(getMetricsType, metrics)
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      await act(async () => {
        hookResponse.result.current.handleChangePage('', 1)
      })
      await act(async () => {
        hookResponse.result.current.handleChangePage('', 0)
      })
      await act(async () => {
        hookResponse.result.current.handleChangePage('', 1)
      })

      expect(hookResponse.result.current.page).toEqual(1)
      expect(getMetricRanges).toHaveBeenCalledTimes(2)
    })

    it('should call change pageSize when handleChangeRowsPerPage is called', async () => {
      mockService(getMetricRanges, DATA)
      mockService(getMetricsType, metrics)
      let hookResponse
      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      await act(async () => {
        hookResponse.result.current.handleChangePageSize(25)
      })

      expect(hookResponse.result.current.pageSize).toEqual(25)
      expect(getMetricRanges).toHaveBeenCalledTimes(2)
    })
  })

  describe('Modify ranges', () => {
    it('Should modify ranges when calling service and api call is successful', async () => {
      mockService(modifyMetricRanges, { updated: true })
      const mockEditedRanges = [{ id: '1', min_value: 10, max_value: 20 }]
      const mockRangesToDelete = ['2']
      let hookResponse

      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })
      await act(async () => {
        hookResponse.result.current.setEditedRanges(mockEditedRanges)
      })
      await act(async () => {
        hookResponse.result.current.setRangesToDelete(mockRangesToDelete)
      })
      await act(async () => {
        hookResponse.result.current.modifyRanges('revenue')
      })

      expect(hookResponse.result.current.isLoading).toBeFalsy()
      expect(hookResponse.result.current.editedRanges).toEqual(mockEditedRanges)
      expect(hookResponse.result.current.rangesToDelete).toEqual(mockRangesToDelete)
    })

    it('Should return false when calling service and api call is successful but modification fails', async () => {
      mockService(modifyMetricRanges, { updated: false })
      let hookResponse

      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })
      await act(async () => {
        hookResponse.result.current.modifyRanges('revenue')
      })

      expect(hookResponse.result.current.isLoading).toBeFalsy()
    })

    it('Should return false when calling service and api call fails', async () => {
      mockService(modifyMetricRanges, 'error')
      let hookResponse

      await act(async () => {
        hookResponse = renderHook(() => useMetricRanges())
      })

      await act(async () => {
        hookResponse.result.current.modifyRanges('revenue')
      })

      expect(hookResponse.result.current.isLoading).toBeFalsy()
    })
  })
})
