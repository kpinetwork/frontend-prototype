import React from 'react'
import { render, screen } from '@testing-library/react'
import { Auth } from 'aws-amplify'

import { EditModifyView } from '../../../src/views/EditModify/EditModifyView'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})
test('EditModifyView renders components for tab and title', () => {
  render(<EditModifyView />)
  const titles = screen.getAllByText('Edit Modify')
  expect(titles).toHaveLength(2)
})
