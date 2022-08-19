import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { UserTabs } from '../../../src/views/UserPanelView/UserTabs'
import useUserRole from '../../../src/hooks/useUserRole'

const defaultProps = {
  rootClass: '',
  user: {
    email: 'user@test.com',
    roles: ['customer']
  },
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
  setOpenPermissions: jest.fn(),
  setUser: jest.fn()
}

const useUserRoleResponse = {
  changed: false,
  isUpdatingRole: false,
  changeUserRoles: jest.fn()
}

jest.mock('../../../src/hooks/useUserRole')

const setUp = (props) => {
  render(<UserTabs {...defaultProps} {...props}/>)
}

describe('<RolesTab />', () => {
  it('Should render component', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    setUp()

    const permissionsTab = screen.getByRole('tab', { name: 'Permissions' })
    const rolesTab = screen.getByRole('tab', { name: 'Roles' })

    expect(rolesTab).toBeInTheDocument()
    expect(permissionsTab).toBeInTheDocument()
  })

  it('should change tab on click event', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    setUp()
    const permissionsTab = screen.getByRole('tab', { name: 'Permissions' })
    const rolesTab = screen.getByRole('tab', { name: 'Roles' })

    fireEvent.click(rolesTab)

    expect(permissionsTab).toHaveAttribute('aria-selected', 'false')
    expect(rolesTab).toHaveAttribute('aria-selected', 'true')
  })
})
