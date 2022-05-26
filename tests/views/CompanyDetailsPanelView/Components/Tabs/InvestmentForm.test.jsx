import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { InvestmentForm } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/InvestmentForm'

const defaultProps = {
  edit: false,
  onCancel: jest.fn(),
  error: undefined,
  onChange: jest.fn(),
  investment: {},
  onSave: jest.fn(),
  rounds: []
}

const setUp = (props) => {
  render(<InvestmentForm {...defaultProps} {...props}/>)
}

describe('<InvestmentForm />', () => {
  describe('render component', () => {
    it('should render', () => {
      setUp()

      const header = screen.getByText('Add investment')
      const fields = screen.getAllByRole('textbox')
      const buttons = screen.getAllByRole('button')

      expect(header).toBeInTheDocument()
      expect(fields.length > 0).toBeTruthy()
      expect(buttons.length > 0).toBeTruthy()
    })
  })

  describe('Actions', () => {
    it('it calls onCancel on click cancel button', () => {
      setUp()
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      fireEvent.click(cancelButton)

      expect(defaultProps.onCancel).toHaveBeenCalled()
    })

    it('it class onSave on click save button', () => {
      setUp()
      const saveButton = screen.getByRole('button', { name: 'Save' })

      fireEvent.click(saveButton)

      expect(defaultProps.onSave).toHaveBeenCalled()
    })
  })

  describe('onChange events', () => {
    it('should call onChange with inputs', () => {
      setUp()
      const investInput = screen.getByPlaceholderText('Investment date')

      fireEvent.change(investInput, { target: { value: '2020-09' } })

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('should call onChange with textfield', () => {
      setUp()
      const textfield = screen.getByRole('textbox')

      fireEvent.change(textfield, { target: { value: 'Investor' } })

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('should call onChange with selects', () => {
      setUp()
      const buttons = screen.getAllByRole('button')
      const selects = buttons.filter(button => !(['Save', 'Cancel'].includes(button.textContent)))

      selects.forEach(select => {
        fireEvent.mouseDown(select)
        fireEvent.click(screen.getAllByRole('option')[0])
      })

      expect(defaultProps.onChange).toBeCalledTimes(selects.length)
    })

    it('should call onChange with selects when round is not default', () => {
      setUp({ rounds: [1] })
      const buttons = screen.getAllByRole('button')
      const selects = buttons.filter(button => !(['Save', 'Cancel'].includes(button.textContent)))

      selects.forEach(select => {
        fireEvent.mouseDown(select)
        fireEvent.click(screen.getAllByRole('option')[0])
      })

      expect(defaultProps.onChange).toBeCalledTimes(selects.length)
    })
  })

  describe('with edit option', () => {
    it('should render divest option', () => {
      setUp({ edit: true })

      const divestInput = screen.getByPlaceholderText('Divestment date')

      expect(divestInput).toBeInTheDocument()
    })

    it('should call onChange on click on divest', () => {
      setUp({ edit: true })
      const divestInput = screen.getByPlaceholderText('Divestment date')

      fireEvent.change(divestInput, { target: { value: '2020-01' } })

      expect(defaultProps.onChange).toBeCalled()
    })
  })

  describe('with error message', () => {
    it('should display error message', () => {
      const text = 'Invesmet date invalid'
      setUp({ error: text })

      const errorText = screen.getByText(text)

      expect(errorText).toBeInTheDocument()
    })
  })
})
