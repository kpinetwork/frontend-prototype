import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { CompanyCard } from '../../../../src/views/CompanyView/Components/CompanyCard'

const defaultProps = {
  financialProfile: {
    annual_revenue: '100',
    annual_ebitda: '100',
    anual_rule_of_40: '100',
    forward_revenue_growth: '100',
    forward_ebitda_growth: '100',
    forward_rule_of_40: 'NA'
  },
  isLoading: false
}

const setUp = (props) => {
  render(<CompanyCard {...defaultProps} {...props}/>)
}

describe('<CompanyCard />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Company financial profile')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(6)
  })

  it('render correctly when loading is true', () => {
    setUp({ isLoading: true })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('render correctly when there is no financialProfile', () => {
    render(<CompanyCard/>)

    expect(screen.getByText('Company financial profile')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.queryByRole('row')).not.toBeInTheDocument()
  })
})
