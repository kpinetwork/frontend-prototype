import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import useCompanyPermissions from '../../src/hooks/useCompanyPermissions'
import { assignPermissions, getPermissions } from '../../src/service/users'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

jest.mock('./../../src/service/users')

const username = 'user@test.com'

const permissionsResponse = [
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

const assignPermissionsData = {
  companies: {
    'id-1': false
  }
}

const assignPermissionsResponse = {
  modified: {
    'id-1': true
  }
}

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
    const response = JSON.parse(JSON.stringify(permissionsResponse))
    mockService(getPermissions, response)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyPermissions(username))
    })

    expect(hookResponse.result.current.permissions).toEqual(response)
    expect(hookResponse.result.current.isPermissionsLoading).toBeFalsy()
  })

  it('should have empty permissions array when get permissions throw exception', async () => {
    mockService(getPermissions, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyPermissions(username))
    })

    expect(hookResponse.result.current.permissions).toEqual([])
    expect(hookResponse.result.current.isLoading).toBeFalsy()
  })

  it('call assignPermissions should change default values', async () => {
    mockService(assignPermissions, assignPermissionsResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyPermissions(username))
    })
    await act(async () => {
      hookResponse.result.current.assignCompanyPermissions(assignPermissionsData.companies, username)
    })

    expect(hookResponse.result.current.successChange).toBeTruthy()
  })

  it('call assignPermissions should not change default values when service throws exception', async () => {
    mockService(assignPermissions, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyPermissions(username))
    })
    await act(async () => {
      hookResponse.result.current.assignCompanyPermissions(assignPermissionsData.companies, username)
    })

    expect(hookResponse.result.current.successChange).toBeFalsy()
  })
})
