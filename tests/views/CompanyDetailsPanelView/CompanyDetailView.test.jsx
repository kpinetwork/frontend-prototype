import React from 'react'
import { Auth } from 'aws-amplify'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { CompanyDetailView } from '../../../src/views/CompanyDetailsPanelView/CompanyDetailView'
import useCompanyDetails from '../../../src/hooks/useCompanyDetails'
import useScenariosTable from '../../../src/hooks/useScenariosTable'
import Context from '../../../src/context/appContext'

const setUp = (id) => {
  render(
    <Context.Provider value={{ company: { selectedCompanyID: id } }}>
      <CompanyDetailView />
    </Context.Provider>
  )
}

jest.mock('../../../src/hooks/useCompanyDetails')
jest.mock('../../../src/hooks/useScenariosTable')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const scenariosTablehookResponse = {
  rowsPerPage: 10,
  isLoading: false,
  scenarios: [
    {
      scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
      scenario: 'Actuals',
      year: 2019,
      metric_id: '9cd20ace-79e1-426a-89ac-c8b92921a514',
      metric: 'Revenue',
      value: 124.844
    }
  ],
  total: 1,
  page: 0,
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn()
}

const companyDetailshookResponse = {
  company: {
    id: '132',
    name: 'Sample Company',
    sector: 'Education',
    vertical: 'Education',
    investorProfile: 'Public'
  },
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
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    useScenariosTable.mockImplementation(() => scenariosTablehookResponse)
    setUp('123')

    const companyCell = screen.getByText('Sample Company')
    const scenariosTab = screen.getByRole('tab', { name: 'SCENARIOS' })
    const investmentsTab = screen.getByRole('tab', { name: 'INVESTMENTS' })

    expect(companyCell).toBeInTheDocument()
    expect(scenariosTab).toBeInTheDocument()
    expect(investmentsTab).toBeInTheDocument()
  })

  it('should show error message if is loading', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    useScenariosTable.mockImplementation(() => scenariosTablehookResponse)
    setUp(null)

    expect(screen.getByText('No company selected'))
  })
})
