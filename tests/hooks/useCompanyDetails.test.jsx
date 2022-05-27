import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getCompanyInvestments, addCompanyInvestment } from '../../src/service/companyDetails'
import useCompanyDetails from '../../src/hooks/useCompanyDetails'
import Context from '../../src/context/appContext'

const serviceGetResponse = [
  {
    company_id: 'zec4b0212-m385-4828-814c-0e6b21d98f87',
    investment_date: '2019-02',
    divestment_date: null,
    round: 1,
    structure: 'Primary',
    ownership: 'Minority',
    investor_type: 'Private equity'
  }
]

const servicePostRequest = {
  invest: '2020-09',
  round: 1,
  structure: 'Primary',
  onwership: 'Majority',
  investor_type: 'Private equity',
  investor: 'Sample Investor'
}

const servicePostResponse = {
  company_id: 'zec4b0212-m385-4828-814c-0e6b21d98f87',
  investment: servicePostRequest,
  added: true
}

jest.mock('../../src/service/companyDetails')

const mockGetService = (response) => {
  getCompanyInvestments.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const mockPostService = (response) => {
  addCompanyInvestment.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const wrapper = ({ children }) => (
  <Context.Provider value={{ company: { selectedCompanyID: '123' } }}>
    {children}
  </Context.Provider>
)

describe('useCompanyDetails', () => {
  it('company panel hook should return investments', async () => {
    mockGetService(serviceGetResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyDetails(), { wrapper })
    })

    expect(hookResponse.result.current.investments).toEqual(serviceGetResponse)
  })

  it('company panel hook should return error when fetching investments', async () => {
    mockGetService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyDetails(), { wrapper })
    })

    expect(hookResponse.result.current.investments).toEqual([])
    expect(hookResponse.result.current.isLoading).toBeFalsy()
  })

  it('company panel hook should create investment', async () => {
    const investment = {
      company_id: 'zec4b0212-m385-4828-814c-0e6b21d98f87',
      investment_date: '2020-09',
      divestment_date: null,
      round: 2,
      structure: 'Primary',
      ownership: 'Majority',
      investor_type: 'Private equity'
    }
    mockGetService([...serviceGetResponse, investment])
    mockPostService(servicePostResponse)

    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyDetails(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.addInvestment(servicePostRequest)
    })

    expect(hookResponse.result.current.investments).toEqual([...serviceGetResponse, investment])
  })

  it('company panel hook addInvestment should catch error and return false', async () => {
    mockGetService(serviceGetResponse)
    mockPostService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyDetails(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.addInvestment(servicePostRequest)
    })

    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(hookResponse.result.current.investments).toEqual(serviceGetResponse)
  })
})
