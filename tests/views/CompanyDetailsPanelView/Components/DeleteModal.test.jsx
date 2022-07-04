import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import DeleteModal from '../../../../src/views/CompanyDetailsPanelView/Components/DeleteModal'

const defaultProps = {
  open: true,
  onOk: jest.fn(),
  onCancel: jest.fn(),
  loading: false
}

const setUp = (props) => {
  render(<DeleteModal {...defaultProps} {...props}/>)
}

describe('<DeleteCompanyModal />', () => {
  it('should render', () => {
    setUp()

    const confirmButton = screen.getByRole('button', { name: 'YES' })
    const cancelButton = screen.getByRole('button', { name: 'NO' })

    expect(confirmButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  it('should call ok action when click yes option', () => {
    setUp()

    const confirmButton = screen.getByRole('button', { name: 'YES' })

    fireEvent.click(confirmButton)

    expect(defaultProps.onOk).toHaveBeenCalled()
  })

  it('should call cancel action when click no option', () => {
    setUp()
    const cancelButton = screen.getByRole('button', { name: 'NO' })

    fireEvent.click(cancelButton)

    expect(defaultProps.onCancel).toHaveBeenCalled()
  })

  it('should render loading progress when is loading', () => {
    setUp({ loading: true })

    const progressComponent = screen.getByTestId('loading-progress')

    expect(progressComponent).toBeInTheDocument()
  })
})
