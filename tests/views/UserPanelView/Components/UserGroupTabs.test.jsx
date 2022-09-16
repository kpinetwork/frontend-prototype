import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { UserGroupTabs } from '../../../../src/views/UserPanelView/Components/UserGroupTabs'
import Context from '../../../../src/context/appContext'
import '@testing-library/jest-dom/extend-expect'

const selectedEmail = 'user@test.com'
const mockSetSelectedEmail = jest.fn()
const props = {
  classes: {}
}

const setup = () => {
  render(<Context.Provider value={ { user: { selectedEmail, setSelectedEmail: mockSetSelectedEmail } }}>
    <UserGroupTabs {...props}/>
  </Context.Provider>)
}

describe('<UserGroupTabs/>', () => {
  it('renders without crashing', () => {
    setup()
    const component = screen.getByText('Administrators')
    expect(component).toBeInTheDocument()
  })
  it('change to customer tab', () => {
    setup()
    const AdminTab = screen.getByRole('tab', { name: 'Administrators' })
    const CustomerTab = screen.getByRole('tab', { name: 'Customers' })

    fireEvent.click(CustomerTab)

    expect(AdminTab).toHaveAttribute('aria-selected', 'false')
    expect(CustomerTab).toHaveAttribute('aria-selected', 'true')
  })
})
