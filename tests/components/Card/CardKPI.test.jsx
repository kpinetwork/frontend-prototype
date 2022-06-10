import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { CardKPI } from '../../../src/components/Card/CardKPI'
import { useMediaQuery } from '@material-ui/core'

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  useMediaQuery: jest.fn().mockReturnValue(false)
}))

const defaultProps = {
  title: 'Peer Group Analysis'
}
const setUp = (props) => {
  render(<CardKPI {...props} {...defaultProps}/>)
}

describe('<CustomTooltipTitle />', () => {
  it('render correctly', () => {
    setUp()

    expect(screen.getByText('Peer Group Analysis')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })

  it('render when is mobile', () => {
    useMediaQuery.mockReturnValue(true)
    setUp({ fullScreen: false })

    expect(screen.getByText('Peer Group Analysis')).toBeInTheDocument()
    expect(screen.getByTestId('description-card')).toHaveStyle('height: 40vh')
  })
})
