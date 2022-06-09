import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Size } from '../../../src/components/Filter/Size'
import { SIZE } from '../../data/filters'

const defaultProps = {
  setFilters: jest.fn(),
  fillFilters: false,
  selectedList: '<$10 million'
}

const setUp = (props) => {
  render(<Size {...defaultProps} {...props}/>)
}

describe('<Size />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Size')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(7)
    expect(screen.getByRole('checkbox', { name: '<$10 million' }).checked).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: '$100 million+' }).checked).toBeFalsy()
  })

  it('render correctly when selectedList is empty', () => {
    setUp({ selectedList: '' })

    expect(screen.getByRole('checkbox', { name: '<$10 million' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: '$100 million+' }).checked).toBeFalsy()
  })

  it('click on option checkbox', () => {
    setUp({ selectedList: '' })

    const sectorFilter = screen.getByRole('checkbox', { name: '$100 million+' })
    fireEvent.click(sectorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(sectorFilter.checked).toBeTruthy()
  })

  it('click on option checkbox to get unchecked', () => {
    setUp()

    const sectorFilter = screen.getByRole('checkbox', { name: '<$10 million' })
    fireEvent.click(sectorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(sectorFilter.checked).toBeFalsy()
  })

  it('click on all checkbox when all options are selected', () => {
    setUp({ selectedList: '' })
    SIZE.map((option) => fireEvent.click(screen.getByRole('checkbox', { name: option })))

    const AllFilter = screen.getByRole('checkbox', { name: 'All' })
    fireEvent.click(AllFilter)
    const selectAllFilter = screen.getByRole('checkbox', { name: 'Select All' })
    fireEvent.click(selectAllFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(selectAllFilter.checked).toBeFalsy()
  })

  it('click on all checkbox when no options are selected', () => {
    setUp({ selectedList: '' })

    const selectAllFilter = screen.getByRole('checkbox', { name: 'Select All' })
    fireEvent.click(selectAllFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(selectAllFilter.checked).toBeTruthy()
  })
})
