import React from 'react'
import { Auth } from 'aws-amplify'
import { render, screen, fireEvent } from '@testing-library/react'
import { UserGroupTabs } from '../../../../src/views/UserPanelView/Components/UserGroupTabs'
import Context from '../../../../src/context/appContext'
import '@testing-library/jest-dom/extend-expect'
import { useUsers } from '../../../../src/hooks/useUsers'

const selectedEmail = 'user@test.com'
const mockSetSelectedEmail = jest.fn()
const props = {
  classes: {}
}

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const setup = () => {
  render(<Context.Provider value={ { user: { selectedEmail, setSelectedEmail: mockSetSelectedEmail } }}>
    <UserGroupTabs {...props}/>
  </Context.Provider>)
}

jest.mock('../../../../src/hooks/useUsers')

const useUsersResponse = {
  page: 1,
  token: null,
  users: [
    { username: '01', email: 'user@test.com', roles: [] }
  ],
  isLoading: false,
  rowsPerPage: 2,
  setUsers: jest.fn(),
  setLocation: jest.fn(),
  handleChangePage: jest.fn()
}

describe('<UserGroupTabs/>', () => {
  it('renders without crashing', () => {
    useUsers.mockImplementation(() => useUsersResponse)
    setup()
    const component = screen.getByText('Administrators')
    expect(component).toBeInTheDocument()
  })
  it('change to customer tab', () => {
    useUsers.mockImplementation(() => useUsersResponse)
    setup()
    const AdminTab = screen.getByRole('tab', { name: 'Administrators' })
    const CustomerTab = screen.getByRole('tab', { name: 'Customers' })

    fireEvent.click(CustomerTab)

    expect(AdminTab).toHaveAttribute('aria-selected', 'false')
    expect(CustomerTab).toHaveAttribute('aria-selected', 'true')
  })
})
