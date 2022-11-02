import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getMetricRanges } from '../../src/service/metricRanges'
const { VITE_HOST: baseUrl } = import.meta.env

const ranges = {
  total: 2,
  ranges: [{
    key: 'metric_name',
    name: '',
    ranges: [
      { id: '1', label: '$100-<$200k', min_value: 100, max_value: 200, type: 'metric_name' }
    ]
  }]
}

const metricRangesUrl = `${baseUrl}/metric_ranges`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('ranges service', () => {
  describe('get ranges', () => {
    it('API call success should return all ranges', async () => {
      axios.get.mockResolvedValueOnce(ranges)
      await getMetricRanges({ limit: 10, offset: 10 })

      expect(axios.get).toHaveBeenCalledWith(`${metricRangesUrl}?limit=10&offset=10`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
