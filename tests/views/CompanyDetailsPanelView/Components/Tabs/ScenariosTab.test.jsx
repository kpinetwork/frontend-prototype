import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ScenariosTab } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/ScenariosTab'
import useScenariosTable from '../../../../../src/hooks/useScenariosTable'

jest.mock('../../../../../src/hooks/useScenariosTable')

const metric = {
  scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
  scenario: 'Actuals',
  year: 2019,
  metric_id: '9cd20ace-79e1-426a-89ac-c8b92921a514',
  metric: 'Revenue',
  value: 124.844
}

const hookResponse = {
  rowsPerPage: 10,
  isLoading: false,
  scenarios: [metric],
  total: 1,
  page: 0,
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn()
}

const setUp = () => {
  render(<ScenariosTab/>)
}

describe('<ScenariosTab/>', () => {
  it('should render table with scanerios data', () => {
    useScenariosTable.mockImplementation(() => hookResponse)
    setUp()
    const cellScenario = screen.getByText('Actuals')
    const cellMetric = screen.getByText('Revenue')
    const cellValue = screen.getByText('$ 124.844')

    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
    expect(screen.getAllByRole('cell')).toHaveLength(5)
    expect(cellScenario).toBeInTheDocument()
    expect(cellMetric).toBeInTheDocument()
    expect(cellValue).toBeInTheDocument()
  })

  it('should render table with scanerios data when metric is not numeric', () => {
    useScenariosTable.mockImplementation(() => ({ ...hookResponse, scenarios: [{ ...metric, value: 'NA' }] }))
    setUp()
    const nanValue = screen.getByText('NA')

    expect(nanValue).toBeInTheDocument()
  })

  it('should render table with scanerios data when metric is not a base metric', () => {
    useScenariosTable.mockImplementation(() => ({ ...hookResponse, scenarios: [{ ...metric, metric: 'Variable' }] }))
    setUp()

    const metricValue = screen.getByText('124.844')

    expect(metricValue).toBeInTheDocument()
  })

  it('should render table with scanerios data when metric has no symbol', () => {
    useScenariosTable.mockImplementation(() => ({ ...hookResponse, scenarios: [{ ...metric, metric: 'Rule of 40' }] }))
    setUp()

    const metricValue = screen.getByText('124.844')

    expect(metricValue).toBeInTheDocument()
  })

  it('should render table with scanerios data when scenario has imcomplete data', () => {
    useScenariosTable.mockImplementation(() => ({ ...hookResponse, scenarios: [{ metric_id: '1', scenario: 'Actuals' }] }))
    setUp()
    const nanCells = screen.getAllByText('NA')

    expect(nanCells).toHaveLength(3)
  })

  it('should render loading progress when is loading', () => {
    useScenariosTable.mockImplementation(() => ({ ...hookResponse, isLoading: true }))
    setUp()
    const progressBar = screen.getByRole('progressbar')

    expect(progressBar).toBeInTheDocument()
  })
})
