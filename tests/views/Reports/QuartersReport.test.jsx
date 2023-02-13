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
  yearSelectorOpened: false,
  typeOfReport: 'year_to_date',
  years: [2021, 2020],
  scenario: 'actuals',
  metric: 'revenue_vs_budget',
  period: 'Q2',
  averages: averages,
  subHeaders: subHeaders,
  headers: headers,
  metricCompanyComparison: {},
  metricPeersComparison: peersComparisonData,
  metricIsLoading: false,
  setTypeOfReport: jest.fn(),
  setYears: jest.fn(),
  setScenario: jest.fn(),
  setMetric: jest.fn(),
  setPeriod: jest.fn(),
  setYearSelectorOpened: jest.fn()
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

    it('should render header and metric selector', () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()
      const header = screen.getByText('2021')
      expect(screen.getByTestId('quarters-metric-selector')).toBeInTheDocument()
      expect(header).toBeInTheDocument()
    })

    it('Should render table', () => {
      const useQuartersHookResponse = { ...useQuartersReportResponse, scenario: 'budget' }
      useQuartersReport.mockImplementation(() => useQuartersHookResponse)
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
      await waitFor(() => userEvent.click(screen.getAllByRole('option')[1]))

      expect(useQuartersReportResponse.setScenario).toHaveBeenCalledWith('budget')
    })
    it('click on select scenario and change to budget', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('scenario-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getAllByRole('option')[0]))
      await userEvent.click(getByRole(screen.getByTestId('quarters-metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByText('Ebitda vs budget')))

      expect(useQuartersReportResponse.setMetric).toHaveBeenCalledWith('ebitda_vs_budget')
    })
    it('click on select Quarter metric', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('quarters-metric-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByText('Revenue')))

      expect(useQuartersReportResponse.setMetric).toHaveBeenCalledWith('revenue')
    })
    it('click on year select and it calls setSelector with true', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
      expect(useQuartersReportResponse.setYearSelectorOpened).toHaveBeenCalledWith(true)
    })
    it('when year select is open then choose an option and it should call setYear with new year', async () => {
      const useQuartersHookResponse = { ...useQuartersReportResponse, yearSelectorOpened: true }
      useQuartersReport.mockImplementation(() => useQuartersHookResponse)
      setUp()
      await waitFor(() => userEvent.click(screen.getAllByRole('option')[0]))
      expect(useQuartersReportResponse.setYears).toHaveBeenCalledWith([2021, 2020, 2014])
      expect(useQuartersReportResponse.setYearSelectorOpened).toHaveBeenCalledWith(false)
    })

    it('click on select period', async () => {
      useQuartersReport.mockImplementation(() => useQuartersReportResponse)
      setUp()

      await userEvent.click(getByRole(screen.getByTestId('period-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getAllByRole('option')[0]))

      expect(useQuartersReportResponse.setPeriod).toHaveBeenCalledWith('Q1')
    })
  })
})
