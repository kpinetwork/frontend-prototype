import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getInvestmentDateReport } from '../../src/service/investmentDateReport'
import { useInvestmentDateReport } from '../../src/hooks/useInvestmentDateReport'
import Context from '../../src/context/appContext'

const getInvestDateReportResponse = {
  headers: ['id', 'name', 'metric name', 'Investment - 1', 'Year of investment', 'Investment + 1'],
  company_comparison_data: {
    id: '1222',
    name: 'ABC Company',
    metrics: [
      {
        metric_name: 'growht',
        2019: 15,
        2020: 17,
        2021: 12
      },
      {
        metric_name: 'ebitda_margin',
        2019: 11,
        2020: 12,
        2021: 10
      }
    ]
  },
  peers_comparison_data: [
    {
      id: '1234',
      name: 'Sample Company',
      metrics: [
        {
          metric_name: 'growht',
          2019: 14,
          2020: 12,
          2021: 15
        },
        {
          metric_name: 'ebitda_margin',
          2019: 14,
          2020: 12,
          2021: 15
        }
      ]
    }
  ]
}

const defaultProps = {
  fromUniverseOverview: true,
  selectedMetric: 'growth',
  secondSelectedMetric: 'ebitda_margin'
}

jest.mock('../../src/service/investmentDateReport')

const mockService = (response) => {
  getInvestmentDateReport.mockImplementation(() => {
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

describe('useInvestmentDateReport', () => {
  it('invest date report hook should return report', async () => {
    mockService({ ...getInvestDateReportResponse, company_comparison_data: {} })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useInvestmentDateReport(defaultProps), { wrapper })
    })

    expect(hookResponse.result.current.firstMetric).toEqual('growth')
    expect(hookResponse.result.current.secondMetric).toEqual('ebitda_margin')
    expect(hookResponse.result.current.investHeaders).toEqual(getInvestDateReportResponse.headers)
    expect(hookResponse.result.current.investPeersComparison).toEqual(getInvestDateReportResponse.peers_comparison_data)
  })

  it('invest date report hook should return empty values if catch error', async () => {
    mockService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useInvestmentDateReport(defaultProps), { wrapper })
    })

    expect(hookResponse.result.current.firstMetric).toEqual('growth')
    expect(hookResponse.result.current.secondMetric).toEqual('ebitda_margin')
    expect(hookResponse.result.current.investHeaders).toEqual([])
    expect(hookResponse.result.current.investCompanyComparison).toEqual({})
    expect(hookResponse.result.current.investPeersComparison).toEqual([])
  })

  it('invest report hook should return empty values when first metric is invalid', async () => {
    mockService({ ...getInvestDateReportResponse, company_comparison_data: {} })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useInvestmentDateReport({
        ...defaultProps,
        selectedMetric: null
      }), { wrapper })
    })

    expect(hookResponse.result.current.firstMetric).toEqual(null)
    expect(hookResponse.result.current.secondMetric).toEqual('ebitda_margin')
    expect(hookResponse.result.current.investHeaders).toEqual([])
    expect(hookResponse.result.current.investCompanyComparison).toEqual({})
    expect(hookResponse.result.current.investPeersComparison).toEqual([])
  })

  it('invest date report hook should return data when comes from UniverseOverview', async () => {
    mockService(getInvestDateReportResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useInvestmentDateReport({
        ...defaultProps,
        fromUniverseOverview: false
      }), { wrapper })
    })

    expect(hookResponse.result.current.firstMetric).toEqual('growth')
    expect(hookResponse.result.current.secondMetric).toEqual('ebitda_margin')
    expect(hookResponse.result.current.investHeaders).toEqual(getInvestDateReportResponse.headers)
    expect(hookResponse.result.current.investPeersComparison).toEqual(getInvestDateReportResponse.peers_comparison_data)
    expect(hookResponse.result.current.investCompanyComparison).toEqual(getInvestDateReportResponse.company_comparison_data)
  })

  it('invest date report hook should return empty values when comes from company report without id', async () => {
    mockService(getInvestDateReportResponse)
    let hookResponse
    const wrapper = ({ children }) => (
        <Context.Provider value={{ filterFields: { filters: [], companyID: null } }}>
          {children}
        </Context.Provider>
    )

    await act(async () => {
      hookResponse = renderHook(() => useInvestmentDateReport({
        ...defaultProps,
        fromUniverseOverview: false
      }), { wrapper })
    })

    expect(hookResponse.result.current.firstMetric).toEqual('growth')
    expect(hookResponse.result.current.secondMetric).toEqual('ebitda_margin')
    expect(hookResponse.result.current.investHeaders).toEqual([])
    expect(hookResponse.result.current.investPeersComparison).toEqual([])
    expect(hookResponse.result.current.investCompanyComparison).toEqual({})
  })
})
