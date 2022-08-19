import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import usePublicCompanies from '../../src/hooks/usePublicCompanies'
import { getPublicCompanies } from '../../src/service/company'
import { SAMPLECOMPANIES } from '../data/companies'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})
jest.mock('../../src/service/company')

const companiesResponse = {
  companies: [SAMPLECOMPANIES[0]],
  total: 1
}

const mockService = (response) => {
  getPublicCompanies.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useCompaniesPanelTable', () => {
  it('render hook', async () => {
    mockService(companiesResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => usePublicCompanies())
    })

    expect(hookResponse.result.current.companies).toEqual(companiesResponse.companies)
    expect(hookResponse.result.current.total).toEqual(companiesResponse.total)
    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('company panel hook should have empty values when service throws exception', async () => {
    mockService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => usePublicCompanies())
    })

    expect(hookResponse.result.current.total).toEqual(0)
    expect(hookResponse.result.current.companies).toEqual([])
  })

  it('callNextCompanies when change page for the first time', async () => {
    mockService(companiesResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => usePublicCompanies())
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })
    const page = hookResponse.result.current.page
    const rowsPerPage = hookResponse.result.current.rowsPerPage

    expect(hookResponse.result.current.offset).toEqual(page * rowsPerPage)
    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('callNextCompanies when newPage was called before and is a previous page', async () => {
    mockService(companiesResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => usePublicCompanies())
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
      hookResponse.result.current.handleChangePage('', 0)
    })
    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('callNextCompanies when newPage was called before and is a next page', async () => {
    mockService(companiesResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => usePublicCompanies())
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 0)
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })

    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('handleChangeRowsPerPage should change rows per page', async () => {
    mockService(companiesResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => usePublicCompanies())
    })
    await act(async () => {
      hookResponse.result.current.handleChangeRowsPerPage({
        target: {
          value: 25
        }
      })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(25)
  })
})
