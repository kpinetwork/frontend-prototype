import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getCompanyTags } from '../../src/service/tagsByCompany'

const { VITE_HOST: baseUrl } = import.meta.env

const tag = `${baseUrl}/companies`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('companyTags service', () => {
  describe('get company tags', () => {
    it('API call successful should return company tags', async () => {
      const companyId = '1'
      const tags = [
        {
          id: '1234',
          name: 'Sample tag'
        },
        {
          id: '1234',
          name: 'Sample tag'
        }
      ]

      axios.get.mockResolvedValueOnce([tags])
      await getCompanyTags(companyId)

      expect(axios.get).toHaveBeenCalledWith(`${tag}/${companyId}/tags`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
