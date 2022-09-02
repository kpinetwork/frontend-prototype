import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getInvestmentDateReport } from '../../src/service/investmentDateReport'

const { VITE_HOST: baseUrl } = import.meta.env

const investmentDateReportUrl = `${baseUrl}/investment_date_report`

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
    metrics: [
      {
        metric_name: 'growth',
        2019: 'NA',
        2020: -8,
        2021: 145
      },
      {
        metric_name: 'actuals_revenue',
        2019: 37,
        2020: 34,
        2021: 83
      }
    ]
  }
]

const getInvestmentReportResponse = {
  header: ['name', 'actuals_revenue'],
  company_comparison_data: companies[0],
  peers_comparison_data: companies
}

describe('fetchMetricReport', () => {
  describe('when API call is successful', () => {
    it('should return metric report', async () => {
      axios.get.mockResolvedValueOnce(getInvestmentReportResponse)
      await getInvestmentDateReport({ metrics: 'actuals_revenue', company_id: '123' })

      expect(axios.get).toHaveBeenCalledWith(`${investmentDateReportUrl}`,
        { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: { company_id: '123', metrics: 'actuals_revenue' } })
    })

    it('should return metric report when there is no company', async () => {
      axios.get.mockResolvedValueOnce(getInvestmentReportResponse)
      await getInvestmentDateReport({ metrics: 'actuals_revenue' })

      expect(axios.get).toHaveBeenCalledWith(`${investmentDateReportUrl}`,
        { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: { company_id: '', metrics: 'actuals_revenue' } })
    })
  })
})
