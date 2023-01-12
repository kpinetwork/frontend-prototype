import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import { InvestmentReport } from '../../../src/views/Reports/InvestmentReport'
import { useInvestmentDateReport } from '../../../src/hooks/useInvestmentDateReport'
import userEvent from '@testing-library/user-event'

jest.setTimeout(10000)

const companies = [
  {
    id: '123',
    name: 'Sample Company',
    metrics: [
      {
        metric_name: 'growth',
        2019: 'NA',
        2020: -8,
        2021: 145
      },
      {
        metric_name: 'actuals_revenue',
        2019: null,
        2020: 34,
        2021: 83
      }
    ]
  },
  {
    id: '123',
    name: 'Sample Company',
    metrics: [
      {
        metric_name: 'actua_ebitda',
        2019: 'NA',
        2020: -8,
        2021: null
      }
    ]
  }
]

const defaultProps = {
  fromUniverseOverview: true
}

const setUp = (props) => {
  render(<InvestmentReport {...defaultProps} {...props}/>)
}

jest.mock('../../../src/hooks/useInvestmentDateReport')

const useInvestmentReportResponse = {
  investHeaders: ['id', 'name', 'metric name', 'Investment - 2', 'Investment - 1', 'Year of investment'],
  investPeersComparison: companies,
  investCompanyComparison: companies[0],
  firstMetric: 'actuals_revenue',
  secondMetric: 'actuals_ebitda',
  isLoading: false,
  setFirstMetric: jest.fn(),
  setSecondMetric: jest.fn()
}

describe('<InvestmenteReport />', () => {
  describe('render', () => {
    it('should render when fromUniverseOverview is true', () => {
      useInvestmentDateReport.mockImplementation(() => useInvestmentReportResponse)
      setUp()

      const header = screen.getByRole('row', { name: 'Name Metric Investment - 2 Investment - 1 Year of investment' })

      expect(screen.getByText('First Metric')).toBeInTheDocument()
      expect(screen.getByText('Second Metric')).toBeInTheDocument()
      expect(header).toBeInTheDocument()
    })

    it('should render when fromUniverseOverview is true if peer has no objects', () => {
      const companies = [
        {
          id: '123',
          name: 'Sample Company',
          metrics: [
            {
            },
            {
              metric_name: 'actuals_revenue',
              2019: null,
              2020: 34,
              2021: 83
            }
          ]
        }
      ]
      useInvestmentDateReport.mockImplementation(() => ({ ...useInvestmentReportResponse, investPeersComparison: companies }))
      setUp()

      const header = screen.getByRole('row', { name: 'Name Metric Investment - 2 Investment - 1 Year of investment' })

      expect(screen.getByText('First Metric')).toBeInTheDocument()
      expect(screen.getByText('Second Metric')).toBeInTheDocument()
      expect(header).toBeInTheDocument()
    })

    it('should render when is loading is true', () => {
      useInvestmentDateReport.mockImplementation(() => ({ ...useInvestmentReportResponse, isLoading: true }))

      setUp()

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('should change first selector when click on first selector', async () => {
      useInvestmentDateReport.mockImplementation(() => useInvestmentReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getAllByTestId('metric-selector')[0], 'combobox'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Ebitda - actual' })), { timeout: 10000 })
      await waitFor(() => userEvent.click(getByRole(screen.getAllByTestId('metric-selector')[1], 'combobox')), { timeout: 10000 })
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Rule of 40' })), { timeout: 10000 })

      expect(useInvestmentReportResponse.setSecondMetric).toHaveBeenCalled()
    })
  })
})
