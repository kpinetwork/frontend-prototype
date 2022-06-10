import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ReportRuleGraph } from '../../../../src/views/CompanyView/Components/ReportRuleGraph'

jest.mock('@components/BubbleChart', () => ({
  BubbleChart: () => {
    const MockBubbleChart = 'bubble-chart-mock'
    return <MockBubbleChart data-testid='bubble-chart-mock' />
  }
}))

const defaultProps = {
  ruleOf40: [
    {
      company_id: '1',
      name: 'Sample Company',
      revenue_growth_rate: 5,
      ebitda_margin: 13,
      revenue: 12
    }
  ]
}

const setUp = (props) => {
  render(<ReportRuleGraph {...defaultProps} {...props}/>)
}

describe('<ReportRuleGraph />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Rule of 40')).toBeInTheDocument()
    expect(screen.getByTestId('description-card')).toBeInTheDocument()
    expect(screen.getByTestId('bubble-chart-mock')).toBeInTheDocument()
  })

  it('render without crashing when ruleOf40 is null', () => {
    setUp({ ruleOf40: null })

    expect(screen.getByText('Rule of 40')).toBeInTheDocument()
    expect(screen.getByTestId('description-card')).toBeInTheDocument()
    expect(screen.getByTestId('bubble-chart-mock')).toBeInTheDocument()
  })
})
