import { getPublicCompanies } from '../../src/service/company'
import { addTags } from '../../src/service/tags'
import { renderHook, act } from '@testing-library/react-hooks'
import { SAMPLECOMPANIES } from '../data/companies'
import useTagsSection from '../../src/hooks/useTagsSections'

const getPublicCompaniesResponse = {
  total: 10,
  companies: SAMPLECOMPANIES,
  companiesArray: SAMPLECOMPANIES
}

const addTagsResponse = {
  tag: {
    id: '1234',
    name: 'Sample tag',
    companies: ['id1', 'id2']
  },
  added: true
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
  it('should return added confirmation when add service success', async () => {
    mockService(getPublicCompanies, getPublicCompaniesResponse)
    mockService(addTags, addTagsResponse)
    let hookResponse
    let addTagsMethod

    await act(async () => {
      hookResponse = renderHook(() => useTagsSection())
    })

    await act(async () => {
      addTagsMethod = hookResponse.result.current.addTag('Sample tag', ['id1', 'id2'])
    })

    expect(addTagsMethod).toBeTruthy()
    expect(getPublicCompanies).toBeCalled()
  })
  it('should throws exception when add service fails', async () => {
    mockService(getPublicCompanies, getPublicCompaniesResponse)
    mockService(addTags, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsSection())
    })
    await act(async () => {
      hookResponse.result.current.addTag('Sample tag', ['id1', 'id2'])
    })

    expect(hookResponse.result.current.loading).toBeFalsy()
  })
})
