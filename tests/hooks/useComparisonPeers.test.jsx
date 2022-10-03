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
  it('useComparisonPeers Hook render with empty values when api call fails', async () => {
    mockService(getComparisonPeersFromQueryParams, 'error')
    mockService(downloadComparisonPeers, '')

    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: false }), { wrapper })
    })
    await act(async () => {
      useComparisonPeersResult.result.current.downloadComparisonCsv()
    })

    expect(useComparisonPeersResult.result.current.ruleOf40).toEqual([])
    expect(useComparisonPeersResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useComparisonPeers Hook render when comes from company report', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    mockService(downloadComparisonPeers, '')

    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: false }), { wrapper })
    })
    await act(async () => {
      useComparisonPeersResult.result.current.downloadComparisonCsv()
    })

    expect(useComparisonPeersResult.result.current.ruleOf40).toEqual(getComparisonPeerResponse.rule_of_40)
    expect(useComparisonPeersResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useComparisonPeers Hook render when comes from UniverseOverview', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    mockService(downloadComparisonPeers, '')

    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: true }), { wrapper })
    })
    await act(async () => {
      useComparisonPeersResult.result.current.downloadComparisonCsv()
    })

    expect(useComparisonPeersResult.result.current.ruleOf40).toEqual(getComparisonPeerResponse.rule_of_40)
    expect(useComparisonPeersResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useComparisonPeers Hook render when downloadComparisonPeers catch error ', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    mockService(downloadComparisonPeers, 'error')

    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: true }), { wrapper })
    })
    await act(async () => {
      useComparisonPeersResult.result.current.downloadComparisonCsv()
    })

    expect(useComparisonPeersResult.result.current.ruleOf40).toEqual(getComparisonPeerResponse.rule_of_40)
    expect(useComparisonPeersResult.result.current.peersIsLoading).toBeFalsy()
  })

  it('useComparisonPeers Hook render when there is no companyID ', async () => {
    mockService(getComparisonPeersFromQueryParams, getComparisonPeerResponse)
    const wrapper = ({ children }) => (
      <Context.Provider value={{ filterFields: { filters: {}, companyID: null, year: '2021' } }}>
          {children}
      </Context.Provider>
    )

    let useComparisonPeersResult
    await act(async () => {
      useComparisonPeersResult = renderHook(() => useComparisonPeers({ fromUniverseOverview: false }), { wrapper })
    })

    expect(useComparisonPeersResult.result.current.ruleOf40).toEqual([])
    expect(useComparisonPeersResult.result.current.peersIsLoading).toBeFalsy()
  })
})
