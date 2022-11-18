import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MetricRangeFormTable } from '../../../../src/views/RangesView/Components/MetricRangeFormTable'

const defaultProps = {
  metric: 'Revenue',
  ranges: [{ id: '1', max_value: 10, min_value: null }, { id: '1', max_value: 20, min_value: 10 }, { id: '1', max_value: 20, min_value: 10 }, { id: '1', max_value: 30, min_value: 20 }, { id: '1', max_value: 40, min_value: 30 }, { id: '1', max_value: null, min_value: 40 }],
  isLoading: false,
  errors: [],
  rangesToDelete: [],
  editedRanges: [{ id: '1', max_value: 20, min_value: 10, defaultIndex: 1 }],
  setRanges: jest.fn(),
  setEditedRanges: jest.fn(),
  setRangesToDelete: jest.fn(),
  setErrors: jest.fn()
}
const removedItems = 2
const headCount = 1

const setUp = (props) => {
  render(
      <MetricRangeFormTable {...defaultProps} {...props}/>
  )
}

describe('<MetricRangeFormTable />', () => {
  describe('render', () => {
    it('Should render table with ranges when there is ranges data and metric is selected', () => {
      setUp()
      const rows = screen.getAllByRole('row')

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(rows).toHaveLength(defaultProps.ranges.length + headCount - removedItems)
    })

    it('Should render table with no data when there is are not ranges and metric is selected', () => {
      setUp({ ...defaultProps, ranges: [] })
      const rows = screen.getAllByRole('row')
      const message = screen.getByText('NO DATA')

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(message).toBeInTheDocument()
      expect(rows).toHaveLength(headCount + 1)
    })

    it('Should render progress bar when data is still loadind', () => {
      setUp({ ...defaultProps, isLoading: true })
      const progressBar = screen.getByRole('progressbar')

      expect(progressBar).toBeInTheDocument()
    })

    it('Should render error validation alert when there are errors', () => {
      const errors = [
        { row: 0, type: 'rangeError', errorMessage: 'error' },
        { row: 1, type: 'limitError', errorMessage: 'error' }
      ]
      setUp({ ...defaultProps, errors: errors })

      const alert = screen.getByText('Validation Error')

      expect(alert).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should add row when click on add icon and there are ranges', () => {
      setUp()
      const addButton = screen.getAllByTestId('add-button')

      fireEvent.click(addButton[2])

      const inputCells = screen.getAllByRole('spinbutton')
      const cell = inputCells.filter(elem => elem.value === '')[3]

      waitFor(() => {
        fireEvent.change(cell, { target: { value: '' } })
      })

      expect(defaultProps.setRanges).toHaveBeenCalled()
    })

    it('Should add row when click on add icon and there are not ranges', () => {
      setUp({ ...defaultProps, ranges: [] })
      const addButton = screen.getByTestId('add-button')

      fireEvent.click(addButton)

      expect(defaultProps.setRanges).toHaveBeenCalled()
    })

    it('Should remove row when click on remove icon and there are ranges', () => {
      setUp()
      const removeButton = screen.getAllByTestId('remove-button')

      fireEvent.click(removeButton[0])

      expect(defaultProps.setRanges).toHaveBeenCalled()
      expect(defaultProps.setEditedRanges).toHaveBeenCalled()
    })

    it('Should change textfield value when edit min value cell', () => {
      setUp()
      const inputCells = screen.getAllByRole('spinbutton')
      const cell = inputCells.filter(elem => elem.value === '20')[0]

      fireEvent.change(cell, { target: { value: '' } })

      expect(cell.value).toBe('20')
      expect(defaultProps.setEditedRanges).toHaveBeenCalled()
    })

    it('Should edit range already edited when any value is re edited', () => {
      defaultProps.editedRanges = []
      setUp()
      const inputCells = screen.getAllByRole('spinbutton')
      const cell = inputCells.filter(elem => elem.value === '30')[0]

      fireEvent.change(cell, { target: { value: '' } })

      expect(cell.value).toBe('30')
      expect(defaultProps.setEditedRanges).toHaveBeenCalled()
    })

    it('Should change textfield value when edit max value cell', () => {
      render(<MetricRangeFormTable {...defaultProps}/>)
      const inputCells = screen.getAllByRole('spinbutton')

      const cell = inputCells.filter(elem => elem.value === '30')[0]

      waitFor(() => {
        fireEvent.change(cell, { target: { value: '' } })
      })

      waitFor(() => {
        expect(cell.value).toBe('30')
        expect(defaultProps.setEditedRanges).toHaveBeenCalled()
      })
    })
  })
})
