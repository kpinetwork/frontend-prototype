import React, { useContext } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { Auth } from 'aws-amplify'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import Context, { AppContextProvider } from '../../src/context/appContext'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  }),
  signInUserSession: {
    idToken: { payload: { 'cognito:groups': ['admin'] } }
  }
})

afterEach(cleanup)

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

jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
localStorage.setItem = jest.fn()
jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')

const mockGetItem = (values) => {
  window.localStorage.getItem.mockImplementation(key => values[key])
}

describe('<AppContextProvider />', () => {
  it('provides expected Context with empty values when localStorage is empty', async () => {
    mockGetItem({ year: 'null', filters: 'null' })
    await waitFor(() => {
      setUp()
    })
    const currentYear = new Date().getFullYear()

    expect(screen.getByText(currentYear)).toBeInTheDocument()
    expect(screen.getByText('is admin: true')).toBeInTheDocument()
    expect(screen.getByText('is role loading: false')).toBeInTheDocument()
  })

  it('provides expected Context to child elements', async () => {
    mockGetItem({ year: '2021', filters: '{}' })
    await waitFor(() => {
      setUp()
    })

    expect(screen.getByText('2021')).toBeInTheDocument()
    expect(screen.getByText('is admin: true')).toBeInTheDocument()
    expect(screen.getByText('is role loading: false')).toBeInTheDocument()
  })
})
