import { renderHook, act } from '@testing-library/react-hooks'
import { getTags, updateTags } from '../../src/service/tags'
import useTagsTable from '../../src/hooks/useTagsTable'
import { ACTION_FAILED, UPDATE_ERROR } from '../../src/utils/constants/tagsError'

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

  it('useTagsTable hook should call get tags when update tags is successful', async () => {
    mockService(getTags, tags)
    mockService(updateTags, { updated: true })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })
    await act(async () => {
      hookResponse.result.current.updateTagsInfo({})
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(getTags).toHaveBeenCalled()
  })

  it('useTagsTable hook should return error message when tag could not be updated', async () => {
    mockService(getTags, tags)
    mockService(updateTags, { updated: false })
    let hookResponse
    let updateResponse

    await act(async () => {
      hookResponse = renderHook(() => useTagsTable())
    })
    await act(async () => {
      updateResponse = await hookResponse.result.current.updateTagsInfo({})
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(updateResponse).toBe(UPDATE_ERROR)
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
      updateResponse = await hookResponse.result.current.updateTagsInfo({})
    })

    expect(hookResponse.result.current.allowActions).toBeTruthy()
    expect(updateResponse).toBe(ACTION_FAILED)
  })
})
