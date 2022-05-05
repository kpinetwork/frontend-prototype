import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import DragAndDrop from './DragAndDrop'
import { act } from 'react-dom/test-utils'

const setUp = () => {
  render(<DragAndDrop />)
}
const correctFile = new File(['test'], 'test.csv', { type: 'text/csv' })
const wrongFile = new File(['test'], 'test.png', { type: 'image/png' })

describe('<DragAndDrop />', () => {
  describe('renders', () => {
    it('Should render Drag and Drop', () => {
      setUp()
      const dragAndDrop = screen.getByText('Drag and drop your file here, or click to select your file')

      expect(dragAndDrop).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should buttons and info message when upload csv', async () => {
      setUp()
      const dropzone = screen.getByTestId('drop-input')
      Object.defineProperty(dropzone, 'files', {
        value: [correctFile]
      })
      await act(() => {
        fireEvent.drop(dropzone)
      })
      const infoMessage = screen.getByText('File name and size')
      const fileInfo = screen.getByText('test.csv - 4 bytes')
      const uploadFileButton = screen.getByText('Upload File')
      const editButton = screen.getByText('Edit')
      const resetButton = screen.getByText('Reset')

      expect(infoMessage).toBeInTheDocument()
      expect(fileInfo).toBeInTheDocument()
      expect(uploadFileButton).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      expect(resetButton).toBeInTheDocument()
    })

    it('Should render modal when click on reset', async () => {
      setUp()
      const dropzone = screen.getByTestId('drop-input')
      Object.defineProperty(dropzone, 'files', {
        value: [correctFile]
      })
      await act(() => {
        fireEvent.drop(dropzone)
      })
      const resetButton = screen.getByText('Reset')
      fireEvent.click(resetButton)
      const yesButton = screen.getByText('YES')
      const noButton = screen.getByText('NO')
      const resetMessage = screen.getByText('Are you sure you want to reset this form?')

      expect(yesButton).toBeInTheDocument()
      expect(noButton).toBeInTheDocument()
      expect(resetMessage).toBeInTheDocument()
    })

    it('Should close modal on NO', async () => {
      setUp()
      const dropzone = screen.getByTestId('drop-input')
      Object.defineProperty(dropzone, 'files', {
        value: [correctFile]
      })
      await act(() => {
        fireEvent.drop(dropzone)
      })
      const resetButton = screen.getByText('Reset')
      fireEvent.click(resetButton)
      const noButton = screen.getByText('NO')
      fireEvent.click(noButton)
      const resetMessage = screen.queryByText('Are you sure you want to reset this form?')

      expect(resetMessage).not.toBeInTheDocument()
    })

    it('Should render error message when wrong file is uploaded', async () => {
      setUp()
      const dropzone = screen.getByTestId('drop-input')
      Object.defineProperty(dropzone, 'files', {
        value: [wrongFile]
      })
      await act(() => {
        fireEvent.drop(dropzone)
      })
      const errorMessage = screen.getByText('test.png: File type must be .csv')

      expect(errorMessage).toBeInTheDocument()
    })
  })
})
