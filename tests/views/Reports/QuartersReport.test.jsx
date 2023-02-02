import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import { QuartersReport } from '../../../src/views/Reports/QuartersReport'
import { useQuartersReport } from '../../../src/hooks/useQuartersReport'
import { peersComparisonData, headers, subHeaders, averages } from '../../utils/QuartersReportMock'
import userEvent from '@testing-library/user-event'

const defaultProps = {
  fromUniverseOverview: true
}

const setUp = (props) => {
  render(<QuartersReport {...defaultProps} {...props}/>)
}

jest.mock('../../../src/hooks/useQuartersReport')

const useQuartersReportResponse = {
  typeOfReport: 'year_to_date',
  years: [2020, 2021],
  scenario: ['Actual', 'Budget'],
  metric: ['actuals_revenue'],
  averages: averages,
  subHeaders: subHeaders,
  headers: headers,
  metricCompanyComparison: {},
  metricPeersComparison: peersComparisonData,
  metricIsLoading: false,
  setTypeOfReport: jest.fn(),
  setYears: jest.fn(),
  setScenario: jest.fn(),
  setMetric: jest.fn()
}

describe('<QuartersReport />', () => {
  describe('render', () => {
    it('Should render Quarters Report', () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      expect(screen.getByTestId('type-report-selector').toBeInTheDocument)
      expect(screen.getByTestId('scenario-selector').toBeInTheDocument)
      expect(screen.getByTestId('quarters-metric-selector').toBeInTheDocument)
      expect(screen.getByTestId('calendar-year-selector').toBeInTheDocument)
    })

    it('should render when fromUniverseOverview is true', () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()
      const header = screen.getByText('2021, 2020')
      expect(screen.getByTestId('quarters-metric-selector')).toBeInTheDocument()
      expect(header).toBeInTheDocument()
    })

    it('Should render table', () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      expect(screen.getByRole('table').toBeInTheDocument)
    })
  })
  describe('actions', () => {
    it('click on select type of report', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('type-report-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getAllByRole('option')[0]))

      expect(useQuartersReportResponse.setTypeOfReport).toHaveBeenCalledWith('year_to_year')
    })
    it('click on select scenario', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('scenario-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByText('Actuals')))

      expect(useQuartersReportResponse.setScenario).toHaveBeenCalledWith('actuals')
    })
    it('click on select Quarter metric', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('quarters-metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByText('Revenue')))

      expect(useQuartersReportResponse.setMetric).toHaveBeenCalledWith('revenue')
    })
    it('click on select year', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getAllByRole('option')[0]))

      expect(useQuartersReportResponse.setYears).toHaveBeenCalledWith([2020, 2021, 2023])
    })
  })
})
