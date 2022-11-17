import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { MetricRangeForm } from '../../../../src/views/RangesView/Components/MetricRangeForm'

const defaultProps = {
  onCancel: jest.fn(),
  onChange: jest.fn(),
  onSave: jest.fn(),
  metrics: ['Revenue', 'Ebitda'],
  metric: null,
  ranges: [{ id: '1', max_value: 20, min_value: 10 }],
  editedRanges: [{ id: '1', max_value: 20, min_value: 10, defaultIndex: 1 }]
}

const setUp = (props) => {
  render(
      <MetricRangeForm {...defaultProps} {...props}/>
  )
}

describe('<MetricRangeForm />', () => {
  describe('render', () => {
    it('Should render only metric selector when there is no metric selected', () => {
      setUp()

      const closeButton = screen.getByTestId('close-button')
      const metricSelector = screen.getByTestId('metric-range-selector')

      expect(closeButton).toBeInTheDocument()
      expect(metricSelector).toBeInTheDocument()
    })

    it('Should render action buttons when a metric is selected', () => {
      setUp({ metric: 'Revenue' })

      const saveButton = screen.getByRole('button', { name: 'Save' })
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      const metricSelector = screen.getByRole('button', { name: 'Revenue' })

      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
      expect(metricSelector).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should call onChange function when metric selection change', async () => {
      setUp({ metric: 'Revenue' })

      fireEvent.mouseDown(screen.getByRole('button', { name: 'Revenue' }))
      fireEvent.click(screen.getByRole('option', { name: 'Ebitda' }))

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('Should call onCancel function when click on close card icon', async () => {
      setUp()
      const closeButton = screen.getByTestId('close-button')

      fireEvent.click(closeButton)

      expect(defaultProps.onCancel).toHaveBeenCalled()
    })

    it('Should call onSave function when metric is already selected and click on Save', async () => {
      setUp({ metric: 'Ebitda' })
      const saveButton = screen.getByRole('button', { name: 'Save' })

      fireEvent.click(saveButton)

      expect(defaultProps.onSave).toHaveBeenCalled()
    })
  })
})
