import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getCompanies, getPublicCompanies } from '../../src/service/company'

const { VITE_HOST: baseUrl } = import.meta.env

const companiesUrl = `${baseUrl}/companies`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const sampleCompanies = [
  {
    id: '1',
    name: 'Sample company abc',
    sector: 'Application Software',
    vertical: 'Media',
    inves_profile_name: 'Private equity',
    size_cohort: '$100 million+',
    margin_group: 'High growth (30%-<50%)'
  },
  {
    id: '2',
    name: 'Sample company xyz',
    sector: 'Professional Services',
    inves_profile_name: 'Growth stage VC',
    size_cohort: '$100 million+',
    margin_group: 'Medium growth (10%-<30%)'
  }
]

const getCompaniesResponse = {
  total: 2,
  companies: sampleCompanies
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
      axios.get.mockResolvedValueOnce({ ...getCompaniesResponse, companies: [sampleCompanies[0]] })
      await getPublicCompanies()

      expect(axios.get).toHaveBeenCalledWith(`${companiesUrl}/public`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
