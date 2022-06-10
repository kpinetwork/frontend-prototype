import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Growth } from '../../../src/components/Filter/Growth'
import { GROWTH } from '../../data/filters'

const defaultProps = {
  setFilters: jest.fn(),
  fillFilters: false,
  selectedList: 'Medium growth (10%-<30%)'
}

const setUp = (props) => {
  render(<Growth {...defaultProps} {...props}/>)
}

describe('<Growth />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Growth Profile')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(7)
    expect(screen.getByRole('checkbox', { name: 'Medium (10%-<30%)' }).checked).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: 'Low (0-<10%)' }).checked).toBeFalsy()
  })

  it('render correctly when selectedList is empty', () => {
    setUp({ selectedList: '' })

    expect(screen.getByRole('checkbox', { name: 'Medium (10%-<30%)' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Low (0-<10%)' }).checked).toBeFalsy()
  })

  it('click on option checkbox', () => {
    setUp({ selectedList: '' })

    const growthFilter = screen.getByRole('checkbox', { name: 'Medium (10%-<30%)' })
    fireEvent.click(growthFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(growthFilter.checked).toBeTruthy()
  })

  it('click on option checkbox to get unchecked', () => {
    setUp()

    const growthFilter = screen.getByRole('checkbox', { name: 'Medium (10%-<30%)' })
    fireEvent.click(growthFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(growthFilter.checked).toBeFalsy()
  })

  it('click on all checkbox when all options are selected', () => {
    setUp({ selectedList: '' })
    GROWTH.map((option) => fireEvent.click(screen.getByRole('checkbox', { name: option })))

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
