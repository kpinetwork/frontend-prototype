import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ExpectedGrowthRateAndMarginCard } from '../../../../../src/views/UniverseView/Components/Cards/ExpectedGrowthRateAndMarginCard'
import { EXP_GROWTH_AND_MARGIN } from '../../../../data/universeOverview'

const defaultProps = {
  expectedGrowthAndMargin: EXP_GROWTH_AND_MARGIN,
  isLoading: false
}

const setUp = (props) => {
  render(<ExpectedGrowthRateAndMarginCard {...defaultProps} {...props}/>)
}

describe('<ExpectedGrowthRateAndMarginCard />', () => {
  it('render correctly', () => {
    setUp()

    const cardTitle = screen.getByText('Growth and margin by size; projected')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Size')).toBeInTheDocument()
    expect(screen.getByText('Growth')).toBeInTheDocument()
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('render cardKPI if is loading is true', () => {
    setUp({ isLoading: true })

    const cardTitle = screen.getByText('Growth and margin by size; projected')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('render empty grid if countBySize is empty', () => {
    setUp({ expectedGrowthAndMargin: null })

    const cardTitle = screen.getByText('Growth and margin by size; projected')
    const message = screen.getByText('No rows')

    expect(cardTitle).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
