import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Tag } from '../../../src/components/Filter/Tag'
import useTag from '../../../src/hooks/useTag'

jest.mock('../../../src/hooks/useTag')

const hookResponse = {
  tags: [
    { id: '123', name: 'Tag Sample 1' },
    { id: '122', name: 'Tag Sample 2' }
  ]
}

const defaultProps = {
  setFilters: jest.fn()
}

const setUp = (props) => {
  render(<Tag {...defaultProps} {...props}/>)
}

describe('<Tag />', () => {
  it('Should render Tag component ', () => {
    useTag.mockImplementation(() => hookResponse)
    setUp()

    const combobox = screen.getByRole('combobox')

    expect(combobox).toBeInTheDocument()
  })

  it('Should add tags when click on a tag option in autocomplete ', () => {
    useTag.mockImplementation(() => hookResponse)
    setUp()

    fireEvent.click(screen.getByTestId('ArrowDropDownIcon'))
    fireEvent.click(screen.getByText('Tag Sample 1'))

    expect(screen.getByText('Tag Sample 1')).toBeInTheDocument()
  })
})
