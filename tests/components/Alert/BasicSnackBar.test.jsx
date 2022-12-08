import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import BasicSnackBar from '../../../src/components/Alert/BasicSnackBar'

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  severity: 'error',
  message: "Can't add data"
}

const setUp = (props) => {
  render(<BasicSnackBar {...props} {...defaultProps}/>)
}

describe('<BasicSnackBar />', () => {
  it('show snackbar when message is triggered', async () => {
    setUp()
    const message = screen.getByText("Can't add data")

    expect(message).toBeInTheDocument()
  })
  it('close snackbar message when click on close button', async () => {
    setUp()
    const button = screen.getByRole('button', { name: 'Close' })
    fireEvent.click(button)

    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
