import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
  getUsers,
  getUserDetails,
  getRoles,
  getPermissions,
  changeUserRole,
  assignPermissions
} from '../../src/service/users'
const { VITE_HOST: baseUrl } = import.meta.env

const usersPath = `${baseUrl}/users`
const rolesPath = `${baseUrl}/roles`
const username = '01'
const email = 'user@test.com'

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const usersResponse = {
  users: [{ username, email, roles: [] }],
  token: null
}

describe('users service', () => {
  describe('getEditModifyData', () => {
    it('API call successful should return users data', async () => {
      axios.get.mockResolvedValueOnce(usersResponse)
      const options = { limit: 10, token: 'token', group: 'demo_admin_group' }
      await getUsers(options)

      expect(axios.get).toHaveBeenCalledWith(
        `${usersPath}?limit=${options.limit}&group=${options.group}&token=${options.token}`,
        { headers: { Authorization: null, 'Content-Type': 'application/json' } }
      )
    })

    it('API call successful should return users data without token', async () => {
      axios.get.mockResolvedValueOnce(usersResponse)
      const options = { limit: 10, token: null, group: 'demo_admin_group' }
      await getUsers(options)

      expect(axios.get).toHaveBeenCalledWith(
          `${usersPath}?limit=${options.limit}&group=${options.group}`,
          { headers: { Authorization: null, 'Content-Type': 'application/json' } }
      )
    })
  })

  describe('userDetails', () => {
    it('API call successful should return response user details data', async () => {
      const userDetails = {
        user: { email, roles: ['Admin'] },
        permissions: [
          { id: '1', name: 'Sample Company', sector: 'Education' }
        ]
      }
      axios.get.mockResolvedValueOnce(userDetails)
      await getUserDetails('user@test.com')

      expect(axios.get).toHaveBeenCalledWith(
        `${usersPath}/${email}`,
        { headers: { Authorization: null, 'Content-Type': 'application/json' } }
      )
    })

    it('API call successful should return response user permissions data', async () => {
      const userPermissions = [
        {
          id: '1',
          permission: 'read',
          name: 'Sample company'
        }
      ]
      axios.get.mockResolvedValueOnce(userPermissions)
      await getPermissions(email)

      expect(axios.get).toHaveBeenCalledWith(
          `${usersPath}/${email}/company_permissions`,
          { headers: { Authorization: null, 'Content-Type': 'application/json' } }
      )
    })

    it('API call successful should return response change user role', async () => {
      const data = {
        new_role: 'admin',
        current_role: 'client'
      }
      axios.put.mockResolvedValueOnce({ modified: true })
      await changeUserRole(email, data)

      expect(axios.put).toHaveBeenCalledWith(
            `${usersPath}/${email}/roles`,
            data,
            { headers: { Authorization: null, 'Content-Type': 'application/json' } }
      )
    })

    it('API call successful should return response assign company permissions', async () => {
      const data = {
        companies: {
          1: true
        }
      }
      axios.put.mockResolvedValueOnce({ modified: true })
      await assignPermissions(data, email)

      expect(axios.put).toHaveBeenCalledWith(
              `${usersPath}/${email}/company_permissions`,
              data,
              { headers: { Authorization: null, 'Content-Type': 'application/json' } }
      )
    })
  })

  describe('getRoles', () => {
    it('API call successful should return response roles data', async () => {
      const roles = [
        { name: 'Admin', descriptions: '' }
      ]
      axios.get.mockResolvedValueOnce(roles)
      await getRoles()

      expect(axios.get).toHaveBeenCalledWith(
        rolesPath,
        { headers: { Authorization: null, 'Content-Type': 'application/json' } }
      )
    })
  })
})
