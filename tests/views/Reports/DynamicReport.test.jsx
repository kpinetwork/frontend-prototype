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
  averages: { actuals_revenue: 10 },
  calendarYear: 2020,
  metrics: ['actuals_revenue'],
  setMetrics: jest.fn(),
  setCalendarYear: jest.fn(),
  setInvestYear: jest.fn()
}

describe('<DynamicReport />', () => {
  describe('render', () => {
    it('should render when fromUniverseOverview is true', () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      const header = screen.getByRole('row', { name: 'Name Revenue - actual' })

      expect(screen.getByText('Calendar Year')).toBeInTheDocument()
      expect(screen.getByTestId('metric-selector')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(3 + companies.length)
      expect(header).toBeInTheDocument()
    })

    it('should render header without label when header is not found', () => {
      const hookResponse = { ...useDynamicReportResponse, dynamicHeader: ['name', 'test'] }
      useDynamicReport.mockImplementation(() => hookResponse)
      setUp()

      const header = screen.getByRole('row', { name: 'Name test' })

      expect(header).toBeInTheDocument()
    })

    it('should render when is loading is true', () => {
      useDynamicReport.mockImplementation(() => ({ ...useDynamicReportResponse, isLoading: true }))

      setUp()

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('should change metrics to only none value when click select none metric', async () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'None' })), { timeout: 10000 })

      expect(useDynamicReportResponse.setMetrics).toHaveBeenCalledWith(['None'])
    })

    it('should change dynamic report report when select calendar year', async () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: '2022' })))

      expect(useDynamicReportResponse.setCalendarYear).toHaveBeenCalled()
    })

    it('should change dynamic report when change metric selected from None to valid metrics', async () => {
      useDynamicReport.mockImplementation(() => ({ ...useDynamicReportResponse, metrics: ['None'] }))
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Rule of 40' })), { timeout: 10000 })

      expect(useDynamicReportResponse.setMetrics).toHaveBeenCalledWith(['rule_of_40'])
    })

    it('should change dynamic report when change metric selected with valid options', async () => {
      useDynamicReport.mockImplementation(() => useDynamicReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Rule of 40' })), { timeout: 10000 })

      expect(useDynamicReportResponse.setMetrics).toHaveBeenCalledWith(
        [...useDynamicReportResponse.metrics, 'rule_of_40']
      )
    })

    it('get value when is not metric report', async () => {
      useDynamicReport.mockImplementation(() => ({ ...useDynamicReportResponse, metric: 'None' }))
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: '2022' })), { timeout: 10000 })

      expect(useDynamicReportResponse.setCalendarYear).toHaveBeenCalled()
    })

    it('should return dynamic report with correct metric', async () => {
      useDynamicReport.mockImplementation(() => (
        {
          ...useDynamicReportResponse,
          dynamicHeader: ['name', 'rule_of_40'],
          metrics: ['rule_of_40'],
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

      expect(screen.getAllByText('Rule of 40')).toHaveLength(2)
      expect(screen.getAllByText('90')).toHaveLength(2)
    })

    it('should return dynamic report with NA metric value when there is no data', async () => {
      useDynamicReport.mockImplementation(() => (
        {
          ...useDynamicReportResponse,
          dynamicHeader: ['name', 'rule_of_40'],
          metrics: ['rule_of_40'],
          dynamicCompanyComparison: {
            id: '123',
            name: 'ABC Company',
            rule_of_40: 90
          },
          dynamicPeersComparison: [{
            id: '122',
            name: 'Sample Company'
          }]
        }))
      setUp()

      expect(screen.getAllByText('NA')).toHaveLength(2)
    })
  })
})
