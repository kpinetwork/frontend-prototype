import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getUniverseOverviewFromQueryParams } from '../../src/service/universeOverview'
import { KPI_AVERAGE, COUNT_BY_SIZE, GROWTH_AND_MARGIN, EXP_GROWTH_AND_MARGIN, REVENUE_AND_EBITDA } from '../data/universeOverview'

const { VITE_HOST: baseUrl } = import.meta.env

const universeOverview = `${baseUrl}/universe_overview`

const dataResponse = {
  kpiAverage: KPI_AVERAGE,
  countBySize: COUNT_BY_SIZE,
  growthAndMargin: GROWTH_AND_MARGIN,
  expectedGrowthAndMargin: EXP_GROWTH_AND_MARGIN,
  revenueAndEbitda: REVENUE_AND_EBITDA
}

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('fetch Universe Overview', () => {
  describe('when API call is successful', () => {
    it('should return universe overview when call with axios', async () => {
      axios.get.mockResolvedValueOnce(dataResponse)
      await getUniverseOverviewFromQueryParams()

      expect(axios.get).toHaveBeenCalledWith(`${universeOverview}`, { headers: { Authorization: null, 'Content-Type': 'application/json' }, params: {} })
    })
  })
})
