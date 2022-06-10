import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Sectors } from '../../../src/components/Filter/Sectors'
import { SECTORS } from '../../data/filters'

const defaultProps = {
  setFilters: jest.fn(),
  fillFilters: false,
  selectedList: 'Application Software'
}

const setUp = (props) => {
  render(<Sectors {...defaultProps} {...props}/>)
}

describe('<Investor />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Sectors')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(2 + SECTORS.length)
    expect(screen.getByRole('checkbox', { name: 'Application Software' }).checked).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: 'Communication Equipment' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Computer Hardware' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Online Media' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Semiconductors' }).checked).toBeFalsy()
  })

  it('render correctly when selectedList is empty', () => {
    setUp({ selectedList: '' })

    expect(screen.getByRole('checkbox', { name: 'Application Software' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Communication Equipment' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Computer Hardware' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Online Media' }).checked).toBeFalsy()
    expect(screen.getByRole('checkbox', { name: 'Semiconductors' }).checked).toBeFalsy()
  })

  it('click on option checkbox', () => {
    setUp({ selectedList: '' })

    const SectorFilter = screen.getByRole('checkbox', { name: 'Application Software' })
    fireEvent.click(SectorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(SectorFilter.checked).toBeTruthy()
  })

  it('click on option checkbox to get unchecked', () => {
    setUp()

    const SectorFilter = screen.getByRole('checkbox', { name: 'Application Software' })
    fireEvent.click(SectorFilter)

    expect(defaultProps.setFilters).toHaveBeenCalled()
    expect(SectorFilter.checked).toBeFalsy()
  })

  it('click on all checkbox when all options are selected', () => {
    setUp({ selectedList: '' })
    SECTORS.map((option) => fireEvent.click(screen.getByRole('checkbox', { name: option })))

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
