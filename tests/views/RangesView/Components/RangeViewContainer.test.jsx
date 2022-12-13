import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor, getByRole } from '@testing-library/react'
import { RangeViewContainer } from '../../../../src/views/RangesView/Components/RangeViewContainer'
import useMetricRanges from '../../../../src/hooks/useMetricRanges'
import { DATA } from '../../../data/ranges'

jest.mock('../../../../src/hooks/useMetricRanges')

const MODIFY_RANGES_RESPONSE = {
  updated_response: { updated: true },
  fail_response: { error: "Can't update ranges" }
}

const hookResponse = {
  page: 0,
  total: DATA.total,
  metrics: ['Revenue', 'Ebitda'],
  pageSize: 10,
  isLoading: false,
  allMetricRanges: DATA.ranges,
  metricRanges: [{ id: '1', max_value: 20, min_value: 10 }],
  metricSelected: null,
  errors: [],
  setErrors: jest.fn(),
  setMetricRanges: jest.fn(),
  handleChangePage: jest.fn(),
  setMetricSelected: jest.fn(),
  handleChangePageSize: jest.fn(),
  getRangesBySpecificMetric: jest.fn(),
  setEditedRanges: jest.fn(),
  setRangesToDelete: jest.fn(),
  modifyRanges: () => MODIFY_RANGES_RESPONSE.updated_response,
  setIsLoading: jest.fn()
}

const setUp = () => {
  render(
      <RangeViewContainer />
  )
}

describe('<RangeViewContainer />', () => {
  describe('render', () => {
    it('Should render range container view', () => {
      useMetricRanges.mockImplementation(() => hookResponse)
      setUp()

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Modify' })).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should open card form when click on Modify button', async () => {
      useMetricRanges.mockImplementation(() => hookResponse)
      setUp()
      const modifyButton = screen.getByRole('button', { name: 'Modify' })

      await waitFor(() => fireEvent.click(modifyButton))

      expect(screen.getByTestId('metric-range-selector')).toBeInTheDocument()
      expect(modifyButton).not.toBeInTheDocument()
    })

    it('Should reset metric selected value when click on Close icon in card range form', async () => {
      useMetricRanges.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Modify' })))
      const metricSelector = screen.getByTestId('metric-range-selector')
      await waitFor(() => fireEvent.click(screen.getByTestId('close-button')))

      expect(metricSelector).not.toBeInTheDocument()
      expect(hookResponse.setMetricSelected).toHaveBeenCalledWith(null)
    })

    it('Should change metric selected value when select a metric in card range form', async () => {
      useMetricRanges.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Modify' })))
      const metricSelectorButton = getByRole(screen.getByTestId('metric-range-selector'), 'button')
      fireEvent.mouseDown(metricSelectorButton)
      fireEvent.click(screen.getByRole('option', { name: 'Revenue' }))

      expect(hookResponse.setMetricSelected).toHaveBeenCalledWith('Revenue')
    })

    it('Should save data when click on save in card range form', async () => {
      const response = { ...hookResponse, metricSelected: 'Revenue' }
      useMetricRanges.mockImplementation(() => response)
      setUp()
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Modify' })))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      await waitFor(() => { fireEvent.click(saveButton) })

      const message = await screen.getByText('Ranges modified successfully')

      waitFor(() => { expect(message).toBeInTheDocument() })
    })
    it('Should message dissapear when click on snackbar cancel after saving', async () => {
      const response = { ...hookResponse, metricSelected: 'Revenue' }
      useMetricRanges.mockImplementation(() => response)
      setUp()
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Modify' })))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      await waitFor(() => { fireEvent.click(saveButton) })

      const message = await screen.getByText('Ranges modified successfully')
      const closeMessage = screen.getByRole('button', { name: 'Close' })
      fireEvent.click(closeMessage)

      waitFor(() => { expect(message).not.toBeInTheDocument() })
    })
    it('Should show the error when click on save without valid data', async () => {
      const response = { ...hookResponse, metricSelected: 'Revenue', modifyRanges: () => MODIFY_RANGES_RESPONSE.fail_response }
      useMetricRanges.mockImplementation(() => response)
      setUp()
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Modify' })))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      await waitFor(() => { fireEvent.click(saveButton) })

      const message = await screen.getByText("Can't update ranges")

      waitFor(() => { expect(message).toBeInTheDocument() })
    })
  })
})
