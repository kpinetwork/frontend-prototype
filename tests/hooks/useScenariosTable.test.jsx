import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getCompanyDetails } from '../../src/service/companyDetails'
import useScenariosTable from '../../src/hooks/useScenariosTable'
import { COMPANIESDETAILS } from '../data/companies'
import Context from '../../src/context/appContext'

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

describe('useScenariosTable', () => {
  it('scenarios table should return scenarios', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(0)
    expect(hookResponse.result.current.scenarios).toEqual(COMPANIESDETAILS.scenarios.metrics)
    expect(hookResponse.result.current.total).toEqual(COMPANIESDETAILS.scenarios.metrics.length)
  })

  it('scenarios table should catch errors', async () => {
    mockService(getCompanyDetails, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(0)
    expect(hookResponse.result.current.scenarios).toEqual([])
    expect(hookResponse.result.current.total).toEqual(0)
  })

  it('scenarios table should handleChangePage when first time in page', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 1)
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('scenarios table should handle change page when not first time in page', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 1)
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 0)
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('scenarios table should handle change rowsPerPage', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.handleChangeRowsPerPage({ target: { value: 25 } })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(25)
  })
})
