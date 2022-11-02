import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import useMetricRanges from '../../src/hooks/useMetricRanges'
import { getMetricRanges } from '../../src/service/metricRanges'
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
      expect(hookResponse.result.current.metricRanges).toEqual(DATA.ranges)
      expect(hookResponse.result.current.metrics).toEqual([...metrics, 'Gross profit'])
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
      expect(hookResponse.result.current.metricRanges).toEqual([])
      expect(hookResponse.result.current.metrics).toEqual([])
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
})