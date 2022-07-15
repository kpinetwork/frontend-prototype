import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getMetricsType } from '../../src/service/metrics'

const { VITE_HOST: baseUrl } = import.meta.env

const metricsUrl = `${baseUrl}/metrics`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('metric service', () => {
  describe('getCompanies', () => {
    it('API call is successful', async () => {
      axios.get.mockResolvedValueOnce(['Revenue', 'Ebitda'])
      await getMetricsType()

      expect(axios.get).toHaveBeenCalledWith(`${metricsUrl}/type`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
