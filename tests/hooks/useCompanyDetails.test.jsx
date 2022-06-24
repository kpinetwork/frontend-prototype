import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getCompanyDetails, getCompanyInvestments, addCompanyInvestment } from '../../src/service/companyDetails'
import useCompanyDetails from '../../src/hooks/useCompanyDetails'
import { COMPANIESDETAILS } from '../data/companies'
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

const mockService = (service, response) => {
  service.mockImplementation(() => {
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
  it('company panel hook should return company details', async () => {
    const expectedResponse = {
      id: COMPANIESDETAILS.id,
      name: COMPANIESDETAILS.name,
      sector: COMPANIESDETAILS.sector,
      vertical: COMPANIESDETAILS.vertical,
      investorProfile: COMPANIESDETAILS.inves_profile_name
    }
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyDetails(), { wrapper })
    })

    expect(hookResponse.result.current.company).toEqual(expectedResponse)
  })

  it('company panel hook getCompanyDetails should return error', async () => {
    mockService(getCompanyDetails, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyDetails(), { wrapper })
    })

    expect(hookResponse.result.current.company).toEqual({})
  })

  it('company panel hook should return investments', async () => {
    mockService(getCompanyInvestments, serviceGetResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyDetails(), { wrapper })
    })

    expect(hookResponse.result.current.investments).toEqual(serviceGetResponse)
  })

  it('company panel hook should return error when fetching investments', async () => {
    mockService(getCompanyInvestments, 'error')
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
    mockService(getCompanyInvestments, [...serviceGetResponse, investment])
    mockService(addCompanyInvestment, servicePostResponse)

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
    mockService(getCompanyInvestments, serviceGetResponse)
    mockService(addCompanyInvestment, 'error')
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
