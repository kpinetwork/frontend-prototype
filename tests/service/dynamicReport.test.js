import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getDynamicReport } from '../../src/service/dynamicReport'

const { VITE_HOST: baseUrl } = import.meta.env

const dynamicReportUrl = `${baseUrl}/dynamic_report`

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

const getDynamicReportResponse = {
  header: ['name', 'actuals_revenue'],
  company_comparison_data: companies[0],
  peers_comparison_data: companies
}

describe('fetchMetricReport', () => {
  describe('when API call is successful', () => {
    it('should return metric report', async () => {
      axios.get.mockResolvedValueOnce(getDynamicReportResponse)
      await getDynamicReport({ metrics: 'actuals_revenue', company_id: '123', calendarYear: '2020' })

      expect(axios.get).toHaveBeenCalledWith(`${dynamicReportUrl}/123?metrics=actuals_revenue&calendar_year=2020&investment_year=undefined&new=true`,
        { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: { } })
    })
  })
})
