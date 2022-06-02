import React from 'react'
import { useInvestmentYearReport } from '../../src/hooks/useInvestmentYearReport'
import { getInvestmentReport } from '../../src/service/investmentByYearReport'
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

const getInvestmentResponse = {
  company_comparison_data: companies[0],
  peers_comparison_data: companies
}

jest.mock('../../src/service/investmentByYearReport')

const mockInvestmentService = (response) => {
  getInvestmentReport.mockImplementation(() => {
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

describe('<useInvestmentReport/>', () => {
  it('useInvestmentReport Hook render', async () => {
    mockInvestmentService(getInvestmentResponse)
    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useInvestmentYearReport({ fromUniverseOverview: false, selectedYear: null }), { wrapper })
    })

    expect(useInvestmentReportResult.result.current.investYear).toBe(null)
  })

  it('getInvestmentYearReport when fromUniverseOverview is true', async () => {
    mockInvestmentService({ ...getInvestmentResponse, company_comparison_data: {} })
    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useInvestmentYearReport({ fromUniverseOverview: true, selectedYear: 'Two years before investment' }), { wrapper })
    })

    expect(useInvestmentReportResult.result.current.investmentCompanyComparison).toEqual({})
  })

  it('getInvestmentYearReport when fromUniverseOverview is false', async () => {
    mockInvestmentService(getInvestmentResponse)
    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useInvestmentYearReport({ fromUniverseOverview: false, selectedYear: 'Two years before investment' }), { wrapper })
    })

    expect(useInvestmentReportResult.result.current.investmentCompanyComparison).toEqual(getInvestmentResponse.company_comparison_data)
    expect(useInvestmentReportResult.result.current.investYear).toEqual('Two years before investment')
  })

  it('getInvestmentYearReport should throw error', async () => {
    mockInvestmentService('error')
    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useInvestmentYearReport({ fromUniverseOverview: false, selectedYear: 'Two years before investment' }), { wrapper })
    })

    expect(useInvestmentReportResult.result.current.investmentCompanyComparison).toEqual({})
    expect(useInvestmentReportResult.result.current.investmentPeersComparison).toEqual([])
  })
})
