import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { EditModifyButtons } from '../../../../src/views/EditModify/Components/EditOptions'

const defaultProps = {
  onCancel: jest.fn(),
  edit: false,
  setEdit: jest.fn(),
  onSend: jest.fn()
}

const setUp = (props) => {
  render(<EditModifyButtons {...defaultProps} {...props} />)
}

describe('<EditModifyButtons />', () => {
  describe('render', () => {
    it('Should render EditModifyButtons with edit', () => {
      setUp()
      const editButton = screen.getByRole('button', { name: 'Edit' })

      expect(editButton).toBeInTheDocument()
    })
    it('Should render EditModifyButtons with save, cancel', () => {
      setUp({ edit: true })
      const saveButton = screen.getByRole('button', { name: 'Save Data' })
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should call setEdit on click edit', () => {
      setUp()
      const editButton = screen.getByRole('button', { name: 'Edit' })

      fireEvent.click(editButton)

      expect(defaultProps.setEdit).toHaveBeenCalled()
    })

    it('Should call onSend on click save data', () => {
      setUp({ edit: true })
      const saveButton = screen.getByRole('button', { name: 'Save Data' })

      fireEvent.click(saveButton)

      expect(defaultProps.onSend).toHaveBeenCalled()
    })

    it('Should call onCancel on click cancel', () => {
      setUp({ edit: true })
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      fireEvent.click(cancelButton)

      expect(defaultProps.onCancel).toHaveBeenCalled()
    })
  })
})
