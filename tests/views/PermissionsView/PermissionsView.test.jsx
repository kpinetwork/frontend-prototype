import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { PermissionsView } from '../../../src/views/PermissionsView/PermissionsView'
import usePublicCompanies from '../../../src/hooks/usePublicCompanies'
import useCompanyPermissions from '../../../src/hooks/useCompanyPermissions'
import useCompaniesToChange from '../../../src/hooks/useCompaniesToChange'

const defaultProps = {
  setOpenPermissions: jest.fn(),
  email: 'user@test.com'
}

const usePublicCompaniesResponse = {
  total: 1,
  companies: [
    {
      id: '1234',
      name: 'Sample company abc',
      sector: 'Application Software',
      vertical: 'Education',
      inves_profile_name: 'Growth stage VC',
      is_public: true
    }
  ],
  isLoading: false,
  page: 0,
  rowsPerPage: 10,
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn()
}

const useCompanyPermissionsResponse = {
  permissions: [],
  successChange: null,
  isPermissionsLoading: false,
  isUpdatingPermissions: false,
  assignCompanyPermissions: jest.fn()
}

const useCompaniesToChangeResponse = {
  companiesToChange: {},
  isCompanyChecked: jest.fn(),
  handleChange: jest.fn(),
  cleanCompaniesToChange: jest.fn()
}

jest.mock('../../../src/hooks/usePublicCompanies')
jest.mock('../../../src/hooks/useCompaniesToChange')
jest.mock('../../../src/hooks/useCompanyPermissions')

const setUp = () => {
  render(<PermissionsView {...defaultProps}/>)
}

describe('<UserDetailsView />', () => {
  it('Should render loading component', () => {
    usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPermissions.mockImplementation(() => ({
      ...useCompanyPermissionsResponse, isPermissionsLoading: true
    }))
    setUp()

    const loadings = screen.getAllByTestId('loading-progress')

    loadings.forEach(
      (loading) => {
        expect(loading).toBeInTheDocument()
      }
    )
  })

  it('Should render component whith cannot assign permissions mssg', () => {
    usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPermissions.mockImplementation(() => ({
      ...useCompanyPermissionsResponse, successChange: false
    }))
    setUp()

    expect(screen.getByText('Cannot change permissions')).toBeInTheDocument()
  })

  it('Should render component with permissions', () => {
    usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPermissions.mockImplementation(() => ({
      ...useCompanyPermissionsResponse,
      permissions: [
        {
          id: '1234',
          name: 'Sample company abc',
          permission: 'read'
        }
      ]
    }))
    setUp()

    expect(screen.getByText('Assign View Permission')).toBeInTheDocument()
  })

  it('handleChange from useCompaniesToChange should be called when click in checkbox', () => {
    usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPermissions.mockImplementation(() => useCompanyPermissionsResponse)
    setUp()

    fireEvent.click(screen.getByRole('checkbox'))

    expect(useCompaniesToChangeResponse.handleChange).toHaveBeenCalled()
  })

  it('click on cancel should call cleanCompaniesToChange and setOpenPermissions', () => {
    usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPermissions.mockImplementation(() => useCompanyPermissionsResponse)
    setUp()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(defaultProps.setOpenPermissions).toHaveBeenCalled()
    expect(useCompaniesToChangeResponse.cleanCompaniesToChange).toHaveBeenCalled()
  })

  it('click on save should call assignPermissions', () => {
    usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
    useCompaniesToChange.mockImplementation(() => ({
      ...useCompaniesToChangeResponse,
      companiesToChange: {
        1234: true
      }
    }))
    useCompanyPermissions.mockImplementation(() => useCompanyPermissionsResponse)
    setUp()

    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(useCompanyPermissionsResponse.assignCompanyPermissions).toHaveBeenCalled()
  })

  it('click on save should not call assignCompanyPermissions when no data to change', () => {
    usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPermissions.mockImplementation(() => useCompanyPermissionsResponse)
    setUp()

    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(useCompanyPermissionsResponse.assignCompanyPermissions).not.toHaveBeenCalled()
  })
})
