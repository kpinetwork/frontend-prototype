import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getCompanyTags } from '../../src/service/tagsByCompany'
import { getTags, updateTags } from '../../src/service/tags'
import useCompanyTags from '../../src/hooks/useCompanyTags'
import Context from '../../src/context/appContext'
import { UPDATE_TAGS_ERROR } from '../../src/utils/constants/tagsError'

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

  it('useCompanyTags when on save tags should call update tags service', async () => {
    mockService(updateTags, { updated: true })
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.onSave()
    })

    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(updateTags).toBeCalled()
  })

  it('useCompanyTags when on save tags fails should set error message', async () => {
    mockService(getCompanyTags, companyTagsResponse)
    mockService(updateTags, 'error')
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.onSave()
    })

    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(hookResponse.result.current.tagsByCompany).toEqual(companyTagsResponse)
    expect(hookResponse.result.current.error).toEqual(UPDATE_TAGS_ERROR)
    expect(updateTags).toBeCalled()
  })

  it('useCompanyTags when on cancel tags update should set tags by company to the initial data ', async () => {
    mockService(getCompanyTags, companyTagsResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.onCancel()
    })

    expect(hookResponse.result.current.tagsByCompany).toEqual(companyTagsResponse)
    expect(updateTags).not.toBeCalled()
  })

  it('useCompanyTags when closing snackbar should not set error message', async () => {
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.onCloseSnackbar()
    })

    expect(hookResponse.result.current.error).toBeNull()
  })

  it('useCompanyTags when handling change of tags should set tags by company', async () => {
    mockService(getCompanyTags, companyTagsResponse)
    const updatedTags = [{ id: '1233', name: 'Test Tag' }]
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompanyTags(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.handleTagsByCompany({}, updatedTags)
    })

    expect(hookResponse.result.current.tagsByCompany).toEqual(updatedTags)
  })
})
