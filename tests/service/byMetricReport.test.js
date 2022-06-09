import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getByMetricReport } from '../../src/service/metricReport'

const { VITE_HOST: baseUrl } = import.meta.env

const metrictReportUrl = `${baseUrl}/by_metric_report`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('fetchMetricReport', () => {
  describe('when API call is successful', () => {
    it('should return metric report', async () => {
      const dataResponse = {
        years: ['2020', '2021'],
        companies: [
          {
            id: '1234',
            name: 'Sample company',
            metrics: {
              2020: 14,
              2021: 16
            }
          }
        ]
      }
      axios.get.mockResolvedValueOnce(dataResponse)
      await getByMetricReport({ metric: 'revenue-actuals', company_id: '123' })

      expect(axios.get).toHaveBeenCalledWith(`${metrictReportUrl}/123?metric=${'revenue-actuals'}`,
        { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: {} })
    })
  })
})
