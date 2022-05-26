import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { CompanyDetailView } from '../../../src/views/CompanyDetailsPanelView/CompanyDetailView'
import useCompanyDetails from '../../../src/hooks/useCompanyDetails'

const setUp = () => {
  render(<CompanyDetailView />)
}

jest.mock('../../../src/hooks/useCompanyDetails')

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

describe('<CompanyDetailView />', () => {
  it('should render', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()

    const scenariosTab = screen.getByRole('tab', { name: 'Scenarios' })
    const investmentsTab = screen.getByRole('tab', { name: 'Investments' })

    expect(scenariosTab).toBeInTheDocument()
    expect(investmentsTab).toBeInTheDocument()
  })
})
