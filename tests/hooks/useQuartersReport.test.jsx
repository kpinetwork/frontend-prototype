import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getQuartersReportData } from '../../src/service/quartersReport'
import { useQuartersReport } from '../../src/hooks/useQuartersReport'
import Context from '../../src/context/appContext'
import { headers, subHeaders, peersComparisonData, averages } from '../utils/QuartersReportMock'

const getQuartersReportResponse = {
  averages: averages,
  headers: headers,
  subHeaders: subHeaders,
  peers_comparison_data: peersComparisonData
}

jest.mock('../../src/service/quartersReport')

const mockService = (response) => {
  getQuartersReportData.mockImplementation(() => {
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

describe('useQuartersReport', () => {
  it('quarters report hook should return report', async () => {
    mockService({ ...getQuartersReportResponse, company_comparison_data: {} })
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useQuartersReport({ fromUniverseOverview: false, selectedTypeOfReport: 'year_to_year', selectedYears: [2021, 2022], selectedScenario: 'actuals', selectedPeriod: 'Q1', selectedMetric: 'revenue', yearSelectorOpened: false }), { wrapper })
    })

    expect(hookResponse.result.current.typeOfReport).toEqual('year_to_year')
    expect(hookResponse.result.current.metric).toEqual('revenue')
    expect(hookResponse.result.current.scenario).toEqual('actuals')
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
    expect(hookResponse.result.current.yearSelectorOpened).toBeFalsy()
  })

  it('quarters report hook should work when metric is null', async () => {
    mockService(getQuartersReportResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useQuartersReport({ fromUniverseOverview: true, selectedMetric: null }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toBeNull()
    expect(hookResponse.result.current.metricPeersComparison).toEqual([])
    expect(hookResponse.result.current.metricCompanyComparison).toEqual({})
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })

  it('quarters report hook should render when fromUniverseOverview is false ', async () => {
    mockService(getQuartersReportResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useQuartersReport({ fromUniverseOverview: false, selectedTypeOfReport: 'year_to_year', selectedYears: [2021, 2022], selectedScenario: 'actuals', selectedPeriod: 'Q1', selectedMetric: 'revenue' }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toEqual('revenue')
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })

  it('quarters report hook should return empty values when catch error ', async () => {
    mockService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useQuartersReport({ fromUniverseOverview: false, selectedTypeOfReport: 'year_to_year', selectedYears: [2021, 2022], selectedScenario: 'actuals', selectedPeriod: 'Q1', selectedMetric: 'revenue' }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toEqual('revenue')
    expect(hookResponse.result.current.metricCompanyComparison).toEqual({})
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })

  it('quarters report hook should works when companyID is null ', async () => {
    mockService('error')
    const wrapper = ({ children }) => (
      <Context.Provider value={{ filterFields: { filters: [], companyID: null } }}>
        {children}
      </Context.Provider>
    )
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useQuartersReport({ fromUniverseOverview: true, selectedTypeOfReport: 'year_to_year', selectedYears: [2021, 2022], selectedScenario: 'actuals', selectedPeriod: 'Q1', selectedMetric: 'revenue' }), { wrapper })
    })

    expect(hookResponse.result.current.metric).toEqual('revenue')
    expect(hookResponse.result.current.years).toEqual([2021, 2022])
    expect(hookResponse.result.current.metricCompanyComparison).toEqual({})
    expect(hookResponse.result.current.metricIsLoading).toBeFalsy()
  })
})
