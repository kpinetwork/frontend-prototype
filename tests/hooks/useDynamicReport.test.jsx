import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getDynamicReport } from '../../src/service/dynamicReport'
import { useDynamicReport } from '../../src/hooks/useDynamicReport'
import Context from '../../src/context/appContext'

const getDynamicReportResponse = {
  headers: ['name', 'actuals-revenue'],
  company_comparison_data: {
    id: '1222',
    name: 'ABC Company',
    actuals_revenue: 29
  },
  peers_comparison_data: [
    {
      id: '1234',
      name: 'Sample Company',
      actuals_revenue: -98
    }
  ]
}

jest.mock('../../src/service/dynamicReport')

const mockService = (response) => {
  getDynamicReport.mockImplementation(() => {
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
    mockService({ ...getDynamicReportResponse, company_comparison_data: {} })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useDynamicReport({ fromUniverseOverview: true, selectedMetrics: ['actuals_revenue'] }), { wrapper })
    })

    expect(hookResponse.result.current.metrics).toEqual(['actuals_revenue'])
    expect(hookResponse.result.current.dynamicHeader).toEqual(getDynamicReportResponse.headers)
    expect(hookResponse.result.current.dynamicPeersComparison).toEqual(getDynamicReportResponse.peers_comparison_data)
    expect(hookResponse.result.current.calendarYear).toBeUndefined()
    expect(hookResponse.result.current.investYear).toBeUndefined()
  })

  it('metric report hook should return empty values if catch error', async () => {
    mockService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useDynamicReport({ fromUniverseOverview: true, selectedMetrics: ['actuals_revenue'] }), { wrapper })
    })

    expect(hookResponse.result.current.metrics).toEqual(['actuals_revenue'])
    expect(hookResponse.result.current.calendarYear).toBeUndefined()
    expect(hookResponse.result.current.investYear).toBeUndefined()
    expect(hookResponse.result.current.dynamicHeader).toEqual([])
    expect(hookResponse.result.current.dynamicCompanyComparison).toEqual({})
    expect(hookResponse.result.current.dynamicPeersComparison).toEqual([])
  })

  it('metric report hook should return empty values when params are empty', async () => {
    mockService({ ...getDynamicReportResponse, company_comparison_data: {} })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useDynamicReport({ fromUniverseOverview: true, selectedMetrics: ['None'], selectedCalendarYear: 'None', selectedInvestYear: 'None' }), { wrapper })
    })

    expect(hookResponse.result.current.metrics).toEqual(['None'])
    expect(hookResponse.result.current.calendarYear).toEqual('None')
    expect(hookResponse.result.current.investYear).toEqual('None')
    expect(hookResponse.result.current.dynamicHeader).toEqual([])
    expect(hookResponse.result.current.dynamicCompanyComparison).toEqual({})
    expect(hookResponse.result.current.dynamicPeersComparison).toEqual([])
  })

  it('metric report hook should return empty values when metrics are empty', async () => {
    mockService({ ...getDynamicReportResponse, company_comparison_data: {} })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useDynamicReport({ fromUniverseOverview: true, selectedMetrics: [], selectedCalendarYear: 2020, selectedInvestYear: 'None' }), { wrapper })
    })

    expect(hookResponse.result.current.metrics).toEqual([])
    expect(hookResponse.result.current.calendarYear).toEqual(2020)
    expect(hookResponse.result.current.investYear).toEqual('None')
    expect(hookResponse.result.current.dynamicHeader).toEqual([])
    expect(hookResponse.result.current.dynamicCompanyComparison).toEqual({})
    expect(hookResponse.result.current.dynamicPeersComparison).toEqual([])
  })

  it('metric report hook should return calendar when fromUniverseOverview is false', async () => {
    mockService(getDynamicReportResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useDynamicReport({ fromUniverseOverview: false, selectedMetrics: ['actuals_revenue'] }), { wrapper })
    })

    expect(hookResponse.result.current.metrics).toEqual(['actuals_revenue'])
    expect(hookResponse.result.current.dynamicHeader).toEqual(getDynamicReportResponse.headers)
    expect(hookResponse.result.current.dynamicPeersComparison).toEqual(getDynamicReportResponse.peers_comparison_data)
    expect(hookResponse.result.current.dynamicCompanyComparison).toEqual(getDynamicReportResponse.company_comparison_data)
    expect(hookResponse.result.current.calendarYear).toBeUndefined()
    expect(hookResponse.result.current.investYear).toBeUndefined()
  })

  it('metric report hook when fromUniverseOverview is false and there is no companyID', async () => {
    mockService(getDynamicReportResponse)
    const wrapper = ({ children }) => (
        <Context.Provider value={{ filterFields: { filters: [], companyID: null } }}>
          {children}
        </Context.Provider>
    )
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useDynamicReport({ fromUniverseOverview: false, selectedMetrics: ['actuals_revenue'] }), { wrapper })
    })

    expect(hookResponse.result.current.metrics).toEqual(['actuals_revenue'])
    expect(hookResponse.result.current.calendarYear).toBeUndefined()
    expect(hookResponse.result.current.investYear).toBeUndefined()
    expect(hookResponse.result.current.dynamicHeader).toEqual([])
    expect(hookResponse.result.current.dynamicCompanyComparison).toEqual({})
    expect(hookResponse.result.current.dynamicPeersComparison).toEqual([])
  })
})
