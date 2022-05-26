import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { CompanyTabs } from '../../../../src/views/CompanyDetailsPanelView/Components/CompanyTabs'
import useCompanyDetails from '../../../../src/hooks/useCompanyDetails'

jest.mock('../../../../src/hooks/useCompanyDetails')

const hookResponse = {
  addInvestment: jest.fn(),
  investments: [
    {
      company_id: 'id',
      id: '123',
      investment_date: '2019-02',
      divestment_date: null,
      round: 1,
      structure: 'Primary',
      ownership: 'Minority',
      investor_type: 'Private equity'
    }
  ],
  isLoading: false
}

const setUp = () => {
  render(<CompanyTabs />)
}

describe('<CompanyTabs />', () => {
  it('should render tabs', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()

    const scenariosTab = screen.getByRole('tab', { name: 'Scenarios' })
    const investmentsTab = screen.getByRole('tab', { name: 'Investments' })

    expect(scenariosTab).toBeInTheDocument()
    expect(investmentsTab).toBeInTheDocument()
  })

  it('should be selected scenarios tab by default', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()

    const scenariosTab = screen.getByRole('tab', { name: 'Scenarios' })
    const investmentsTab = screen.getByRole('tab', { name: 'Investments' })

    expect(scenariosTab).toHaveAttribute('aria-selected', 'true')
    expect(investmentsTab).toHaveAttribute('aria-selected', 'false')
  })

  it('should change tab on click event', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()

    const scenariosTab = screen.getByRole('tab', { name: 'Scenarios' })
    const investmentsTab = screen.getByRole('tab', { name: 'Investments' })

    fireEvent.click(investmentsTab)

    expect(scenariosTab).toHaveAttribute('aria-selected', 'false')
    expect(investmentsTab).toHaveAttribute('aria-selected', 'true')
  })
})
