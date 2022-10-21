import { Auth } from 'aws-amplify'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { TagsForm } from '../../../../src/views/TagsView/Components/TagsForm'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const defaultProps = {
  companies: [
    {
      id: '1',
      name: 'Test Company'
    },
    {
      id: '2',
      name: 'Sample Company'
    }
  ],
  onCancel: jest.fn(),
  handleTagChange: jest.fn(),
  handleCompaniesChange: jest.fn(),
  onSave: jest.fn(),
  tag: 'Tag Name',
  companiesSelected: [{
    id: '1',
    name: 'Test Company'
  }]
}

const setUp = (props) => {
  render(<TagsForm {...defaultProps} {...props}/>)
}

describe('<TagsForm />', () => {
  describe('render', () => {
    it('Should render tags form', () => {
      setUp()

      const addButton = screen.getByText('Add Tag')
      const saveButton = screen.getByText('Save')
      const cancelButton = screen.getByText('Cancel')
      const tagInput = screen.getByText('Tag Name')
      const companiesAutocomplete = screen.getByRole('combobox')

      expect(addButton).toBeInTheDocument()
      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
      expect(tagInput).toBeInTheDocument()
      expect(companiesAutocomplete).toBeInTheDocument()
    })
  })

  describe('handleChange events', () => {
    it('should call handleTagChange with textfield', () => {
      setUp()
      const textfield = screen.getByRole('textbox')

      fireEvent.change(textfield, { target: { value: 'Education' } })
      expect(defaultProps.handleTagChange).toHaveBeenCalled()
    })

    it('should call handleCompaniesChange with autocomplete', () => {
      setUp()

      const autocomplete = screen.getByRole('combobox')
      fireEvent.change(autocomplete, { target: { value: 'Test Company' } })
      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
      fireEvent.keyDown(autocomplete, { key: 'Enter' })

      expect(defaultProps.handleCompaniesChange).toHaveBeenCalled()
    })
  })
})
