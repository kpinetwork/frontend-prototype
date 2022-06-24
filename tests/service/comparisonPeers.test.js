import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getComparisonPeersFromQueryParams, downloadComparisonPeers } from '../../src/service/comparisonPeers'
const { VITE_HOST: baseUrl } = import.meta.env

const comparisonPeers = `${baseUrl}/comparison`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const companies = [
  {
    id: '123',
    name: 'Sample Company',
    sector: 'Online media',
    vertical: 'Education',
    size_cohort: '$50-$100 million',
    margin_group: 'Low growth (0-<10%)',
    revenue: 70,
    revenue_vs_budget: 109,
    rule_of_40: 80,
    growth: 55,
    ebitda_margin: 90,
    ebitda_vs_budget: 108
  }
]

const getComparisonPeersResponse = {
  company_comparison_data: companies[0],
  peers_comparison_data: companies,
  rule_of_40: [
    {
      id: '123',
      name: 'Sample Company',
      revenue: 70,
      ebitda_margin: 90,
      revenue_growth_rate: -7
    }
  ]
}

describe('comparisonPeers service', () => {
  describe('getComparisonPeersFromQueryParams', () => {
    it('API call successful should return comparison peers', async () => {
      axios.get.mockResolvedValueOnce(getComparisonPeersResponse)
      await getComparisonPeersFromQueryParams({ company_id: '123' })

      expect(axios.get).toHaveBeenCalledWith(`${comparisonPeers}/${'123'}`, { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: {} })
    })
  })

  describe('downloadComparisonPeers', () => {
    it('API call successful should return comparison peers', async () => {
      axios.get.mockResolvedValueOnce('name, sector, vertical')
      await downloadComparisonPeers({ company_id: '123' })

      expect(axios.get).toHaveBeenCalledWith(`${comparisonPeers}/${'123'}/download`, { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: {} })
    })
  })
})
