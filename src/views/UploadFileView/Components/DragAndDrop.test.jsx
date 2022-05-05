import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import DragAndDrop from './DragAndDrop'

const setUp = () => {
  render(<DragAndDrop />)
}

describe('<DragAndDrop />', () => {
  describe('renders', () => {
    it('Should render Drag and Drop', () => {
      setUp()
      const dragAndDrop = screen.getByText('Drag and drop your file here, or click to select your file')

      expect(dragAndDrop).toBeInTheDocument()
    })
  })
})
