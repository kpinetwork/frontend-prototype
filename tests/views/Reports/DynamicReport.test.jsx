import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import { DynamicReport } from '../../../src/views/Reports/DynamicReport'
import { useDynamicReport } from '../../../src/hooks/useDynamicReport'
import userEvent from '@testing-library/user-event'

const companies = [
  {
    id: '123',
    name: 'Sample Company',
    actuals_revenue: 9
  },
  {
    id: '122',
    name: 'Test Company',
    actuals_revenue: -8
  }
]

const defaultProps = {
  fromUniverseOverview: false
}

const setUp = (props) => {
  render(<DynamicReport {...defaultProps} {...props}/>)
}

jest.mock('../../../src/hooks/useDynamicReport')

const useDynamicReportResponse = {
  dynamicHeader: ['name', 'actuals_revenue'],
  dynamicCompanyComparison: companies[0],
  dynamicPeersComparison: companies,
  investYear: 'None',
  calendarYear: 2020,
  metric: 'actuals_revenue',
  setMetric: jest.fn(),
  setCalendarYear: jest.fn(),
  setInvestYear: jest.fn()
}

describe('<DynamicReport />', () => {
  describe('render', () => {
    it('should render when fromUniverseOverview is true', () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      const header = screen.getByRole('row', { name: 'Name Revenue - actual' })

      expect(screen.getByText('Metric')).toBeInTheDocument()
      expect(screen.getByText('Investment Year')).toBeInTheDocument()
      expect(screen.getByText('Calendar Year')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(2 + companies.length)
      expect(header).toBeInTheDocument()
    })

    it('should render when is loading is true', () => {
      useDynamicReport.mockImplementation(() => ({ ...useDynamicReportResponse, isLoading: true }))

      setUp()

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('should change to calendar year report when click select none metric', async () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'None' })))

      expect(useDynamicReportResponse.setMetric).toHaveBeenCalledWith('None')
    })

    it('should change investment year report when select invest year', async () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('investment-year-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Year of investment' })))

      expect(useDynamicReportResponse.setInvestYear).toHaveBeenCalledWith(0)
    })

    it('should change calendar year report when select calendar year', async () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: '2022' })))

      expect(useDynamicReportResponse.setInvestYear).toHaveBeenCalled()
    })

    it('should change metric report when select metric', async () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Rule of 40' })))

      expect(useDynamicReportResponse.setMetric).toHaveBeenCalledWith('rule_of_40')
    })

    it('get value when is not metric report', async () => {
      useDynamicReport.mockImplementation(() => ({ ...useDynamicReportResponse, metric: 'None' }))
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: '2022' })))

      expect(useDynamicReportResponse.setInvestYear).toHaveBeenCalled()
    })

    it('should return metric report', async () => {
      useDynamicReport.mockImplementation(() => (
        {
          ...useDynamicReportResponse,
          metric: 'rule_of_40',
          dynamicHeader: ['name', 2021, 2020],
          dynamicCompanyComparison: {
            id: '123',
            name: 'Sample Company',
            metrics: {
              2021: 19,
              2020: -6
            }
          },
          dynamicPeersComparison: [{
            id: '122',
            name: 'Sample Company',
            metrics: {
              2021: 19,
              2020: -6
            }
          }]
        }))
      setUp({ fromUniverseOverview: false })

      await userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: '2022' })))

      expect(useDynamicReportResponse.setInvestYear).toHaveBeenCalled()
      expect(screen.getByText('2021')).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: '2020' })).toBeInTheDocument()
    })

    it('should return calendar year report', async () => {
      useDynamicReport.mockImplementation(() => (
        {
          ...useDynamicReportResponse,
          dynamicHeader: ['name', 'rule_of_40'],
          metric: 'None',
          dynamicCompanyComparison: {
            id: '123',
            name: 'ABC Company',
            rule_of_40: 90
          },
          dynamicPeersComparison: [{
            id: '122',
            name: 'Sample Company',
            rule_of_40: 90
          }]
        }))
      setUp()

      expect(screen.getAllByText('None')).toHaveLength(2)
      expect(screen.getAllByText('90')).toHaveLength(2)
    })
  })
})
