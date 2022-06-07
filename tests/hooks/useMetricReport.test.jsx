import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getByMetricReport } from '../../src/service/metricReport'
import { useMetricReport } from '../../src/hooks/useMetricReport'
import Context from '../../src/context/appContext'

const getByMetricReportResponse = {
  years: ['2020', '2021', '2019'],
  company_comparison_data: {
    id: '1222',
    name: 'ABC Company',
    metrics: {
      2020: 29,
      2021: 45
    }
  },
  peers_comparison_data: [
    {
      id: '1234',
      name: 'Sample Company',
      metrics: {
        2020: 56,
        2021: 65,
        2019: 45
      }
    }
  ]
}

jest.mock('../../src/service/metricReport')

const mockService = (response) => {
  getByMetricReport.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const wrapper = ({ children }) => (
  <Context.Provider value={{ filterFields: { filters: [], companyID: '123' } }}>
    {children}
  </Context.Provider>
)

describe('useMetricReport', () => {
  it('metric report hook should return report', async () => {
    mockService({ ...getByMetricReportResponse, company_comparison_data: {} })
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useMetricReport({ fromUniverseOverview: true, selectedMetric: 'Revenue - actual' }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toEqual('Revenue - actual')
    expect(hookResponse.result.current.years).toEqual(getByMetricReportResponse.years)
    expect(hookResponse.result.current.metricCompanyComparison).toEqual({})
    expect(hookResponse.result.current.metricPeersComparison).toEqual(getByMetricReportResponse.peers_comparison_data)
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })

  it('metric report hook should work when metric is null', async () => {
    mockService(getByMetricReportResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useMetricReport({ fromUniverseOverview: true, selectedMetric: null }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toBeNull()
    expect(hookResponse.result.current.years).toEqual([])
    expect(hookResponse.result.current.metricPeersComparison).toEqual([])
    expect(hookResponse.result.current.metricCompanyComparison).toEqual({})
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })

  it('metric report hook should render when fromUniverseOverview is false ', async () => {
    mockService(getByMetricReportResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useMetricReport({ fromUniverseOverview: false, selectedMetric: 'Ebitda - actual' }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toEqual('Ebitda - actual')
    expect(hookResponse.result.current.years).toEqual(getByMetricReportResponse.years)
    expect(hookResponse.result.current.metricCompanyComparison).toEqual(getByMetricReportResponse.company_comparison_data)
    expect(hookResponse.result.current.metricPeersComparison).toEqual(getByMetricReportResponse.peers_comparison_data)
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })

  it('metric report hook should return empty values when cath error ', async () => {
    mockService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useMetricReport({ fromUniverseOverview: false, selectedMetric: 'Ebitda - actual' }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toEqual('Ebitda - actual')
    expect(hookResponse.result.current.years).toEqual([])
    expect(hookResponse.result.current.metricPeersComparison).toEqual([])
    expect(hookResponse.result.current.metricCompanyComparison).toEqual({})
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })

  it('metric report hook should works when companyID is null ', async () => {
    mockService('error')
    const wrapper = ({ children }) => (
      <Context.Provider value={{ filterFields: { filters: [], companyID: null } }}>
        {children}
      </Context.Provider>
    )
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useMetricReport({ fromUniverseOverview: false, selectedMetric: 'Ebitda - actual' }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toEqual('Ebitda - actual')
    expect(hookResponse.result.current.years).toEqual([])
    expect(hookResponse.result.current.metricPeersComparison).toEqual([])
    expect(hookResponse.result.current.metricCompanyComparison).toEqual({})
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })
})
