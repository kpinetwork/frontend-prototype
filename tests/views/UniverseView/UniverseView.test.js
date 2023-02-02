import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Auth } from 'aws-amplify'
import { UniverseView } from '../../../src/views/UniverseView/UniverseView'
import useUniverseOverview from '../../../src/hooks/useUniverseOverview'
import { useComparisonPeers } from '../../../src/hooks/useComparisionPeers'
import Context from '../../../src/context/appContext'
import { REVENUE_AND_EBITDA, KPI_AVERAGE, GROWTH_AND_MARGIN, EXP_GROWTH_AND_MARGIN, COUNT_BY_SIZE } from '../../data/universeOverview'

jest.mock('../../../src/hooks/useUniverseOverview')

jest.mock('../../../src/hooks/useComparisionPeers')

jest.mock('@components/BubbleChart', () => ({
  BubbleChart: () => {
    const MockBubbleChart = 'bubble-chart-mock'
    return <MockBubbleChart data-testid='bubble-chart-mock' />
  }
}))

jest.mock('@components/Filter/Filter', () => ({
  Filter: () => {
    const MockFilter = 'bubble-chart-mock'
    return <MockFilter data-testid='filter-mock' />
  }
}))

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const useUniverseOverviewResponse = {
  kpiAverage: KPI_AVERAGE,
  countBySize: COUNT_BY_SIZE,
  growthAndMargin: GROWTH_AND_MARGIN,
  expectedGrowthAndMargin: EXP_GROWTH_AND_MARGIN,
  revenueAndEbitda: REVENUE_AND_EBITDA,
  isLoading: false,
  fillFilters: jest.fn(),
  year: 2022,
  setYear: jest.fn(),
  setFilters: jest.fn(),
  filters: {}
}

const useComparisonPeersResponse = {
  ruleOf40: [
    {
      name: 'Sample company abc',
      revenue_growth_rate: 15,
      ebitda_margin: 90,
      revenue: 30,
      company_id: '1'
    },
    {
      name: 'Sample company xyz',
      revenue_growth_rate: 43,
      ebitda_margin: 34,
      revenue: 23,
      company_id: '2'
    }
  ]
}

const setUp = () => {
  render(<Context.Provider value={{ filterFields: { filters: {} } }}>
    <UniverseView />
  </Context.Provider>)
}

describe('<UniverseView />', () => {
  describe('render', () => {
    it('Should render Universe View', () => {
      useUniverseOverview.mockImplementation(() => useUniverseOverviewResponse)
      useComparisonPeers.mockImplementation(() => useComparisonPeersResponse)
      setUp()

      const cards = screen.getAllByRole('grid')
      const peerGroup = screen.getAllByRole('tab')

      expect(cards).toHaveLength(5)
      expect(peerGroup).toHaveLength(5)
      expect(screen.getByText('KPI Averages')).toBeInTheDocument()
      expect(screen.getByText('Count By Size')).toBeInTheDocument()
      expect(screen.getByText('Growth and margin by size; recent actuals')).toBeInTheDocument()
      expect(screen.getByText('Revenue & ebitda vs budget')).toBeInTheDocument()
      expect(screen.getByText('Growth and margin by size; projected')).toBeInTheDocument()
    })
  })
})
