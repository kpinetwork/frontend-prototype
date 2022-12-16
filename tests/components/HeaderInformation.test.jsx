import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor, getByRole } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Information } from '../../src/components/HeaderInformation'

const year = '2021'
const setYear = jest.fn()
jest.setTimeout(10000)
const setUp = (props) => {
  const { container } = render(<Information {...props} />)
  return container
}

describe('<Information />', () => {
  it('render header information', async () => {
    setUp({ year, setYear })

    expect(screen.getByText('please select:'))
    expect(screen.getByText('Year'))
    expect(screen.getByRole('button', { name: '2021' }))
  })

  it('click on select', async () => {
    setUp({ year, setYear })

    await userEvent.click(getByRole(screen.getByTestId('header-select'), 'button'))
    await waitFor(() => userEvent.click(screen.getByRole('option', { name: '2019' })))

    expect(setYear).toBeCalled()
  })
})
