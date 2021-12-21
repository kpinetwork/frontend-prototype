import React from 'react'
import { CompanyCard } from './CompanyCard'
import renderer from 'react-test-renderer'

describe('Company Card', () => {
  it('render correctly', () => {
    const tree = renderer.create(<CompanyCard />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('send data fake to component', () => {
    const tree = renderer.create(<CompanyCard financialProfile={{
      annual_revenue: '$1,000,000',
      annual_ebitda: '$1,000,000',
      anual_rule_of_40: '$1,000,000',
      current_revenue_growth: '$1,000,000',
      current_ebitda_margin: '$1,000,000',
      current_rule_of_40: '$1,000,000'
    }} isLoading={false} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
