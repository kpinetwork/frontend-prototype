import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterSelectors } from '../../../../../src/views/EditModify/Components/Filters/Selectors'

const defaultProps = {
  companies: ['Company A', 'Company B'],
  filters: {
    names: ['Company A'],
    sectors: ['Application Software'],
    verticals: ['Accounting & Auditing'],
    investor_profiles: ['Early stage VC'],
    scenarios: ['Actuals', 'Budget']
  },
  setFilters: jest.fn()
}

const setUp = (props) => {
  render(<FilterSelectors {...defaultProps} {...props}/>)
}

describe('<FiltersSelectors />', () => {
  it('should render component', () => {
    setUp({})

    const filterContainer = screen.getByTestId('filters-edit-modify')

    expect(filterContainer).toBeInTheDocument()
  })

  it('should change auto complete company names values when clear values', () => {
    setUp({})
    const combo = screen.getByRole('combobox')

    fireEvent.click(combo)
    const clear = screen.getByTestId('CloseIcon')
    fireEvent.click(clear)

    expect(combo.textContent).toBe('')
  })

  it('should change select investor profile values', () => {
    setUp({})
    const profile = 'Growth stage VC'
    const button = screen.getByRole('button', { name: 'Early stage VC' })

    fireEvent.mouseDown(button)
    fireEvent.click(screen.getAllByRole('option')[1])

    expect(button.textContent).toBe(`${defaultProps.filters.investor_profiles[0]}, ${profile}`)
  })

  it('should change select scenarios values when deselect active option', () => {
    setUp({})
    const button = screen.getByRole('button', { name: 'Actuals, Budget' })

    fireEvent.mouseDown(button)
    fireEvent.click(screen.getAllByRole('option')[0])

    expect(button.textContent).toBe('Budget')
  })

  it('should call setFilters when reset', () => {
    const filters = JSON.parse(JSON.stringify(defaultProps))
    setUp(filters)
    const resetButton = screen.getByRole('button', { name: 'Reset filters' })

    fireEvent.click(resetButton)

    expect(defaultProps.setFilters).toBeCalled()
  })

  it('should not call setFilters when reset and original filters do not have options', () => {
    const filters = { names: [], sectors: [], verticals: [], scenarios: [], investor_profiles: [] }
    const props = { companies: defaultProps.companies, filters }
    setUp(props)
    const resetButton = screen.getByRole('button', { name: 'Reset filters' })

    fireEvent.click(resetButton)

    expect(defaultProps.setFilters).not.toBeCalled()
  })

  it('should call setFilters when click on apply', () => {
    setUp({})
    const resetButton = screen.getByRole('button', { name: 'Apply filters' })

    fireEvent.click(resetButton)

    expect(defaultProps.setFilters).toBeCalled()
  })
})
