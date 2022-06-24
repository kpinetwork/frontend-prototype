import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import { ByMetricReport } from '../../../src/views/Reports/ByMetricReport'
import { useMetricReport } from '../../../src/hooks/useMetricReport'
import userEvent from '@testing-library/user-event'

const companies = [
  {
    id: '123',
    name: 'Sample Company',
    metrics: {
      2020: 14,
      2021: 8,
      2022: 18
    }
  },
  {
    id: '122',
    name: 'Test Company',
    metrics: {
      2019: 45,
      2021: 34,
      2022: 158
    }
  }
]

const defaultProps = {
  fromUniverseOverview: true
}

const setUp = (props) => {
  render(<ByMetricReport {...defaultProps} {...props}/>)
}

jest.mock('../../../src/hooks/useMetricReport')

const useMetricReportResponse = {
  metric: 'actuals_ebitda',
  years: ['2019', '2020', '2021', '2022'],
  metricPeersComparison: companies,
  metricIsLoading: false,
  setMetric: jest.fn()
}

describe('<ByMetricReport />', () => {
  describe('render', () => {
    it('should render when fromUniverseOverview is true', () => {
      useMetricReport.mockImplementation(() => useMetricReportResponse)
      setUp()

      const columnHeader = screen.getAllByRole('columnheader')
      const header = screen.getByRole('row', { name: 'Company 2019 2020 2021 2022' })

      expect(screen.getByText('Metric')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(1 + companies.length)
      expect(columnHeader).toHaveLength(1 + useMetricReportResponse.years.length)
      expect(header).toBeInTheDocument()
    })

    it('should render when fromUniverseOverview is false', () => {
      useMetricReport.mockImplementation(() => (
        { ...useMetricReportResponse, metricCompanyComparison: companies[0] }
      ))
      setUp({ fromUniverseOverview: false })

      const columnHeader = screen.getAllByRole('columnheader')
      const header = screen.getByRole('row', { name: 'Company 2019 2020 2021 2022' })

      expect(screen.getByText('Metric')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(1 + companies.length + [companies[0]].length)
      expect(columnHeader).toHaveLength((1 + useMetricReportResponse.years.length) * 2)
      expect(header).toBeInTheDocument()
    })

    it('should render when fromUniverseOverview is true and metric has % symbol', () => {
      useMetricReport.mockImplementation(() => ({ ...useMetricReportResponse, metric: 'growth' }))
      setUp()

      const data = screen.getByRole('row', { name: 'Sample Company 14 % 8 % 18 %' })

      expect(screen.getByText('Metric')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(1 + companies.length)
      expect(data).toBeInTheDocument()
    })

    it('Should render when value is not numeric', () => {
      const data = [...companies, {
        id: '213',
        name: 'X Company',
        metrics: {
          2020: 'NA',
          2021: '$10-<30 million',
          2022: 18
        }
      }]
      useMetricReport.mockImplementation(() => (
        { ...useMetricReportResponse, metricPeersComparison: data }
      ))
      setUp({ fromUniverseOverview: true })

      expect(screen.getByText('NA')).toBeInTheDocument()
      expect(screen.getByText('$10-<30 million')).toBeInTheDocument()
    })
  })

  it('should render when metricIsLoading is true', () => {
    useMetricReport.mockImplementation(() => ({ ...useMetricReportResponse, metricIsLoading: true }))
    setUp()

    expect(screen.getByText('Metric')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  describe('actions', () => {
    it('click on select metric', async () => {
      useMetricReport.mockImplementation(() => useMetricReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByText('Growth rate')))

      expect(useMetricReportResponse.setMetric).toHaveBeenCalledWith('growth')
    })
  })
})
