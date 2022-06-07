import React from 'react'
import { useCalendarReport } from '../../src/hooks/useCalendarReport'
import { downloadComparisonPeers, getComparisonPeersFromQueryParams } from '../../src/service/comparisonPeers'
import { renderHook, act } from '@testing-library/react-hooks'
import Context from '../../src/context/appContext'

const companies = [
  {
    id: '1',
    name: 'Sample company abc',
    sector: 'Application Software',
    vertical: 'Media',
    inves_profile_name: 'Private equity',
    is_public: false
  },
  {
    id: '2',
    name: 'Sample company xyz',
    sector: 'Semiconductors',
    vertical: 'Logistics',
    inves_profile_name: 'Family office',
    is_public: false
  }
]

const getCalendarResponse = {
  company_comparison_data: companies[0],
  peers_comparison_data: companies
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

  it('return when year is null', async () => {
    let useCalendarReportResult
    await act(async () => {
      useCalendarReportResult = renderHook(() => useCalendarReport({ fromUniverseOverview: false, selectedYear: null }), { wrapper })
    })

    expect(useCalendarReportResult.result.current.year).toBe(null)
  })

  it('getCalendarReport should be called when fromUniverseOverview is true', async () => {
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

  it('downloadComparisoncsv change options when fromUniverseOverview is true', async () => {
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
