import React from 'react'
import { useCalendarReport } from '../../src/hooks/useCalendarReport'
import { downloadComparisonPeers, getComparisonPeersFromQueryParams } from '../../src/service/comparisonPeers'
import { renderHook, act } from '@testing-library/react-hooks'
import Context from '../../src/context/appContext'
import { SAMPLECOMPANIES } from '../data/companies'

const getCalendarResponse = {
  company_comparison_data: SAMPLECOMPANIES[0],
  peers_comparison_data: SAMPLECOMPANIES
}

jest.mock('../../src/service/comparisonPeers')

const mockComparisonService = (response) => {
  getComparisonPeersFromQueryParams.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const mockDownloadService = (response) => {
  downloadComparisonPeers.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const wrapper = ({ children }) => (
    <Context.Provider value={{ filterFields: { filters: {}, companyID: '123' } }}>
        {children}
    </Context.Provider>
)
describe('<useCalendarReport/>', () => {
  it('useCalendarReport Hook render', async () => {
    mockComparisonService(getCalendarResponse)
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: '2021' }), { wrapper })
    })

    expect(useCalendarReportResult.result.current.year).toBe('2021')
  })

  it('useCalendarReport Hook render with empty values when api call fails', async () => {
    mockComparisonService('error')
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: '2021' }), { wrapper })
    })

    expect(useCalendarReportResult.result.current.companyComparison).toEqual({})
    expect(useCalendarReportResult.result.current.peersComparison).toEqual([])
    expect(useCalendarReportResult.result.current.calendarPeersLoading).toBeFalsy()
  })

  it('return when year is null', async () => {
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: null }), { wrapper })
    })

    expect(useCalendarReportResult.result.current.year).toBe(null)
  })

  it('getCalendarReport should be called when comes from UniverseOverview', async () => {
    mockComparisonService({ ...getCalendarResponse, company_comparison_data: {} })
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: true, selectedYear: '2021' }), { wrapper })
    })

    expect(useCalendarReportResult.result.current.companyComparison).toEqual({})
  })

  it('getCalendarReport should be called when isLoading change', async () => {
    mockComparisonService(getCalendarResponse)
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: '2021' }), { wrapper })
    })

    expect(useCalendarReportResult.result.current.companyComparison).toEqual(getCalendarResponse.company_comparison_data)
    expect(useCalendarReportResult.result.current.year).toBe('2021')
  })

  it('hook should have empty values when there is no company id and comes from company report', async () => {
    mockComparisonService(getCalendarResponse)
    const wrapper = ({ children }) => (
      <Context.Provider value={{ filterFields: { filters: {}, companyID: null } }}>
          {children}
      </Context.Provider>
    )
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: '2021' }), { wrapper })
    })

    expect(useCalendarReportResult.result.current.companyComparison).toEqual({})
    expect(useCalendarReportResult.result.current.year).toBe('2021')
  })

  it('downloadComparisoncsv is called when fromUniverseOverview is false', async () => {
    mockDownloadService('')
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: '2021' }), { wrapper })
    })
    await act(async () => {
      useCalendarReportResult.result.current.downloadComparisonCsv('2021')
    })

    expect(downloadComparisonPeers).toHaveBeenCalled()
  })

  it('downloadComparisoncsv change options when comes from UniverseOverview', async () => {
    mockDownloadService('')
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: true, selectedYear: '2021' }), { wrapper })
    })
    await act(async () => {
      useCalendarReportResult.result.current.downloadComparisonCsv('2021')
    })

    expect(downloadComparisonPeers).toHaveBeenCalled()
  })

  it('useCalendarReport hook should return null when error', async () => {
    mockDownloadService('error')
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: '2021' }), { wrapper })
    })
    await act(async () => {
      useCalendarReportResult.result.current.downloadComparisonCsv('2021')
    })

    expect(downloadComparisonPeers).toHaveBeenCalled()
  })
})
