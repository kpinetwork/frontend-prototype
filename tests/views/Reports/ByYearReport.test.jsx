import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getByRole, render, screen, waitFor } from '@testing-library/react'
import { ByYearReport } from '../../../src/views/Reports/ByYearReport'
import Context from '../../../src/context/appContext'

const setup = (props) => {
  render(<Context.Provider value={{ filterFields: { filters: {}, companyID: '' } }}>
    <ByYearReport {...props} /></Context.Provider>)
}

describe('<ByYearReport />', () => {
  it('renders without crashing', () => {
    const fromUniverseOverview = false
    setup({ fromUniverseOverview })
    expect(screen.getByText('Calendar Year')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
    expect(screen.getByText('Investment Year')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(1)
  })

  it('change calendar year select', async () => {
    const fromUniverseOverview = false
    setup({ fromUniverseOverview })
    userEvent.click(getByRole(screen.getByTestId('calendar-year-selector'), 'button'))
    await waitFor(() => userEvent.click(screen.getByText('2021')))
    expect(screen.getByRole('button', { name: '2021' })).toHaveTextContent('2021')
  })

  it('change investment year select', async () => {
    const fromUniverseOverview = false
    setup({ fromUniverseOverview })
    userEvent.click(getByRole(screen.getByTestId('investment-year-selector'), 'button'))
    await waitFor(() => userEvent.click(screen.getByText('Two years before investment')))
    expect(screen.getByRole('button', { name: 'Two years before investment' })).toHaveTextContent('Two years before investment')
  })
})
