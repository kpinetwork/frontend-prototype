import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { UsersPanelTable } from '../../../../src/views/UserPanelView/Components/UsersTable'
import Context from '../../../../src/context/appContext'
import useUsers from '../../../../src/hooks/useUsers'

jest.mock('../../../../src/hooks/useUsers')

const mockSetSelectedEmail = jest.fn()
const email = 'user@test.com'
const usersHookResponse = {
  page: 1,
  token: null,
  users: [
    { email, roles: ['Admin'] }
  ],
  isLoading: false,
  rowsPerPage: 2,
  setUsers: jest.fn(),
  setLocation: jest.fn(),
  handleChangePage: jest.fn()
}

const props = {
  classes: {}
}

const setUp = (selectedEmail) => {
  render(
  <Context.Provider value={ { user: { selectedEmail, setSelectedEmail: mockSetSelectedEmail } }}>
    <UsersPanelTable {...props}/>
  </Context.Provider>
  )
}

describe('<UsersPanelTable />', () => {
  it('Should render component', () => {
    const hookResponse = { ...usersHookResponse, users: [{ email, roles: null }] }
    useUsers.mockImplementation(() => hookResponse)
    setUp(email)
    const columnsHeader = screen.getAllByRole('columnheader')
    const emailCell = screen.getByText(email)

    expect(columnsHeader).toHaveLength(2)
    expect(emailCell).toBeInTheDocument()
  })

  it('Should render loading progress when isLoading equals true', () => {
    const response = { ...usersHookResponse, isLoading: true }
    useUsers.mockImplementation(() => response)
    setUp()

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('Should call setUser and setLocation when click on user email', () => {
    useUsers.mockImplementation(() => usersHookResponse)
    setUp(email)
    const emailCell = screen.getByText(email)

    fireEvent.click(emailCell)

    expect(usersHookResponse.setLocation).toHaveBeenCalled()
    expect(mockSetSelectedEmail).toHaveBeenCalled()
  })
})
