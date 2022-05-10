import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { DragAndDrop, ButtonOptions } from '../../../../src/views/UploadFileView/Components/DragAndDrop'

const defaultProps = {
  getInputProps: jest.fn(),
  getRootProps: jest.fn(),
  acceptedFiles: ['test'],
  acceptedFilesItems: ['test'],
  fileRejectionItems: []
}

const setUp = (props) => {
  render(<DragAndDrop {...defaultProps} {...props} />)
}

const setUpButtonOptions = (props) => {
  render(<ButtonOptions onCancel={jest.fn()} setEdit={jest.fn()} onValidateData={jest.fn()} {...props} />)
}

describe('<DragAndDrop />', () => {
  describe('renders', () => {
    it('Should render Drag and Drop', () => {
      setUp()
      const dragAndDrop = screen.getByText('Drag and drop your file here, or click to select your file')

      expect(dragAndDrop).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should buttons and info message when upload csv', () => {
      setUp()
      const dropzone = screen.getByTestId('drop-input')
      const infoMessage = screen.getByText('File name and size')
      const fileInfo = screen.getByText('test')

      expect(dropzone).toBeInTheDocument()
      expect(infoMessage).toBeInTheDocument()
      expect(fileInfo).toBeInTheDocument()
    })

    it('Should buttons and error message when upload csv', () => {
      setUp({
        acceptedFilesItems: [],
        fileRejectionItems: ['error']
      })
      const errorMessage = screen.getByText('error')

      expect(errorMessage).toBeInTheDocument()
    })
  })
})

describe('<ButtonOptions />', () => {
  describe('renders', () => {
    it('Should render Button Options', () => {
      setUpButtonOptions()
      const uploadFileButton = screen.getByText('Upload File')
      const editButton = screen.getByText('Edit')
      const resetButton = screen.getByText('Reset')
      fireEvent.click(editButton)

      expect(uploadFileButton).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      expect(resetButton).toBeInTheDocument()
    })
  })
})
