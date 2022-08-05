import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { RevenueAndEbitdaCard } from '../../../../../src/views/UniverseView/Components/Cards/RevenueAndEbitdaCard'
import { REVENUE_AND_EBITDA } from '../../../../data/universeOverview'

const defaultProps = {
  revenueAndEbitda: REVENUE_AND_EBITDA,
  isLoading: false
}

const setUp = (props) => {
  render(<RevenueAndEbitdaCard {...defaultProps} {...props}/>)
}

describe('<RevenueAndEbitdaCard />', () => {
  it('render correctly', () => {
    setUp()

    const cardTitle = screen.getByText('Revenue & ebitda vs budget')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Size')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('Ebitda')).toBeInTheDocument()
  })

  it('render cardKPI if is loading is true', () => {
    setUp({ isLoading: true })

    const cardTitle = screen.getByText('Revenue & ebitda vs budget')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('render empty grid if countBySize is empty', () => {
    setUp({ revenueAndEbitda: null })

    const cardTitle = screen.getByText('Revenue & ebitda vs budget')
    const message = screen.getByText('No rows')

    expect(cardTitle).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
