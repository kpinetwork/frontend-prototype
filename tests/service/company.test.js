import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getCompanies, getPublicCompanies } from '../../src/service/company'
import { SAMPLECOMPANIES } from '../data/companies'

const { VITE_HOST: baseUrl } = import.meta.env

const companiesUrl = `${baseUrl}/companies`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const getCompaniesResponse = {
  total: 2,
  companies: SAMPLECOMPANIES
}

describe('company service', () => {
  describe('getCompanies', () => {
    it('API call is successful', async () => {
      axios.get.mockResolvedValueOnce(getCompaniesResponse)
      await getCompanies()

      expect(axios.get).toHaveBeenCalledWith(`${companiesUrl}`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })

  describe('getPublicCompanies', () => {
    it('API call is successful', async () => {
      axios.get.mockResolvedValueOnce({ ...getCompaniesResponse, companies: [SAMPLECOMPANIES[0]] })
      await getPublicCompanies()

      expect(axios.get).toHaveBeenCalledWith(`${companiesUrl}/public`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
