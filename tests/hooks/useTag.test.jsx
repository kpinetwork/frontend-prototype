import { renderHook, act } from '@testing-library/react-hooks'
import { getTags } from '../../src/service/tags'
import useTag from '../../src/hooks/useTag'

jest.mock('../../src/service/tags')
const tags = {
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
  it('useTags when service call is successful should return tags ', async () => {
    mockService(getTags, tags)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTag())
    })

    expect(hookResponse.result.current.tags).toEqual(tags.tags)
  })

  it('useTags when service call fails should return empty list of tags', async () => {
    mockService(getTags, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useTag())
    })

    expect(hookResponse.result.current.tags).toEqual([])
  })
})
