import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import PreviewModal from '../../../../src/views/UploadFileView/Components/PreviewModal'

const props = {
  open: true,
  onClose: () => {},
  onOk: () => {},
  onCancel: () => {}
}

const setUp = (defaultProps) => {
  render(<PreviewModal {...props} {...defaultProps}/>)
}

describe('<PreviewModal /> with valid data', () => {
  it('Should render preview modal without repeated scenarios data', () => {
    setUp({ validData: true, data: { validated_companies: [] } })
    const dialog = screen.getByRole('dialog')

    expect(dialog).toBeInTheDocument()
  })

  it('Should render preview modal with repeated scenarios data', () => {
    setUp({ validData: true, data: { validated_companies: [{ scenarios: { 'Budget-2020': { Revenue: true, Ebitda: false } } }] } })
    const dialog = screen.getByRole('dialog')
    const scenario = screen.getByText('Budget-2020: Revenue')

    expect(dialog).toBeInTheDocument()
    expect(scenario).toBeInTheDocument()
  })
})

describe('<PreviewTable /> without valid data', () => {
  it('Should render preview modal with warnings of repeated information', () => {
    setUp({
      validData: false,
      data: {
        repeated_ids: {
          '745e3269-f7bf-4224-bf17-b086bbece796': 2
        },
        repeated_names: {
          'SAMPLE COMPANY': 2
        },
        existing_names: [
          'APPLIED OPTOELECTRONICS, INC.'
        ],
        validated_companies: [
          {
            company_id: '39cb04f1-79bf-409d-af74-0b7207d33626',
            companies_name: 'KPI COMPANY TEST',
            scenarios: {}
          }
        ]
      }
    })

    const dialog = screen.getByRole('dialog')
    const repeatedNames = screen.getByText('Repeated names')
    const repeatedIds = screen.getByText('Repeated ids')
    const existingNames = screen.getByText('Existing company names')

    expect(dialog).toBeInTheDocument()
    expect(repeatedNames).toBeInTheDocument()
    expect(repeatedIds).toBeInTheDocument()
    expect(existingNames).toBeInTheDocument()
  })

  it('Should render preview modal with only repeated names', () => {
    setUp({ validData: false, data: { repeated_names: { 'SAMPLE COMPANY': 2 } } })

    const repeatedNames = screen.getByText('Repeated names')

    expect(repeatedNames).toBeInTheDocument()
  })
})
