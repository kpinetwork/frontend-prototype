import React from 'react'
import { render } from '@testing-library/react'
import { InvestmentYearSelector } from '../../src/components/InvestmentYearSelector'

const defaultProps = {
  nameOfSelect: 'Investment Year',
  year: '',
  onChange: jest.fn()
}

describe('<InvestmentYearSelector />', () => {
  it('renders without crashing', () => {
    render(<InvestmentYearSelector {...defaultProps} />)
  })
}
)
