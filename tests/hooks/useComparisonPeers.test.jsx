import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getComparisonPeersFromQueryParams, downloadComparisonPeers } from '../../src/service/comparisonPeers'
import { useComparisonPeers } from '../../src/hooks/useComparisionPeers'
import Context from '../../src/context/appContext'

const getComparisonPeerResponse = {
  rule_of_40: [
    {
      id: '123',
      name: 'Sample Company',
      revenue: 70,
      ebitda_margin: 90,
      revenue_growth_rate: -7
    }
  ]
}

jest.mock('../../src/service/comparisonPeers')

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const wrapper = ({ children }) => (
    <Context.Provider value={{ filterFields: { filters: {}, companyID: '123', year: '2021' } }}>
        {children}
    </Context.Provider>
)

describe('useComparisonPeers', () => {
  it('useInvestmentReport Hook render with empty values when api call fails', async () => {
    mockService(getComparisonPeersFromQueryParams, 'error')
    mockService(downloadComparisonPeers, '')

    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: false }), { wrapper })
    })
    await act(async () => {
      useInvestmentReportResult.result.current.downloadComparisonCsv()
    })

    expect(useInvestmentReportResult.result.current.ruleOf40).toEqual([])
    expect(useInvestmentReportResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useInvestmentReport Hook render when comes from company report', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    mockService(downloadComparisonPeers, '')

    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: false }), { wrapper })
    })
    await act(async () => {
      useInvestmentReportResult.result.current.downloadComparisonCsv()
    })

    expect(useInvestmentReportResult.result.current.ruleOf40).toEqual(getComparisonPeerResponse.rule_of_40)
    expect(useInvestmentReportResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useInvestmentReport Hook render when comes from UniverseOverview', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    mockService(downloadComparisonPeers, '')

    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: true }), { wrapper })
    })
    await act(async () => {
      useInvestmentReportResult.result.current.downloadComparisonCsv()
    })

    expect(useInvestmentReportResult.result.current.ruleOf40).toEqual(getComparisonPeerResponse.rule_of_40)
    expect(useInvestmentReportResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useInvestmentReport Hook render when downloadComparisonPeers catch error ', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    mockService(downloadComparisonPeers, 'error')

    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: true }), { wrapper })
    })
    await act(async () => {
      useInvestmentReportResult.result.current.downloadComparisonCsv()
    })

    expect(useInvestmentReportResult.result.current.ruleOf40).toEqual(getComparisonPeerResponse.rule_of_40)
    expect(useInvestmentReportResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useInvestmentReport Hook render when companyID is null ', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    const wrapper = ({ children }) => (
      <Context.Provider value={{ filterFields: { filters: {}, companyID: null, year: '2021' } }}>
          {children}
      </Context.Provider>
    )

    let useInvestmentReportResult
    await act(async () => {
      useInvestmentReportResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: false }), { wrapper })
    })

    expect(useInvestmentReportResult.result.current.ruleOf40).toEqual([])
    expect(useInvestmentReportResult.result.current.peersIsLoading).toBeFalsy()
  })
})
