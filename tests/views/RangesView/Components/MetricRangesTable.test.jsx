import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { MetricRangesTable } from '../../../../src/views/RangesView/Components/MetricRangesTable'
import { DATA } from '../../../data/ranges'

const defaultProps = {
  page: 0,
  total: DATA.total,
  ranges: DATA.ranges,
  isLoading: false,
  rowsPerPage: 10,
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn()
}

const setUp = (props) => {
  render(
      <MetricRangesTable {...defaultProps} {...props}/>
  )
}

describe('<MetricRangesTable />', () => {
  describe('render', () => {
    it('Should render loading progress bar when data is loading', () => {
      setUp({ isLoading: true })

      const loadingPorgressBar = screen.getByTestId('loading-progress')

      expect(loadingPorgressBar).toBeInTheDocument()
    })

    it('Should render table when data is already loaded', () => {
      setUp()

      const dataTable = screen.getByRole('table')

      expect(dataTable).toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('Should call handleChangePage function when call next page', async () => {
      setUp({ total: 20 })
      const nextPageButton = screen.getByRole('button', { name: 'Next page' })

      fireEvent.click(nextPageButton)

      expect(defaultProps.handleChangePage).toHaveBeenCalled()
    })

    it('Should call handleChangeRowsPerPage function when select different rows per page', async () => {
      setUp()
      const pageSizeButton = screen.getByRole('button', { name: 'Rows per page: 10' })

      fireEvent.mouseDown(pageSizeButton)
      fireEvent.click(screen.getByRole('option', { name: '50' }))

      expect(defaultProps.handleChangeRowsPerPage).toHaveBeenCalled()
    })
  })
})
