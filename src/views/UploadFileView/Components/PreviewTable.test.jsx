import React from 'react'
import PreviewTable from './PreviewTable'
import renderer from 'react-test-renderer'

describe('Preview table', () => {
  it('render correctly', () => {
    const tree = renderer.create(<PreviewTable head={[]} body={[]}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('send data to component', () => {
    const tree = renderer.create(<PreviewTable head={
        [['col1, col2, col3'],
          ['col1, col2, col3']]}
        body={[['row1', 'row2', 'row3'], ['row1', 'row2', 'row3']]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
