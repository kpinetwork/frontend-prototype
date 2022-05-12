import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import InvalidFormatModal from '../../../../src/views/UploadFileView/Components/InvalidFormatModal'

const props = {
  open: true,
  onClose: () => {},
  errorObject: {
    0: [1, 4, 6],
    1: [],
    2: [3, 6, 7],
    4: [],
    5: []
  }
}

const setUp = () => {
  render(<InvalidFormatModal {...props}/>)
}

describe('<InvalidPreviewModal />', () => {
  it('Should render invalid format modal', () => {
    setUp()
    const dialog = screen.getByRole('dialog')

    expect(dialog).toBeInTheDocument()
  })

  it('Should render preview modal with repeated scenarios data', () => {
    setUp()
    const dialog = screen.getByRole('dialog')
    const scenario = screen.getByText('4, 6')

    expect(dialog).toBeInTheDocument()
    expect(scenario).toBeInTheDocument()
  })
})
