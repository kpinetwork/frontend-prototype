import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { ScenariosModal } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/ScenariosModal'

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  onOk: jest.fn(),
  onCancel: jest.fn(),
  scenarios: [
    {
      scenario_id: '1234',
      scenario: 'Revenue',
      metric_id: '4321',
      year: 2021,
      value: 13
    }
  ]
}

const setUp = (props) => {
  render(<ScenariosModal {...defaultProps} {...props}/>)
}

describe('<ScenariosModal />', () => {
  describe('render component', () => {
    it('should render', () => {
      setUp()
      const header = screen.getByText('DELETE SCENARIOS')
      const dialog = screen.getByRole('dialog')
      const message = screen.getByText('Revenue-2021: $13')
      const oKButton = screen.getByText('Ok')
      const cancelButton = screen.getByText('Cancel')

      expect(header).toBeInTheDocument()
      expect(dialog).toBeInTheDocument()
      expect(message).toBeInTheDocument()
      expect(oKButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })

    it('should render without scenarios', () => {
      setUp({ scenarios: [] })
      const header = screen.getByText('DELETE SCENARIOS')
      const dialog = screen.getByRole('dialog')
      const message = screen.getByText('There are not scenarios to be deleted')

      expect(header).toBeInTheDocument()
      expect(dialog).toBeInTheDocument()
      expect(message).toBeInTheDocument()
    })
  })
})
