import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RolesTab } from '../../../../../src/views/UserPanelView/Components/Tabs/RolesTab'
import useUserRole from '../../../../../src/hooks/useUserRole'

const defaultProps = {
  rootClass: '',
  user: {
    email: 'user@test.com',
    roles: ['cuestomer']
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
  ]
}

const useUserRoleResponse = {
  changed: false,
  isUpdatingRole: false,
  changeUserRoles: jest.fn()
}

jest.mock('../../../../../src/hooks/useUserRole')

const setUp = (props) => {
  render(<RolesTab {...defaultProps} {...props}/>)
}

describe('<RolesTab />', () => {
  it('Should render component', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    setUp()

    const button = screen.getByRole('button', { name: 'Change role' })

    expect(button).toBeInTheDocument()
  })

  it('Should render actions button when change role button was clicked', () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    setUp()
    const button = screen.getByRole('button', { name: 'Change role' })

    fireEvent.click(button)
    const saveButton = screen.getByRole('button', { name: 'Save' })
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })

    expect(button).not.toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  it('Should call changeUserRoles when save button was clicked', async () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    setUp()
    const button = screen.getByRole('button', { name: 'Change role' })
    useUserRoleResponse.changeUserRoles.mockReturnValue(true)

    fireEvent.click(button)
    fireEvent.click(screen.getByLabelText('admin'))
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    })

    expect(useUserRoleResponse.changeUserRoles).toHaveBeenCalled()
  })

  it('Should open snackbar when save button was clicked', async () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    setUp()
    const button = screen.getByRole('button', { name: 'Change role' })
    useUserRoleResponse.changeUserRoles.mockReturnValue(false)

    fireEvent.click(button)
    fireEvent.click(screen.getByLabelText('admin'))
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(useUserRoleResponse.changeUserRoles).toHaveBeenCalled()
  })

  it('Should close action buttons when cancel button was clicked', async () => {
    useUserRole.mockImplementation(() => useUserRoleResponse)
    setUp()

    fireEvent.click(screen.getByRole('button', { name: 'Change role' }))
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(cancelButton)

    expect(cancelButton).not.toBeInTheDocument()
  })
})
