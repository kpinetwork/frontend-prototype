import React from 'react'
import { render } from '@testing-library/react'
import { MetricSelector } from '../../src/components/MetricSelector'

const defaultProps = {
  nameOfSelect: 'Metric',
  year: '',
  onChange: jest.fn()
}

describe('<MetricSelector />', () => {
  it('renders without crashing', () => {
    render(<MetricSelector {...defaultProps} />)
  })
}
)
