import { Auth } from 'aws-amplify'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { TagsForm } from '../../../../src/views/TagsView/Components/TagsForm'
import useTagsForm from '../../../../src/hooks/useTagsForm'

jest.mock('../../../../src/hooks/useTagsForm')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const hookResponse = {
  companies: [
    {
      id: '1',
      name: 'Test Company'
    },
    {
      id: '2',
      name: 'Sample Company'
    }
  ]
}

const setUp = () => {
  render(
      <TagsForm />
  )
}

describe('<TagsForm />', () => {
  describe('render', () => {
    it('Should render tags form', () => {
      useTagsForm.mockImplementation(() => hookResponse)
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

  describe('onChange events', () => {
    it('should call onChange with textfield', () => {
      setUp()
      const textfield = screen.getByRole('textbox')

      fireEvent.change(textfield, { target: { value: 'Education' } })

      expect(screen.getByDisplayValue('Education')).toBeInTheDocument()
    })

    it('should call onChange with autocomplete', () => {
      setUp()

      const autocomplete = screen.getByRole('combobox')
      fireEvent.change(autocomplete, { target: { value: 'Test Company' } })
      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
      fireEvent.keyDown(autocomplete, { key: 'Enter' })

      expect(screen.getByText('Test Company')).toBeInTheDocument()
    })
  })
})
