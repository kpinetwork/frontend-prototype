import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonActions from '../../src/components/Actions'

const defaultProps = {
  okName: 'Save',
  cancelName: 'Cancel',
  onOk: jest.fn(),
  onCancel: jest.fn()
}

const setUp = (props) => {
  render(<ButtonActions {...defaultProps} {...props} />)
}

describe('<ButtonActions />', () => {
  describe('actions', () => {
    it('should call onSave function when click on ok button', async () => {
      setUp()
      const saveButton = screen.getByRole('button', { name: defaultProps.okName })

      fireEvent.click(saveButton)

      expect(saveButton).toBeInTheDocument()
      expect(defaultProps.onOk).toHaveBeenCalled()
    })

    it('should call onCancel function when click on cancel button', async () => {
      setUp()
      const cancelButton = screen.getByRole('button', { name: defaultProps.cancelName })

      fireEvent.click(cancelButton)

      expect(cancelButton).toBeInTheDocument()
      expect(defaultProps.onCancel).toHaveBeenCalled()
    })
  })

  describe('disable', () => {
    it('should not be clickable when button are disabled', async () => {
      setUp({ allowActions: false })
      const saveButton = screen.getByRole('button', { name: defaultProps.okName })
      const cancelButton = screen.getByRole('button', { name: defaultProps.cancelName })

      fireEvent.click(cancelButton)
      fireEvent.click(saveButton)

      expect(saveButton).toBeDisabled()
      expect(cancelButton).toBeDisabled()
      expect(defaultProps.onOk).not.toHaveBeenCalled()
      expect(defaultProps.onCancel).not.toHaveBeenCalled()
    })
  })

  describe('style', () => {
    it('should add marginRigth when flex direction is not reverse', async () => {
      setUp({ reverse: false })
      const saveButton = screen.getByRole('button', { name: defaultProps.okName })

      expect(saveButton.style.marginRight).toBe('20px')
    })
  })
})
