import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { CardKPI } from '../../../src/components/Card/CardKPI'

const defaultProps = {
  title: 'Peer Group Analysis',
  actions: true,
  height: '80vh',
  fullScreen: true
}
const setUp = (props) => {
  render(<CardKPI {...props} {...defaultProps}/>)
}

describe('<CustomTooltipTitle />', () => {
  it('render', async () => {
    setUp()

    expect(screen.getByText('Peer Group Analysis')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })
})
