import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import useUserDetails from '../../src/hooks/useUserDetails'
import { getUserDetails, getRoles } from '../../src/service/users'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

jest.mock('./../../src/service/users')

const userDetailsResponse = {
  user: {
    id: 'user-id',
    email: 'user@test.com',
    status: 'Active',
    created_at: '2020-12-25 07:23:21',
    roles: [
      'customer'
    ]
  },
  permissions: [
    {
      id: 'id-1',
      permission: 'read',
      name: 'Company A'
    },
    {
      id: 'id-2',
      permission: 'read',
      name: 'Company B'
    }
  ]
}

const roles = [
  {
    name: 'admin',
    description: 'Administrator group'
  },
  {
    name: 'customer',
    description: 'Customer group'
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

describe('useCompanyPermissions', () => {
  it('render hook correctly with data', async () => {
    const response = JSON.parse(JSON.stringify(userDetailsResponse))
    mockService(getUserDetails, response)
    mockService(getRoles, roles)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUserDetails({ email: userDetailsResponse.user.email }))
    })

    expect(hookResponse.result.current.roles).toEqual(roles)
    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(hookResponse.result.current.user).toEqual(userDetailsResponse.user)
    expect(hookResponse.result.current.permissions).toEqual(userDetailsResponse.permissions)
  })

  it('should have empty data when getUserDetails throw exception', async () => {
    mockService(getUserDetails, 'error')
    mockService(getRoles, roles)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUserDetails({ email: userDetailsResponse.user.email }))
    })

    expect(hookResponse.result.current.user).toEqual({})
    expect(hookResponse.result.current.roles).toEqual([])
    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(hookResponse.result.current.permissions).toEqual([])
  })
})
