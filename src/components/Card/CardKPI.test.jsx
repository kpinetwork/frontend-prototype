import React from 'react'
import renderer from 'react-test-renderer'
import { CardKPI } from './CardKPI'

describe('Card KPI test', () => {
  it('render correctly', () => {
    const tree = renderer.create(<CardKPI />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render correctly with children', () => {
    const tree = renderer.create(<CardKPI>
      <div>
        <p>test</p>
      </div>
    </CardKPI>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render correctly with title', () => {
    const tree = renderer.create(<CardKPI title='test' />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render correctly with actions', () => {
    const tree = renderer.create(<CardKPI actions={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render correctly with overflow', () => {
    const tree = renderer.create(<CardKPI overflow />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render correctly with textAlign', () => {
    const tree = renderer.create(<CardKPI textAlign='center' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
