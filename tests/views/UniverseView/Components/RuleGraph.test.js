import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { RuleGraph } from '../../../../src/views/UniverseView/Components/RuleGraph'

jest.mock('@components/BubbleChart', () => ({
  BubbleChart: () => {
    const MockBubbleChart = 'bubble-chart-mock'
    return <MockBubbleChart data-testid='bubble-chart-mock' />
  }
}))

const defaultProps = {
  ruleof40: [{
    revenue_growth_rate: 14,
    ebitda_margin: 3,
    revenue: -9,
    company_id: '1',
    name: 'Sample Company'
  }]
}

const setUp = (props) => {
  render(<RuleGraph {...defaultProps} {...props}/>)
}

describe('<RuleGraph />', () => {
  it('render correctly', () => {
    setUp()

    const cardTitle = screen.getByText('Rule of 40')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByTestId('bubble-chart-mock')).toBeInTheDocument()
  })
})
