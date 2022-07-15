import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { ScenarioForm } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/ScenarioForm'
import { BASEMETRICS } from '../../../../../src/utils/constants/Metrics'

const defaultProps = {
  onCancel: jest.fn(),
  error: undefined,
  onChange: jest.fn(),
  scenario: {},
  onSave: jest.fn(),
  metrics: BASEMETRICS.map(metric => metric.name)
}

const setUp = (props) => {
  render(<ScenarioForm {...defaultProps} {...props}/>)
}

describe('<ScenarioForm />', () => {
  describe('render component', () => {
    it('should render', () => {
      setUp()

      const header = screen.getByText('Add scenario')
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
    it('should call onChange with textfield', () => {
      setUp()
      const textfield = screen.getByPlaceholderText('metric value')

      fireEvent.change(textfield, { target: { value: '30' } })

      expect(defaultProps.onChange).toHaveBeenCalled()
    })

    it('should call onChange with textfield invalid value', () => {
      setUp()
      const textfield = screen.getByPlaceholderText('metric value')

      fireEvent.change(textfield, { target: { value: 'value' } })

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

    it('should call onChange with pick year', () => {
      setUp()
      const year = screen.getByPlaceholderText('year')
      fireEvent.click(year)
      fireEvent.click(screen.getByRole('button', { name: '2023' }))

      expect(defaultProps.onChange).toHaveBeenCalled()
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
