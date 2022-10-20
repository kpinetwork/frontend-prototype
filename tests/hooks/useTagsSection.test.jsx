import { getPublicCompanies } from '../../src/service/company'
import { renderHook, act } from '@testing-library/react-hooks'
import { SAMPLECOMPANIES } from '../data/companies'
import useTagsSection from '../../src/hooks/useTagsSections'

const getPublicCompaniesResponse = {
  total: 10,
  companies: SAMPLECOMPANIES,
  companiesArray: SAMPLECOMPANIES
}

jest.mock('../../src/service/company')
jest.mock('../../src/service/tags')

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useTagsForm', () => {
  it('useTagsForm Hook should render', async () => {
    mockService(getPublicCompanies, getPublicCompaniesResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsSection())
    })

    expect(hookResponse.result.current.companies).toEqual({ 1: 'Sample company abc', 2: 'Sample company xyz' })
    expect(hookResponse.result.current.companiesArray).toEqual(getPublicCompaniesResponse.companiesArray)
  })
  it('should return empty list of companies when service throws exception', async () => {
    mockService(getPublicCompanies, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsSection())
    })

    expect(hookResponse.result.current.companies).toEqual({})
    expect(hookResponse.result.current.companiesArray).toEqual([])
  })
})
