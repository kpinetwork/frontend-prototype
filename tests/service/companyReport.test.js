import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getCompanyReportFromQueryParams } from '../../src/service/companyReport'
const { VITE_HOST: baseUrl } = import.meta.env

const companyReport = `${baseUrl}/company_report`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const options = {
  company_id: '123',
  filters: {
    vertical: 'Education'
  }
}

const response = {
  description: {
    id: '1',
    name: 'Sample company abc',
    sector: 'Application Software',
    vertical: 'Media',
    inves_profile_name: 'Private equity',
    size_cohort: '$100 million+',
    margin_group: 'High growth (30%-<50%)'
  },
  financial_profile: {
    annual_ebitda: -3,
    annual_revenue: 10,
    annual_rule_of_40: 15,
    forward_ebitda_growth: 4,
    forward_revenue_growth: 'NA',
    forward_rule_of_40: 'NA'
  }
}

describe('companyReport service', () => {
  describe('get company report', () => {
    it('API call successful should return company report', async () => {
      axios.get.mockResolvedValueOnce(response)
      await getCompanyReportFromQueryParams(options)

      expect(axios.get).toHaveBeenCalledWith(`${companyReport}/${options.company_id}`,
        {
          headers:
            { Authorization: null, 'Content-Type': 'application/json' },
          params: { filters: options.filters }
        })
    })
  })
})
