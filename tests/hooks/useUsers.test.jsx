import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import useUsers from './../../src/hooks/useUsers'
import { getUsers } from './../../src/service/users'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

jest.mock('./../../src/service/users')

const usersResponse = {
  users: [
    { username: '01', email: 'user@test.com', roles: [] }
  ],
  token: null
}

const defaultProps = 'demo_admin_group'

afterEach(() => {
  jest.clearAllMocks()
})

const mockService = (response) => {
  getUsers.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useUsers', () => {
  it('render hook', async () => {
    const response = JSON.parse(JSON.stringify(usersResponse))
    mockService(response)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUsers(defaultProps))
    })

    expect(hookResponse.result.current.users).toEqual(response.users)
    expect(hookResponse.result.current.isLoading).toBeFalsy()
  })

  it('should have empty user array when get user throw exception', async () => {
    mockService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUsers(defaultProps))
    })

    expect(hookResponse.result.current.users).toEqual([])
    expect(hookResponse.result.current.isLoading).toBeFalsy()
  })

  it('callNextUsers when change page for first time', async () => {
    const response = JSON.parse(JSON.stringify(usersResponse))
    mockService({ ...response, token: 'token' })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUsers(defaultProps))
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })

    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('callNextUsers when newPage was called before and is a previous page', async () => {
    const response = JSON.parse(JSON.stringify(usersResponse))
    mockService({ ...response, token: 'token' })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUsers(defaultProps))
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 0)
    })

    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('callNextUsers when newPage was called before and is a next page', async () => {
    const response = JSON.parse(JSON.stringify(usersResponse))
    mockService({ ...response, token: 'token' })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUsers(defaultProps))
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

  it('callNextUsers when page called is greater than the last one', async () => {
    const response = JSON.parse(JSON.stringify(usersResponse))
    mockService({ ...response })
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUsers(defaultProps))
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })

    expect(hookResponse.result.current.page).toEqual(0)
  })
})
