import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getCompanyPanelFromQueryParams } from '../../src/service/companyPanel'

const { VITE_HOST: baseUrl } = import.meta.env

const companies = `${baseUrl}/companies`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('fetchCompanies', () => {
  describe('when API call is successful', () => {
    it('should return companies and total of companies', async () => {
      const dataResponse = {
        total: 1,
        companies: [
          {
            id: '1234',
            name: 'Sample company',
            sector: 'test sector',
            vertical: 'vertical sector',
            inves_profile_name: 'test invest profile',
            is_public: false
          }
        ]
      }
      axios.get.mockResolvedValueOnce(dataResponse)
      await getCompanyPanelFromQueryParams({ limit: 1, offset: 0 })
      expect(axios.get).toHaveBeenCalledWith(`${companies}?limit=1&offset=0`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
