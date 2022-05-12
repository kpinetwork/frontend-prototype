import axios from 'axios'
import { Auth } from 'aws-amplify'
import { changeCompanyPublicly } from '../../src/service/changeCompanyPublicly'

const { VITE_HOST: baseUrl } = import.meta.env

const changeCompany = `${baseUrl}/companies/change_company_publicly`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('fetch changeCompanyPublicly', () => {
  describe('when API call is successful', () => {
    it('should return 200 status', async () => {
      const dataResponse = {
        statusCode: 200,
        body: { modified: true }
      }
      axios.put.mockResolvedValueOnce(dataResponse)
      await changeCompanyPublicly({ companies: { 123: true } })
      expect(axios.put).toHaveBeenCalledWith(`${changeCompany}`, { companies: { 123: true } }, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
