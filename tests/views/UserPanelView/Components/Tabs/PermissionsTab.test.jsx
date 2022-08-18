import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { PermissionsTab } from '../../../../../src/views/UserPanelView/Components/Tabs/PermissionsTab'

const defaultProps = {
  rootClass: '',
  permissionClass: '',
  permissions: [],
  setOpenPermissions: jest.fn(),
  roles: ['admin']
}

const setUp = (props) => {
  render(<PermissionsTab {...defaultProps} {...props}/>)
}

describe('<PermissionsTab />', () => {
  it('Should render component with alert - admin role', () => {
    setUp()

    const alert = screen.getByRole('alert')

    expect(alert).toBeInTheDocument()
  })

  it('Should render permissions - no admin role', () => {
    const permission = { name: 'Sample Company', permission: 'read', id: '1' }
    setUp({ roles: ['role'], permissions: [permission] })

    const button = screen.getByRole('button', { name: 'Add permissions' })
    const companyName = screen.getByText(permission.name)

    expect(button).toBeInTheDocument()
    expect(companyName).toBeInTheDocument()
  })

  it('Should render permissions - no roles', () => {
    const permission = { name: 'Sample Company', permission: 'read', id: '1' }
    setUp({ roles: null, permissions: [permission] })

    const button = screen.getByRole('button', { name: 'Add permissions' })
    const companyName = screen.getByText(permission.name)

    expect(button).toBeInTheDocument()
    expect(companyName).toBeInTheDocument()
  })

  it('Should call open permissions view when click on add permissions', () => {
    const permission = { name: 'Sample Company', permission: 'read', id: '1' }
    setUp({ roles: ['role'], permissions: [permission] })
    const button = screen.getByRole('button', { name: 'Add permissions' })

    fireEvent.click(button)

    expect(defaultProps.setOpenPermissions).toHaveBeenCalled()
  })
})
