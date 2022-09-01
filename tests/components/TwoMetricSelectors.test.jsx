import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TwoMetricSelector } from '../../src/components/TwoMetricSelectors'

const defaultProps = {
  firstMetric: 'actuals_revenue',
  secondMetric: 'None',
  onMetricChange: jest.fn()
}

const actualsEbitda = 'Ebitda - actual'

describe('<TwoMetricSelectors />', () => {
  it('renders component', () => {
    render(<TwoMetricSelector {...defaultProps}/>)
  })

  it('should call change function when select another option for first metric', async () => {
    render(<TwoMetricSelector {...defaultProps}/>)
    const secondMetricSelect = screen.getByRole('button', { name: 'Revenue - actual' })

    fireEvent.mouseDown(secondMetricSelect)
    fireEvent.click(screen.getByRole('option', { name: actualsEbitda }))

    expect(defaultProps.onMetricChange).toBeCalledWith('actuals_ebitda', 'first')
  })

  it('should call change function when select another option for second metric', async () => {
    render(<TwoMetricSelector {...defaultProps}/>)
    const secondMetricSelect = screen.getByRole('button', { name: 'None' })

    fireEvent.mouseDown(secondMetricSelect)
    fireEvent.click(screen.getByRole('option', { name: actualsEbitda }))

    expect(defaultProps.onMetricChange).toBeCalledWith('actuals_ebitda', 'second')
  })
})
