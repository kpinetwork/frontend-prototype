// test PeerGroupTabs component
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { PeerGroupTabs } from '../../src/components/PeerGroupTabs'
import Context from '../../src/context/appContext'

const setup = (props) => {
  render(<Context.Provider value={{ filterFields: { filters: {}, companyID: '' } }}>
    <PeerGroupTabs {...props} /></Context.Provider>)
}

describe('<PeerGroupTabs />', () => {
  it('renders without crashing', () => {
    const fromUniverseOverview = false
    setup({ fromUniverseOverview })
    const component = screen.getByText('By Year')
    expect(component).toBeInTheDocument()
  })

  it('change tab', () => {
    const fromUniverseOverview = false
    setup({ fromUniverseOverview })
    const ByYearTab = screen.getByRole('tab', { name: 'By Year' })
    const ByMetricTab = screen.getByRole('tab', { name: 'By Metric' })

    fireEvent.click(ByMetricTab)

    expect(ByYearTab).toHaveAttribute('aria-selected', 'false')
    expect(ByMetricTab).toHaveAttribute('aria-selected', 'true')
  })
})
