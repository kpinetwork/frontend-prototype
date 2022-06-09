import React from 'react'
import { useCompanyReport } from '../../src/hooks/useCompanyReport'
import { getPublicCompanies } from '../../src/service/company'
import { getCompanyReportFromQueryParams } from '../../src/service/companyReport'
import { renderHook, act } from '@testing-library/react-hooks'
import Context from '../../src/context/appContext'
import { SAMPLECOMPANIES } from '../data/companies'

const getCompanyReportResponse = {
  description: {
    id: '1',
    name: 'Sample company abc',
    sector: 'Application Software',
    vertical: 'Media',
    inves_profile_name: 'Private equity',
    size_cohort: '$100 million+',
    margin_group: 'High growth (30%-<50%)'
  },
  financial_profile: {
    annual_ebitda: -3,
    annual_revenue: 10,
    annual_rule_of_40: 15,
    forward_ebitda_growth: 4,
    forward_revenue_growth: 'NA',
    forward_rule_of_40: 'NA'
  }
}

const getPublicCompaniesResponse = {
  total: 10,
  companies: SAMPLECOMPANIES
}

jest.mock('../../src/service/companyReport')
jest.mock('../../src/service/company')

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const wrapper = ({ children }) => (
    <Context.Provider value={{
      filterFields: {
        filters: {},
        setFilters: jest.fn(),
        year: '2022',
        setYear: jest.fn(),
        companyID: '123',
        setCompanyID: jest.fn()
      }
    }}>
        {children}
    </Context.Provider>
)

describe('useCompanyReport', () => {
  it('useCompanyReport Hook should render', async () => {
    mockService(getPublicCompanies, getPublicCompaniesResponse)
    mockService(getCompanyReportFromQueryParams, getCompanyReportResponse)
    let useCompanyReportResult
    await act(async () => {
      useCompanyReportResult = renderHook(() => useCompanyReport(), { wrapper })
    })

    expect(useCompanyReportResult.result.current.description).toEqual(getCompanyReportResponse.description)
    expect(useCompanyReportResult.result.current.publicCompanies).toEqual(getPublicCompaniesResponse.companies)
    expect(useCompanyReportResult.result.current.financialProfile).toEqual(getCompanyReportResponse.financial_profile)
    expect(useCompanyReportResult.result.current.isLoading).toBeFalsy()
    expect(useCompanyReportResult.result.current.companyID).toEqual('123')
    expect(useCompanyReportResult.result.current.year).toEqual('2022')
  })

  it('useCompanyReport Hook should catch getPublicCompanies error', async () => {
    mockService(getPublicCompanies, 'error')
    let useCompanyReportResult
    await act(async () => {
      useCompanyReportResult = renderHook(() => useCompanyReport(), { wrapper })
    })

    expect(useCompanyReportResult.result.current.description).toEqual(getCompanyReportResponse.description)
    expect(useCompanyReportResult.result.current.publicCompanies).toEqual([])
    expect(useCompanyReportResult.result.current.financialProfile).toEqual(getCompanyReportResponse.financial_profile)
    expect(useCompanyReportResult.result.current.isLoading).toBeFalsy()
    expect(useCompanyReportResult.result.current.companyID).toEqual('123')
    expect(useCompanyReportResult.result.current.year).toEqual('2022')
  })

  it('useCompanyReport should no get report if not companyID', async () => {
    const wrapper = ({ children }) => (
        <Context.Provider value={{
          filterFields: {
            filters: { f: 'f' },
            setFilters: jest.fn(),
            year: '2022',
            setYear: jest.fn(),
            companyID: null,
            setCompanyID: jest.fn()
          }
        }}>
            {children}
        </Context.Provider>
    )
    mockService(getPublicCompanies, getPublicCompaniesResponse)
    mockService(getCompanyReportFromQueryParams, getCompanyReportResponse)
    let useCompanyReportResult
    await act(async () => {
      useCompanyReportResult = renderHook(() => useCompanyReport(), { wrapper })
    })

    expect(useCompanyReportResult.result.current.financialProfile).toBeNull()
    expect(useCompanyReportResult.result.current.companyID).toBeNull()
  })
})
