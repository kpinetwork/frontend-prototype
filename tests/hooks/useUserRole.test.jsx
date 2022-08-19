import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import useUserRole from '../../src/hooks/useUserRole'
import { changeUserRole } from '../../src/service/users'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

jest.mock('./../../src/service/users')

const userRole = {
  new_role: 'admin',
  current_role: 'customer'
}

const mockService = (response) => {
  changeUserRole.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useUserRole', () => {
  it('render hook', async () => {
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUserRole())
    })

    expect(hookResponse.result.current.isUpdatingRole).toBeFalsy()
  })

  it('call changeUserRole should update default values', async () => {
    const response = { modified: true }
    mockService(response)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUserRole())
    })
    await act(async () => {
      hookResponse.result.current.changeUserRoles(userRole, 'user@test.com')
    })

    expect(hookResponse.result.current.isUpdatingRole).toBeFalsy()
    expect(hookResponse.result.current.changed).toBeTruthy()
  })

  it('call changeUserRole should not update default values when service throws exception', async () => {
    mockService('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useUserRole())
    })
    await act(async () => {
      hookResponse.result.current.changeUserRoles(userRole, 'user@test.com')
    })

    expect(hookResponse.result.current.isUpdatingRole).toBeFalsy()
    expect(hookResponse.result.current.changed).toBeFalsy()
  })
})
