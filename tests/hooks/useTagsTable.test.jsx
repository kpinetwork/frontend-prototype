import { getPublicCompanies } from '../../src/service/company'
import { renderHook, act } from '@testing-library/react-hooks'
import { SAMPLECOMPANIES } from '../data/companies'
import useTagsTable from '../../src/hooks/useTagsTable'

const getPublicCompaniesResponse = {
  total: 10,
  companies: SAMPLECOMPANIES
}

jest.mock('../../src/service/company')

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useTagsTable', () => {
  it('useTagsTable Hook should render', async () => {
    mockService(getPublicCompanies, getPublicCompaniesResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })
    expect(hookResponse.result.current.companies).toEqual(getPublicCompaniesResponse.companies)
  })
  it('should return empty list of companies when service throws exception', async () => {
    mockService(getPublicCompanies, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    expect(hookResponse.result.current.companies).toEqual([])
  })
})
