import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { UserCard } from '../../../../src/views/UserPanelView/Components/UserCard'

const defaultProps = {
  user: {
    email: 'user@test.com',
    roles: ['Admin'],
    status: 'Active'
  }
}

const setUp = () => {
  render(<UserCard {...defaultProps}/>)
}

describe('<UserCard />', () => {
  it('Should render component', () => {
    setUp()

    const emailCell = screen.getByText(defaultProps.user.email)

    expect(emailCell).toBeInTheDocument()
  })
})
