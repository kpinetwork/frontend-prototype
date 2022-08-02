import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { GrowthAndMarginCard } from '../../../../../src/views/UniverseView/Components/Cards/GrowthAndMarginCard'
import { GROWTH_AND_MARGIN } from '../../../../data/universeOverview'

const defaultProps = {
  growthAndMargin: GROWTH_AND_MARGIN,
  isLoading: false
}

const setUp = (props) => {
  render(<GrowthAndMarginCard {...defaultProps} {...props}/>)
}

describe('<GrowthAndMarginCard />', () => {
  it('render correctly', () => {
    setUp()

    const cardTitle = screen.getByText('Growth and margin by size; recent actuals')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Size')).toBeInTheDocument()
    expect(screen.getByText('Growth')).toBeInTheDocument()
    expect(screen.getByText('Margin')).toBeInTheDocument()
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('render cardKPI if is loading is true', () => {
    setUp({ isLoading: true })

    const cardTitle = screen.getByText('Growth and margin by size; recent actuals')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('render empty grid if countBySize is empty', () => {
    setUp({ growthAndMargin: null })

    const cardTitle = screen.getByText('Growth and margin by size; recent actuals')
    const message = screen.getByText('No rows')

    expect(cardTitle).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
