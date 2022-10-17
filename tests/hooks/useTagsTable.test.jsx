import { renderHook, act } from '@testing-library/react-hooks'
import { getTags } from '../../src/service/tags'
import useTagsTable from '../../src/hooks/useTagsTable'

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
})
