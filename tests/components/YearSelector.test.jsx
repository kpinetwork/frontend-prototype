import React from 'react'
import { render } from '@testing-library/react'
import { YearSelector } from '../../src/components/YearSelector'

const defaultProps = {
  nameofSelect: 'Calendar Year',
  year: '',
  onChange: jest.fn()
}

describe('<YearSelector />', () => {
  it('renders without crashing', () => {
    render(<YearSelector {...defaultProps} />)
  })
})
