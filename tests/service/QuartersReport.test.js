import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getQuartersReportData } from '../../src/service/quartersReport'
import { averages, peersComparisonData, headers, subHeaders } from '../utils/QuartersReportMock'

const { VITE_HOST: baseUrl } = import.meta.env

const quarterReportUrl = `${baseUrl}/quarters_report`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('fetchQuartersReport', () => {
  describe('when API call is successfull', () => {
    it('should return quarters report', async () => {
      const dataResponse = {
        averages: averages,
        peersComparisonData: peersComparisonData,
        headers: headers,
        subHeaders: subHeaders
      }
      axios.get.mockResolvedValueOnce(dataResponse)
      await getQuartersReportData({ company_id: '123', metric: 'revenue', typeOfReport: 'year_to_year', scenario: 'actuals', years: ['2020', '2021'] })

      expect(axios.get).toHaveBeenCalledWith(`${quarterReportUrl}/123?metric=${'revenue'}&scenario=${'actuals'}&report_type=${'year_to_year'}&years=${'2020,2021'}`,
        { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: {} })
    })
  })
})
