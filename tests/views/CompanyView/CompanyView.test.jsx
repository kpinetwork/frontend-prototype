import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { CompanyView } from '../../../src/views/CompanyView/CompanyView'
import { useCompanyReport } from '../../../src/hooks/useCompanyReport'
import { useComparisonPeers } from '../../../src/hooks/useComparisionPeers'
import Context from '../../../src/context/appContext'

jest.mock('../../../src/hooks/useCompanyReport')

jest.mock('../../../src/hooks/useComparisionPeers')

jest.mock('@components/BubbleChart', () => ({
  BubbleChart: () => {
    const MockBubbleChart = 'bubble-chart-mock'
    return <MockBubbleChart data-testid='bubble-chart-mock' />
  }
}))

const filters = {
  growth_profile: '',
  investor_profile: '',
  sector: '',
  size: '',
  vertical: ''
}

const sampleCompanies = [
  {
    id: '1',
    name: 'Sample company abc',
    sector: 'Application Software',
    vertical: 'Media',
    inves_profile_name: 'Private equity',
    size_cohort: '$100 million+',
    margin_group: 'High growth (30%-<50%)'
  },
  {
    id: '2',
    name: 'Sample company xyz',
    sector: 'Professional Services',
    inves_profile_name: 'Growth stage VC',
    size_cohort: '$100 million+',
    margin_group: 'Medium growth (10%-<30%)'
  }
]

const useCompanyReportResponse = {
  description: sampleCompanies[0],
  publicCompanies: sampleCompanies,
  financialProfile: {
    annual_ebitda: -3,
    annual_revenue: 10,
    annual_rule_of_40: 15,
    forward_ebitda_growth: 4,
    forward_revenue_growth: 'NA',
    forward_rule_of_40: 'NA'
  },
  setCompanyID: jest.fn(),
  companyID: '1',
  isLoading: false,
  year: '2022',
  setYear: jest.fn(),
  filters: filters,
  setFilters: jest.fn()
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
  <CompanyView />
</Context.Provider>)
}

describe('<CompanyView />', () => {
  describe('render', () => {
    it('Should render Company Report', () => {
      useCompanyReport.mockImplementation(() => useCompanyReportResponse)
      useComparisonPeers.mockImplementation(() => useComparisonPeersResponse)
      setUp()

      expect(screen.getByText('Please select a company of the 2022:'))
      expect(screen.getByText('Company financial profile'))
      expect(screen.getByText('Description'))
      expect(screen.getByText('Filters'))
      expect(screen.getByTestId('bubble-chart-mock'))
    })
  })
})
