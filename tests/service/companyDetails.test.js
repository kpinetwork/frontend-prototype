import axios from 'axios'
import { Auth } from 'aws-amplify'
import { COMPANIESDETAILS } from '../data/companies'
import { getCompanyDetails, getCompanyInvestments, addCompanyInvestment } from '../../src/service/companyDetails'

const { VITE_HOST: baseUrl } = import.meta.env

const companiesUrl = `${baseUrl}/companies`
const investments = `${baseUrl}/investments`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('companyDetails service', () => {
  describe('get company details', () => {
    it('API call successful should return company details', async () => {
      axios.get.mockResolvedValueOnce(COMPANIESDETAILS)
      await getCompanyDetails({ selectedCompanyID: COMPANIESDETAILS.id, limit: 10, offset: 0 })

      expect(axios.get).toHaveBeenCalledWith(`${companiesUrl}/${COMPANIESDETAILS.id}?limit=10&offset=0`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })

  describe('get company investments', () => {
    it('API call successful should return company investments', async () => {
      const investment =
        {
          company_id: 'zec4b0212-m385-4828-814c-0e6b21d98f87',
          investment_date: '2019-02',
          divestment_date: null,
          round: 1,
          structure: 'Primary',
          ownership: 'Minority',
          investor_type: 'Private equity'
        }

      axios.get.mockResolvedValueOnce([investment])
      await getCompanyInvestments(investment.company_id)

      expect(axios.get).toHaveBeenCalledWith(`${investments}/${investment.company_id}`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })

  describe('add investment', () => {
    it('API call successful should create company investment', async () => {
      const response = {
        company_id: 'zec4b0212-m385-4828-814c-0e6b21d98f87',
        investment: {
          invest: '2020-09',
          round: 1,
          structure: 'Primary',
          onwership: 'Minority',
          investor_type: 'Private equity',
          investor: 'Sample Investor'
        },
        added: true
      }

      const request = {
        invest: '2020-09',
        round: 1,
        structure: 'Primary',
        onwership: 'Minority',
        investor_type: 'Private equity',
        investor: 'Sample Investor'
      }

      axios.post.mockResolvedValueOnce(response)
      await addCompanyInvestment(response.company_id, request)

      expect(axios.post).toHaveBeenCalledWith(`${investments}/${response.company_id}`, request,
        { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
