import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { UserDetailView } from '../../../src/views/UserPanelView/UserDetailView'
import useUserRole from '../../../src/hooks/useUserRole'
import useUserDetails from '../../../src/hooks/useUserDetails'
import usePublicCompanies from '../../../src/hooks/usePublicCompanies'
import useCompanyPermissions from '../../../src/hooks/useCompanyPermissions'
import useCompaniesToChange from '../../../src/hooks/useCompaniesToChange'

const defaultProps = {
  email: 'user@test.com'
}

const useUserRoleResponse = {
  changed: false,
  isUpdatingRole: false,
  changeUserRoles: jest.fn()
}

const useUserDetailsResponse = {
  user: {
    email: 'user@test.com',
    roles: ['customer']
  },
  setUser: jest.fn(),
  roles: [
    {
      name: 'admin',
      description: 'Administrator group'
    },
    {
      name: 'customer',
      description: 'Customer group'
    }
  ],
  permissions: [
    {
      id: 'id-1',
      permission: 'read',
      name: 'Company A'
    },
    {
      id: 'id-2',
      permission: 'read',
      name: 'Company B'
    }
  ],
  isLoading: false,
  setDataChanged: jest.fn()
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
jest.mock('../../../src/hooks/useUserRole')
jest.mock('../../../src/hooks/useUserDetails')

const setUp = () => {
  render(<UserDetailView {...defaultProps}/>)
}

const mockPermissionsViewHooks = () => {
  usePublicCompanies.mockImplementation(() => usePublicCompaniesResponse)
  useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
  useCompanyPermissions.mockImplementation(() => useCompanyPermissionsResponse)
}

describe('<UserDetailsView />', () => {
  it('Should render component', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    useUserDetails.mockImplementation(() => useUserDetailsResponse)
    setUp()

    expect(screen.getByText('User Details - Summary')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Roles' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Permissions' })).toBeInTheDocument()
  })

  it('Should render loading component', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    useUserDetails.mockImplementation(() => ({
      ...useUserDetails,
      isLoading: true
    }))
    setUp()

    expect(screen.getByTestId('loading-progress')).toBeInTheDocument()
  })

  it('should render no user found card', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    useUserDetails.mockImplementation(() => ({ ...useUserDetailsResponse, user: {} }))
    setUp()

    const label = screen.getByText('User Not Fount')

    expect(label).toBeInTheDocument()
  })

  it('click on Add permissions should change main view', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    useUserDetails.mockImplementation(() => useUserDetailsResponse)
    mockPermissionsViewHooks()
    setUp()

    fireEvent.click(screen.getByRole('button', { name: 'Add permissions' }))

    expect(screen.getByText('Assign View Permission')).toBeInTheDocument()
  })
})
