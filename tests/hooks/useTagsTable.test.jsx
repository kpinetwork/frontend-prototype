import { renderHook, act } from '@testing-library/react-hooks'
import { deleteTags, addTags, getTags, updateTags } from '../../src/service/tags'
import useTagsTable from '../../src/hooks/useTagsTable'
import { ACTION_FAILED, DELETE_TAGS_ERROR, UPDATE_TAGS_ERROR } from '../../src/utils/constants/tagsError'

jest.mock('../../src/service/tags')

const tags = {
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
    }
  ]
}

const UPDATE_TAGS_RESPONSES = {
  updated_response: { updated: true },
  fail_response: { error: "Can't update tag" }
}

const DELETE_TAGS_RESPONSES = {
  deleted_response: { 'tags deleted': 1 },
  fail_response: { error: "Can't delete tags" }
}

const addTagsResponse = {
  tag: {
    id: '2',
    name: 'Tag Name',
    companies: ['1', '2']
  },
  added: true
}

const addTagsRequest = { name: 'Tag Name', companies: [{ id: '1', name: 'Company Name' }, { id: '2', name: 'Company Test' }] }

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useTagsTable', () => {
  it('useTagsTable hook success should return tags', async () => {
    mockService(getTags, tags)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    expect(hookResponse.result.current.tags).toEqual(tags.tags)
    expect(hookResponse.result.current.total).toEqual(tags.total)
  })

  it('useTagsTable hook failed should return empty values', async () => {
    mockService(getTags, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    expect(hookResponse.result.current.tags).toEqual([])
    expect(hookResponse.result.current.total).toEqual(0)
  })

  it('useTagsTable hook should handle change page when first time in page', async () => {
    mockService(getTags, tags)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage(1)
    })

    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('useTagsTable hook should handle change page when not first time in page', async () => {
    mockService(getTags, tags)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage(1)
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage(0)
    })

    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('useTagsTable hook should handle change page size', async () => {
    mockService(getTags, tags)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      hookResponse.result.current.handleChangePageSize(25)
    })

    expect(hookResponse.result.current.pageSize).toEqual(25)
  })

  it('useTagsTable hook should return added confirmation when call add service success', async () => {
    const tagsResponse = {
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
          companies: [{ id: '1', name: 'Company Name' }, { id: '2', name: 'Company Test' }]
        }
      ]
    }
    mockService(getTags, tagsResponse)
    mockService(addTags, addTagsResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      hookResponse.result.current.addTag(addTagsRequest)
    })

    expect(hookResponse.result.current.tags).toEqual(tagsResponse.tags)
  })
  it('useTagsTable hook should catch error and return negative confirmation when call add service fails', async () => {
    mockService(getTags, tags)
    mockService(addTags, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      hookResponse.result.current.addTag(addTagsRequest)
    })

    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(hookResponse.result.current.tags).toEqual(tags.tags)
  })

  it('useTagsTable hook should call get tags when update tags is successful', async () => {
    mockService(getTags, tags)
    mockService(updateTags, { updated: true })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })
    await act(async () => {
      hookResponse.result.current.updateTagsInfo({
        tags: { 1: { name: 'Tag name changed' } }
      })
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(getTags).toHaveBeenCalled()
  })

  it('useTagsTable hook should return error message when tag could not be updated', async () => {
    mockService(getTags, tags)
    mockService(updateTags, UPDATE_TAGS_RESPONSES.fail_response)
    let hookResponse
    let updateResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })
    await act(async () => {
      updateResponse = await hookResponse.result.current.updateTagsInfo({
        tags: { 1: { name: 'Tag name changed' } }
      })
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(updateResponse).toBe(UPDATE_TAGS_RESPONSES.fail_response)
    expect(updateTags).toHaveBeenCalled()
  })

  it('useTagsTable hook should return error message when update tags failed', async () => {
    mockService(getTags, tags)
    mockService(updateTags, 'error')
    let hookResponse
    let updateResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      updateResponse = await hookResponse.result.current.updateTagsInfo({
        tags: { 1: { name: 'Tag name changed' } }
      })
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(updateResponse).toBe(ACTION_FAILED)
  })

  it('useTagsTable hook should call get tags when delete tags is successful', async () => {
    mockService(getTags, tags)
    mockService(deleteTags, { deleted: true })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })
    await act(async () => {
      hookResponse.result.current.onDeleteTags(['1'])
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(deleteTags).toHaveBeenCalled()
  })

  it('useTagsTable hook should return error message when tag could not be deleted', async () => {
    mockService(getTags, tags)
    mockService(deleteTags, DELETE_TAGS_RESPONSES.fail_response)
    let hookResponse
    let deleteResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })
    await act(async () => {
      deleteResponse = await hookResponse.result.current.onDeleteTags(['1'])
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(deleteResponse).toBe(DELETE_TAGS_RESPONSES.fail_response)
    expect(deleteTags).toHaveBeenCalled()
  })

  it('useTagsTable hook should return error message when delete tags failed', async () => {
    mockService(getTags, tags)
    mockService(deleteTags, 'error')
    let hookResponse
    let deleteResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      deleteResponse = await hookResponse.result.current.onDeleteTags(['1'])
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(deleteResponse).toBe(ACTION_FAILED)
  })
  it('useTagsTable hook should return negative confirmation when call add service fails', async () => {
    const addResponse = {
      tag: {
        id: '2',
        name: 'Tag Name',
        companies: ['1', '2']
      },
      added: false
    }
    mockService(getTags, tags)
    mockService(addTags, addResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })

    await act(async () => {
      hookResponse.result.current.addTag(addTagsRequest)
    })

    expect(hookResponse.result.current.tags).toEqual(tags.tags)
  })
})
