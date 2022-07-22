import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { CountBySizeCard } from '../../../../../src/views/UniverseView/Components/Cards/CountBySizeCard'
import { COUNT_BY_SIZE } from '../../../../data/universeOverview'

const defaultProps = {
  countBySize: COUNT_BY_SIZE,
  isLoading: false
}

const setUp = (props) => {
  render(<CountBySizeCard {...defaultProps} {...props}/>)
}

describe('<CountBySizeCard />', () => {
  it('render correctly', () => {
    setUp()

    const cardTitle = screen.getByText('Count By Size')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Count')).toBeInTheDocument()
    expect(screen.getByText('# of companies by size')).toBeInTheDocument()
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('render cardKPI if is loading is true', () => {
    setUp({ isLoading: true })

    const cardTitle = screen.getByText('Count By Size')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('render empty grid if countBySize is empty', () => {
    setUp({ countBySize: null })

    const cardTitle = screen.getByText('Count By Size')
    const message = screen.getByText('No rows')

    expect(cardTitle).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })
})
