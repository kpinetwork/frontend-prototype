import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { DeleteTagsDialog } from '../../../../src/views/TagsView/Components/DeleteTagsDialog'

const defaultProps = {
  open: true,
  onOk: jest.fn(),
  onCancel: jest.fn(),
  tags: ['Sample tag']
}

const setUp = (props) => {
  render(<DeleteTagsDialog {...defaultProps} {...props}/>)
}

describe('<DeleteTagDialog />', () => {
  it('should render component with button actions', () => {
    setUp()

    const confirmButton = screen.getByRole('button', { name: 'Yes' })
    const cancelButton = screen.getByRole('button', { name: 'No' })

    expect(confirmButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  it('should call yes action when click yes option', () => {
    setUp()

    const confirmButton = screen.getByRole('button', { name: 'Yes' })

    fireEvent.click(confirmButton)

    expect(defaultProps.onOk).toHaveBeenCalled()
  })

  it('should call cancel action when click no option', () => {
    setUp()
    const cancelButton = screen.getByRole('button', { name: 'No' })

    fireEvent.click(cancelButton)

    expect(defaultProps.onCancel).toHaveBeenCalled()
  })
})
