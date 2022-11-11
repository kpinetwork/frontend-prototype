import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { MetricRangeFormTable } from '../../../../src/views/RangesView/Components/MetricRangeFormTable'

const defaultProps = {
  metric: 'Revenue',
  ranges: [{ id: '1', max_value: 20, min_value: 10 }, { id: '1', max_value: 30, min_value: 20 }, { id: '1', max_value: 40, min_value: 30 }],
  setRanges: jest.fn(),
  isLoading: false
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
      expect(rows).toHaveLength(defaultProps.ranges.length + headCount - removedItems)
    })

    it('Should render progress bar when data is still loadind', () => {
      setUp({ ...defaultProps, isLoading: true })
      const progressBar = screen.getByRole('progressbar')

      expect(progressBar).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should add row when click on add icon and there are ranges', () => {
      setUp()
      const addButton = screen.getByTestId('add-button')

      fireEvent.click(addButton)

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
      screen.debug()
      const addButton = screen.getByTestId('remove-button')

      fireEvent.click(addButton)

      expect(defaultProps.setRanges).toHaveBeenCalled()
    })
  })
})
