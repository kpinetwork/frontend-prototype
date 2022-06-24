import { Auth } from 'aws-amplify'
import { getUserId, verifyIsAdmin } from '../../src/service/session'

const mockAuth = (response) => {
  jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue(response)
}

describe('fetch changeCompanyPublicly', () => {
  describe('getUserID', () => {
    it('getUserID return id successfully', async () => {
      const userID = '745e3269-f7bf-4224-bf17-b086bbece796'
      mockAuth({ attributes: { sub: userID } })

      const user = await getUserId()

      expect(user).toEqual(userID)
    })

    it('getUserID catch error', async () => {
      mockAuth(() => {
        throw new Error()
      })
      const user = await getUserId()

      expect(user).toEqual('')
    })
  })

  describe('verifyIsAdmin', () => {
    it('verifyIsAdmin return response', async () => {
      mockAuth({
        signInUserSession: {
          idToken: { payload: { 'cognito:groups': ['admin'] } }
        }
      })

      const isAdmin = await verifyIsAdmin()

      expect(isAdmin).toBeTruthy()
    })
  })
})
