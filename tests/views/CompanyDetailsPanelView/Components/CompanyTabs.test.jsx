import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { CompanyTabs } from '../../../../src/views/CompanyDetailsPanelView/Components/CompanyTabs'
import useCompanyDetails from '../../../../src/hooks/useCompanyDetails'
import useScenariosTable from '../../../../src/hooks/useScenariosTable'
import useCompanyTags from '../../../../src/hooks/useCompanyTags'
import Context from '../../../../src/context/appContext'

jest.mock('../../../../src/hooks/useCompanyDetails')
jest.mock('../../../../src/hooks/useScenariosTable')
jest.mock('../../../../src/hooks/useCompanyTags')

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

const companyTagshookResponse = {
  tagsByCompany: [
    {
      id: '1234',
      name: 'Sample tag'
    },
    {
      id: '1234',
      name: 'Sample tag'
    }
  ],
  listOfTags: [
    {
      id: '1',
      name: 'Tag',
      companies: [
        {
          id: '1',
          name: 'Tag'
        }
      ]
    },
    {

      id: '2',
      name: 'Tag Name',
      companies: [
        {
          id: '1',
          name: 'Company Name'
        }
      ]
    }
  ],
  isLoading: false,
  handleTagsByCompany: jest.fn()
}

const companyID = 'id'

const setUp = (id) => {
  render(
    <Context.Provider value={{ company: { selectedCompanyID: id } }}>
      <CompanyTabs />
    </Context.Provider>
  )
}

describe('<CompanyTabs />', () => {
  it('should render no company selected card', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    useScenariosTable.mockImplementation(() => scenariosTablehookResponse)
    useCompanyTags.mockImplementation(() => companyTagshookResponse)
    setUp()

    const label = screen.getByText('No company selected')

    expect(label).toBeInTheDocument()
  })

  it('should render tabs', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    useScenariosTable.mockImplementation(() => scenariosTablehookResponse)
    useCompanyTags.mockImplementation(() => companyTagshookResponse)
    setUp(companyID)

    const scenariosTab = screen.getByRole('tab', { name: 'SCENARIOS' })
    const investmentsTab = screen.getByRole('tab', { name: 'INVESTMENTS' })
    const tagsTab = screen.getByRole('tab', { name: 'TAGS' })

    expect(scenariosTab).toBeInTheDocument()
    expect(investmentsTab).toBeInTheDocument()
    expect(tagsTab).toBeInTheDocument()
  })

  it('Scenario tab when is selected should be highlighted', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    useScenariosTable.mockImplementation(() => scenariosTablehookResponse)
    useCompanyTags.mockImplementation(() => companyTagshookResponse)
    setUp(companyID)

    const scenariosTab = screen.getByRole('tab', { name: 'SCENARIOS' })
    const investmentsTab = screen.getByRole('tab', { name: 'INVESTMENTS' })
    const tagsTab = screen.getByRole('tab', { name: 'TAGS' })

    expect(scenariosTab).toHaveAttribute('aria-selected', 'true')
    expect(investmentsTab).toHaveAttribute('aria-selected', 'false')
    expect(tagsTab).toHaveAttribute('aria-selected', 'false')
  })

  it('Investment tab when is selected should be highlighted', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    useScenariosTable.mockImplementation(() => scenariosTablehookResponse)
    useCompanyTags.mockImplementation(() => companyTagshookResponse)
    setUp(companyID)
    const scenariosTab = screen.getByRole('tab', { name: 'SCENARIOS' })
    const investmentsTab = screen.getByRole('tab', { name: 'INVESTMENTS' })
    const tagsTab = screen.getByRole('tab', { name: 'TAGS' })

    fireEvent.click(investmentsTab)

    expect(scenariosTab).toHaveAttribute('aria-selected', 'false')
    expect(investmentsTab).toHaveAttribute('aria-selected', 'true')
    expect(tagsTab).toHaveAttribute('aria-selected', 'false')
  })

  it('Tag tab when is selected should be highlighted', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    useScenariosTable.mockImplementation(() => scenariosTablehookResponse)
    useCompanyTags.mockImplementation(() => companyTagshookResponse)
    setUp(companyID)
    const scenariosTab = screen.getByRole('tab', { name: 'SCENARIOS' })
    const investmentsTab = screen.getByRole('tab', { name: 'INVESTMENTS' })
    const tagsTab = screen.getByRole('tab', { name: 'TAGS' })

    fireEvent.click(tagsTab)

    expect(scenariosTab).toHaveAttribute('aria-selected', 'false')
    expect(investmentsTab).toHaveAttribute('aria-selected', 'false')
    expect(tagsTab).toHaveAttribute('aria-selected', 'true')
  })
})
