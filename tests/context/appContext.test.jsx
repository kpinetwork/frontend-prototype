import React, { useContext } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { Auth } from 'aws-amplify'
import { render, screen, waitFor } from '@testing-library/react'
import Context, { AppContextProvider } from '../../src/context/appContext'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  }),
  signInUserSession: {
    idToken: { payload: { 'cognito:groups': ['admin'] } }
  }
})

const localStorageMock = (store) => {
  return {
    getItem (key) {
      return store[key]
    },
    setItem (key, value) {
      store[key] = value.toString()
    }
  }
}

const TestingComponent = () => {
  const { filterFields, isAdmin, isRoleLoading } = useContext(Context)

  return (
    <>
      <p>{filterFields.year}</p>
      <p>is admin: {isAdmin.toString()}</p>
      <p>is role loading: {isRoleLoading.toString()}</p>
    </>
  )
}

const setUp = () => {
  render(
    <AppContextProvider>
      <TestingComponent />
    </AppContextProvider>
  )
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock({ year: '"2021"', filters: '{}' })
})
describe('<AppContextProvider />', () => {
  it('provides expected Context to child elements', () => {
    waitFor(() => {
      setUp()
    })

    expect(screen.getByText('2022')).toBeInTheDocument()
    expect(screen.getByText('is admin: false')).toBeInTheDocument()
    expect(screen.getByText('is role loading: true')).toBeInTheDocument()
  })
})
