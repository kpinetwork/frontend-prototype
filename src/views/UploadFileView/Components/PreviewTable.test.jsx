import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import PreviewTable from './PreviewTable'

const defautlProps = {
  head: [
    ['col1, col2, col3'],
    ['col12, col22, col33']
  ],
  body: [
    ['row1', 'row2', 'row3'],
    ['row12', 'row22', 'row32']
  ]
}
const setUp = (props) => {
  render(<PreviewTable {...defautlProps} {...props} />)
}

describe('<PreviewTable />', () => {
  describe('renders', () => {
    it('Should render preview table', () => {
      setUp()
      const table = screen.getByRole('table')
      const row = screen.getAllByRole('row')
      const cell = screen.getAllByRole('cell')

      expect(table).toBeInTheDocument()
      expect(row).toHaveLength(4)
      expect(cell).toHaveLength(6)
    })
  })
})
