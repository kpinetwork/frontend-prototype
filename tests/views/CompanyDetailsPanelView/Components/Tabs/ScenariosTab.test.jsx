import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent, waitFor, getByRole } from '@testing-library/react'
import { ScenariosTab } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/ScenariosTab'
import useScenariosTable from '../../../../../src/hooks/useScenariosTable'
import { BASEMETRICS } from '../../../../../src/utils/constants/Metrics'

jest.mock('../../../../../src/hooks/useScenariosTable')

const metric = {
  scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
  scenario: 'Actuals',
  year: 2019,
  metric_id: '9cd20ace-79e1-426a-89ac-c8b92921a514',
  metric: 'Revenue',
  value: 124.844
}

const metrics = BASEMETRICS.map(metric => metric.name)

const hookResponse = {
  rowsPerPage: 10,
  isLoading: false,
  scenarios: [metric],
  total: 1,
  page: 0,
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn(),
  addScenario: () => true,
  deleteScenarios: jest.fn(),
  metricNames: metrics
}

const setUp = () => {
  render(<ScenariosTab/>)
}

describe('<ScenariosTab/>', () => {
  describe('render scenarios tab', () => {
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

  describe('add scenario', () => {
    it('click on add button should open form', () => {
      useScenariosTable.mockImplementation(() => hookResponse)
      setUp()
      const button = screen.getByRole('button', { name: 'Add Scenario' })

      fireEvent.click(button)

      expect(screen.getByText('Add scenario')).toBeInTheDocument()
    })

    it('click on cancel should close form', () => {
      useScenariosTable.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Scenario' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('click on save without valid data should display error', () => {
      useScenariosTable.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Scenario' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)
      const errorMessage = screen.getByText('Please fill in all the required fields')

      expect(errorMessage).toBeInTheDocument()
    })

    it('click on save with valid data successful', async () => {
      useScenariosTable.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Scenario' }))
      await userEvent.click(getByRole(screen.getByTestId('scenario-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Actuals' })))
      await userEvent.click(getByRole(screen.getByTestId('metric-name-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Revenue' })))
      fireEvent.click(screen.getByPlaceholderText('year'))
      fireEvent.click(screen.getByRole('button', { name: '2023' }))
      fireEvent.change(screen.getByPlaceholderText('metric value'), { target: { value: '123' } })
      await waitFor(() => fireEvent.click(screen.getByText('Save')))

      const errorMessage = screen.queryByText('Something went wrong, the scenario could not be added, please try again')

      expect(errorMessage).not.toBeInTheDocument()
    })

    it('click on save with valid data should display error', async () => {
      useScenariosTable.mockImplementation(() => ({ ...hookResponse, addScenario: () => false }))
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Scenario' }))
      await userEvent.click(getByRole(screen.getByTestId('scenario-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Actuals' })))
      await userEvent.click(getByRole(screen.getByTestId('metric-name-selector'), 'button'))
      await waitFor(() => userEvent.click(screen.getByRole('option', { name: 'Revenue' })))
      fireEvent.click(screen.getByPlaceholderText('year'))
      fireEvent.click(screen.getByRole('button', { name: '2023' }))
      fireEvent.change(screen.getByPlaceholderText('metric value'), { target: { value: '123' } })
      await waitFor(() => fireEvent.click(screen.getByText('Save')))

      const errorMessage = screen.getByText('Something went wrong, the scenario could not be added, please try again')

      expect(errorMessage).toBeInTheDocument()
    })
  })

  describe('delete scenarios', () => {
    it('click on delete should show select', async () => {
      useScenariosTable.mockImplementation(() => ({ ...hookResponse, addScenario: () => false }))
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Scenarios' }))

      const checkboxes = screen.getAllByRole('checkbox')
      const deleteButton = screen.getByText('Delete')
      const cancelButton = screen.getByText('Cancel')

      expect(checkboxes).toHaveLength(1)
      expect(deleteButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })

    it('click on checkbox and click on delete to open modal', async () => {
      useScenariosTable.mockImplementation(() => ({ ...hookResponse, addScenario: () => false }))
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Scenarios' }))

      const checkbox = screen.getByRole('checkbox', { name: '9cd20ace-79e1-426a-89ac-c8b92921a514' })
      fireEvent.click(checkbox)
      fireEvent.click(screen.getByText('Delete'))

      const modal = screen.getByRole('dialog')
      const scenarios = screen.getByText('Actuals-2019: Revenue $124.844')

      expect(modal).toBeInTheDocument()
      expect(scenarios).toBeInTheDocument()
    })

    it('open modal and click on ok', async () => {
      const metrics = [
        {
          scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Actuals',
          year: 2019,
          metric_id: '9cd20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Revenue',
          value: 124.844
        },
        {
          scenario_id: '04b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Budget',
          year: 2020,
          metric_id: '54d20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Ebitda',
          value: -908.4
        }
      ]
      useScenariosTable.mockImplementation(() => ({ ...hookResponse, scenarios: metrics }))
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Scenarios' }))
      const checkbox = screen.getAllByRole('checkbox')
      fireEvent.click(checkbox[0])
      fireEvent.click(checkbox[1])
      fireEvent.click(screen.getByText('Delete'))
      const modal = screen.getByRole('dialog')
      waitFor(() => {
        fireEvent.click(screen.getByText('Ok'))
      })

      expect(modal).not.toBeInTheDocument()
    })

    it('open modal and click on cancel', async () => {
      useScenariosTable.mockImplementation(() => ({ ...hookResponse, addScenario: () => false }))
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Scenarios' }))
      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)
      fireEvent.click(screen.getByText('Delete'))
      const modal = screen.getByRole('dialog')
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

      expect(checkbox).toBeInTheDocument()
      expect(modal).not.toBeInTheDocument()
    })

    it('click on checkbox and click on cancel', async () => {
      useScenariosTable.mockImplementation(() => ({ ...hookResponse }))
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Scenarios' }))
      const checkbox = screen.getByRole('checkbox', { name: '9cd20ace-79e1-426a-89ac-c8b92921a514' })
      fireEvent.click(checkbox)
      fireEvent.click(screen.getByText('Cancel'))

      expect(checkbox).not.toBeInTheDocument()
    })

    it('select multiple checkboxes', async () => {
      const metrics = [
        {
          scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Actuals',
          year: 2019,
          metric_id: '9cd20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Revenue',
          value: 124.844
        },
        {
          scenario_id: '04b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Budget',
          year: 2020,
          metric_id: '54d20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Ebitda',
          value: -908.4
        },
        {
          scenario_id: '04b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Budget',
          year: 2021,
          metric_id: '51d20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Ebitda',
          value: 30
        }
      ]
      useScenariosTable.mockImplementation(() => ({ ...hookResponse, scenarios: metrics }))
      setUp()
      fireEvent.click(screen.getByRole('button', { name: 'Delete Scenarios' }))

      const checkbox = screen.getAllByRole('checkbox')
      fireEvent.click(checkbox[0])
      fireEvent.click(checkbox[1])
      fireEvent.click(checkbox[1])
      fireEvent.click(checkbox[0])
      fireEvent.click(checkbox[2])

      expect(checkbox[0].checked).toBeFalsy()
      expect(checkbox[2].checked).toBeTruthy()
    })

    it('select multiple checkboxes and deselect', async () => {
      const metrics = [
        {
          scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Actuals',
          year: 2019,
          metric_id: '9cd20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Revenue',
          value: 124.844
        },
        {
          scenario_id: '04b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Budget',
          year: 2020,
          metric_id: '54d20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Ebitda',
          value: -908.4
        },
        {
          scenario_id: '04b8fc45-204c-450b-b4aa-525b35ad2323',
          scenario: 'Budget',
          year: 2021,
          metric_id: '51d20ace-79e1-426a-89ac-c8b92921a514',
          metric: 'Ebitda',
          value: 30
        }
      ]
      useScenariosTable.mockImplementation(() => ({ ...hookResponse, scenarios: metrics }))
      setUp()
      fireEvent.click(screen.getByRole('button', { name: 'Delete Scenarios' }))

      const checkbox = screen.getAllByRole('checkbox')
      fireEvent.click(checkbox[0])
      fireEvent.click(checkbox[1])
      fireEvent.click(checkbox[2])
      fireEvent.click(checkbox[1])

      expect(checkbox[1].checked).toBeFalsy()
      expect(checkbox[2].checked).toBeTruthy()
    })
  })
})
