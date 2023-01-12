import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TwoMetricSelector } from '../../src/components/TwoMetricSelectors'

const defaultProps = {
  firstMetric: 'actuals_revenue',
  secondMetric: 'None',
  onMetricChange: jest.fn(),
  onFirstMetricChange: jest.fn(),
  onSecondMetricChange: jest.fn()
}

const actualsEbitda = 'Ebitda - actual'

describe('<TwoMetricSelectors />', () => {
  it('renders component', () => {
    render(<TwoMetricSelector {...defaultProps}/>)
  })

  it('should call change function when select another option for first metric', async () => {
    render(<TwoMetricSelector {...defaultProps}/>)
    const secondMetricSelect = screen.getAllByRole('combobox')

    fireEvent.mouseDown(secondMetricSelect[1])
    fireEvent.click(screen.getByRole('option', { name: actualsEbitda }))

    expect(defaultProps.onSecondMetricChange).toHaveBeenCalled()
  })

  it('should call change function when select another option for second metric', async () => {
    render(<TwoMetricSelector {...defaultProps}/>)
    const secondMetricSelect = screen.getAllByRole('combobox')

    fireEvent.mouseDown(secondMetricSelect[1])
    fireEvent.click(screen.getByRole('option', { name: actualsEbitda }))

    expect(defaultProps.onSecondMetricChange).toHaveBeenCalled()
  })
})
