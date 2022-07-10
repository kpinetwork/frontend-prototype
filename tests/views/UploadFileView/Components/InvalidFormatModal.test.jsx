import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import InvalidFormatModal from '../../../../src/views/UploadFileView/Components/InvalidFormatModal'

const defaultProps = {
  open: true,
  onClose: () => {},
  errorObject: {
    0: [1, 4, 6],
    1: [],
    4: []
  }
}

const setUp = (props) => {
  render(<InvalidFormatModal {...defaultProps} {...props}/>)
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
    const scenario = screen.getByText('4')

    expect(dialog).toBeInTheDocument()
    expect(scenario).toBeInTheDocument()
  })

  it('Should render preview modal with company names details when comes from edit modify', () => {
    const companyName = 'Sample company'
    const props = {
      body: [
        { name: companyName },
        {},
        {}
      ],
      fromModify: true
    }
    setUp(props)
    const dialog = screen.getByRole('dialog')
    const company = screen.getByText(`4 ${companyName}`)

    expect(dialog).toBeInTheDocument()
    expect(company).toBeInTheDocument()
  })

  it('Should render preview modal with company index when comes from edit modify', () => {
    const props = {
      body: [
        {},
        {},
        {}
      ],
      fromModify: true
    }
    setUp(props)
    const dialog = screen.getByRole('dialog')
    const company = screen.getByText('4')

    expect(dialog).toBeInTheDocument()
    expect(company).toBeInTheDocument()
  })
})
