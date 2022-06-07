// Test investmentByYearReport service
import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getInvestmentReport } from '../../src/service/investmentByYearReport'

const { VITE_HOST: baseUrl } = import.meta.env

const investmentReport = `${baseUrl}/investment_report`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('investmentByYearReport service', () => {
  describe('getInvestmentReport', () => {
    it('API call successful should return investment by year report', async () => {
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
      await getInvestmentReport({ company_id: investment.company_id })

      expect(axios.get).toHaveBeenCalledWith(`${investmentReport}/${investment.company_id}`, { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: {} })
    })
  })
})
