import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getCompanyTags } from '../../src/service/tagsByCompany'
import { getTags } from '../../src/service/tags'
import useCompanyTags from '../../src/hooks/useCompanyTags'
import Context from '../../src/context/appContext'

jest.mock('../../src/service/tagsByCompany')
jest.mock('../../src/service/tags')

const tagsOptions = {
  total: 2,
  tags: [
    {
      id: '1',
      name: 'Tag',
      companies: [
        {
          id: '1',
          name: 'Tag'
        }
      ]
    },
    {

      id: '2',
      name: 'Tag Name',
      companies: [
        {
          id: '1',
          name: 'Company Name'
        }
      ]
    }
  ]
}

const companyTagsResponse = [
  {
    id: '1234',
    name: 'Sample tag'
  },
  {
    id: '1234',
    name: 'Sample tag'
  }
]

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

describe('useCompanyTags', () => {
  it('useCompanyTags hook when get list of tags is successful should return tags options', async () => {
    mockService(getTags, tagsOptions)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    expect(hookResponse.result.current.listOfTags).toEqual(tagsOptions.tags)
  })

  it('useCompanyTags hook when get list of tags fails should return empty values', async () => {
    mockService(getTags, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    expect(hookResponse.result.current.listOfTags).toEqual([])
  })

  it('useCompanyTags hook when company tags is successful should return company tags', async () => {
    mockService(getTags, tagsOptions)
    mockService(getCompanyTags, companyTagsResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    expect(hookResponse.result.current.tagsByCompany).toEqual(companyTagsResponse)
  })

  it('useCompanyTags hook when company tags fails should return empty values', async () => {
    mockService(getTags, tagsOptions)
    mockService(getCompanyTags, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    expect(hookResponse.result.current.tagsByCompany).toEqual([])
  })
})
