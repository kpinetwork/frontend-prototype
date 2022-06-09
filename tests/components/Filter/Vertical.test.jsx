import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Vertical } from '../../../src/components/Filter/Vertical'
import { VERTICAL } from '../../data/filters'

const defaultProps = {
  setFilters: jest.fn(),
  fillFilters: false,
  selectedList: 'Education'
}

const setUp = (props) => {
  render(<Vertical {...defaultProps} {...props}/>)
}

describe('<Vertical />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Vertical')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(33)
    expect(screen.getByRole('checkbox', { name: 'Education' }).checked).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: 'Ecommerce' }).checked).toBeFalsy()
  })

  it('render correctly when selectedList is empty', () => {
    setUp({ selectedList: '' })

    expect(screen.getByRole('checkbox', { name: 'Education' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Ecommerce' }).checked).toBeFalsy()
  })

  it('click on option checkbox', () => {
    setUp({ selectedList: '' })

    const sectorFilter = screen.getByRole('checkbox', { name: 'Education' })
    fireEvent.click(sectorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(sectorFilter.checked).toBeTruthy()
  })

  it('click on option checkbox to get unchecked', () => {
    setUp()

    const sectorFilter = screen.getByRole('checkbox', { name: 'Education' })
    fireEvent.click(sectorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(sectorFilter.checked).toBeFalsy()
  })

  it('click on all checkbox when all options are selected', () => {
    setUp({ selectedList: '' })
    VERTICAL.map((option) => fireEvent.click(screen.getByRole('checkbox', { name: option })))

    const AllFilter = screen.getByRole('checkbox', { name: 'All' })
    fireEvent.click(AllFilter)
    const selectAllFilter = screen.getByRole('checkbox', { name: 'Select All' })
    fireEvent.click(selectAllFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
  })

  it('click on all checkbox when no options are selected', () => {
    setUp({ selectedList: '' })

    const selectAllFilter = screen.getByRole('checkbox', { name: 'Select All' })
    fireEvent.click(selectAllFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(selectAllFilter.checked).toBeTruthy()
  })
})
