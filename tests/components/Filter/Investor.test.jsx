import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Investor } from '../../../src/components/Filter/Investor'
import { INVESTORS } from '../../data/filters'

const defaultProps = {
  setFilters: jest.fn(),
  fillFilters: false,
  selectedList: 'Family office'
}

const setUp = (props) => {
  render(<Investor {...defaultProps} {...props}/>)
}

describe('<Investor />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Investor Profile')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(2 + INVESTORS.length)
    expect(screen.getByRole('checkbox', { name: 'Family office' }).checked).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: 'Founder backend' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Early stage VC' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Growth stage VC' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Private equity' }).checked).toBeFalsy()
  })

  it('render correctly when selectedList is empty', () => {
    setUp({ selectedList: '' })

    expect(screen.getByRole('checkbox', { name: 'Family office' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Founder backend' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Early stage VC' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Growth stage VC' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Private equity' }).checked).toBeFalsy()
  })

  it('click on option checkbox', () => {
    setUp({ selectedList: '' })

    const InvestorFilter = screen.getByRole('checkbox', { name: 'Family office' })
    fireEvent.click(InvestorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(InvestorFilter.checked).toBeTruthy()
  })

  it('click on option checkbox to get unchecked', () => {
    setUp()

    const InvestorFilter = screen.getByRole('checkbox', { name: 'Family office' })
    fireEvent.click(InvestorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(InvestorFilter.checked).toBeFalsy()
  })

  it('click on all checkbox when all options are selected', () => {
    setUp({ selectedList: '' })
    INVESTORS.map((option) => fireEvent.click(screen.getByRole('checkbox', { name: option })))

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
