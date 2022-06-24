import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import ModifyModal from '../../../../src/views/EditModify/Components/ModifyModal'

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  addedScenarios: {},
  deleted: 1
}

const company = {
  123: [
    {
      scenario: 'Actuals',
      metric: 'Revenue',
      added: true
    }
  ]
}

const setUp = (props) => {
  render(<ModifyModal {...defaultProps} {...props} />)
}

describe('<ModifyModal/>', () => {
  it('Should render', () => {
    setUp()

    const close = screen.getByRole('button', { name: 'Close' })

    expect(close).toBeInTheDocument()
  })

  it('Should render with success text', () => {
    setUp({ addedScenarios: company, deleted: 3 })

    const deleted = screen.getByText('3 scenario(s) deleted')
    const added = screen.getByText('Actuals Revenue of company 123 was added successfully.')

    expect(deleted).toBeInTheDocument()
    expect(added).toBeInTheDocument()
  })

  it('Should render with invalid text', () => {
    const noAdded = JSON.parse(JSON.stringify(company))
    noAdded[123][0].added = false
    setUp({ addedScenarios: noAdded, deleted: 0 })

    const deleted = screen.getByText('No deleted scenarios')
    const added = screen.getByText('Actuals Revenue of company 123 could not be added.')

    expect(deleted).toBeInTheDocument()
    expect(added).toBeInTheDocument()
  })
})
