import axios from 'axios'
import { Auth } from 'aws-amplify'
import { COMPANIESDETAILS, SCENARIO } from '../data/companies'
import {
  getCompanyDetails,
  getCompanyInvestments,
  addCompanyInvestment,
  addCompanyScenario,
  deleteCompanyScenarios,
  deleteCompany,
  getFullYearTotalAmount
} from '../../src/service/companyDetails'

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
      await getCompanyDetails({ selectedCompanyID: COMPANIESDETAILS.id, limit: 10, offset: 10, ordered: true })

      expect(axios.get).toHaveBeenCalledWith(`${companiesUrl}/${COMPANIESDETAILS.id}?limit=10&offset=10&ordered=true`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
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

  describe('add scenario', () => {
    it('API call successful should add company scenario', async () => {
      axios.post.mockResolvedValueOnce({
        data: {
          company_id: SCENARIO.company_id,
          scenario: {
            id: 'scenario_id',
            name: 'Actuals-2020',
            metric_id: 'metric_id'
          },
          added: true
        }
      })
      await addCompanyScenario(SCENARIO.company_id, SCENARIO)

      expect(axios.post).toHaveBeenCalledWith(`${companiesUrl}/${SCENARIO.company_id}/scenarios`, SCENARIO, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })

    it('add scenario API call fails should return error message', async () => {
      axios.post.mockRejectedValueOnce({ response: 'Scenario could not be added' })

      await addCompanyScenario('id', {}).catch(err => {
        expect(err).toEqual({ error: 'Scenario could not be added' })
      })
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

    it('add investment API call fails should return error message', async () => {
      axios.post.mockRejectedValueOnce({ response: 'Investement could not be added' })

      await addCompanyInvestment('id', {}).catch(err => {
        expect(err).toEqual({ error: 'Investement could not be added' })
      })
    })
  })

  describe('delete scenarios', () => {
    it('API call successful should delete company scenario', async () => {
      const scenarios = [
        {
          scenario_id: 'zec4b0212-m385-4828-814c-0e6b21d98f87',
          metric_id: 'afq4b0212-m385-4828-814c-0e6b21d98f87'
        },
        {
          scenario_id: 'jhy4b0212-m385-4828-814c-0e6b21d98f87',
          metric_id: 'vpr4b0212-m385-4828-814c-0e6b21d98f87'
        }
      ]
      axios.delete.mockResolvedValueOnce({
        deleted: 2
      })
      await deleteCompanyScenarios(SCENARIO.company_id, scenarios)

      expect(axios.delete).toHaveBeenCalledWith(`${companiesUrl}/${SCENARIO.company_id}/scenarios`, { data: { scenarios: scenarios }, headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })

    it('delete scenario API call fails should return error message', async () => {
      axios.delete.mockRejectedValueOnce({ response: 'Scenario could not be deleted' })

      await deleteCompanyScenarios('id', [{}]).catch(err => {
        expect(err).toEqual({ error: 'Scenario could not be deleted' })
      })
    })
  })

  describe('delete company', () => {
    it('API call successful should delete company', async () => {
      axios.delete.mockResolvedValueOnce({
        deleted: true
      })
      await deleteCompany(COMPANIESDETAILS.company_id)

      expect(axios.delete).toHaveBeenCalledWith(
        `${companiesUrl}/${COMPANIESDETAILS.company_id}`,
        {
          headers: { Authorization: null, 'Content-Type': 'application/json' }
        })
    })
  })

  describe('get full year total amount', () => {
    it('API call successful should return the full year total value', async () => {
      const FULL_YEAR_RESPONSE = { total: 100 }
      axios.get.mockResolvedValueOnce(FULL_YEAR_RESPONSE)
      await getFullYearTotalAmount({ selectedCompanyID: COMPANIESDETAILS.company_id, scenario: 'Actuals', metric: 'Revenue', year: 2020 })

      expect(axios.get).toHaveBeenCalledWith(
        `${baseUrl}/full_year/${COMPANIESDETAILS.company_id}?scenario=Actuals&metric=Revenue&year=2020`,
        {
          headers: { Authorization: null, 'Content-Type': 'application/json' }
        })
    })
  })
})
