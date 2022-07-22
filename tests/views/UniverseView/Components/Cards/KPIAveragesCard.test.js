import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { KPIAveragesCard } from '../../../../../src/views/UniverseView/Components/Cards/KPIAveragesCard'
import { KPI_AVERAGE } from '../../../../data/universeOverview'

const defaultProps = {
  kpiAverage: KPI_AVERAGE,
  isLoading: false
}

const setUp = (props) => {
  render(<KPIAveragesCard {...defaultProps} {...props}/>)
}

describe('<KPIAveragesCard />', () => {
  it('render correctly', () => {
    setUp()

    const cardTitle = screen.getByText('KPI Averages')

    expect(cardTitle).toBeInTheDocument()
  })

  it('render cardKPI if is loading is true', () => {
    setUp({ isLoading: true })

    const cardTitle = screen.getByText('KPI Averages')

    expect(cardTitle).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('render empty grid if countBySize is empty', () => {
    setUp({ kpiAverage: null })
    screen.debug()
    const cardTitle = screen.getByText('KPI Averages')

    expect(cardTitle).toBeInTheDocument()
  })
})
