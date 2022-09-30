import { Auth } from 'aws-amplify'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { TagsSectionView } from '../../../../src/views/TagsView/Components/TagsSectionView'
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
      id: 'id',
      name: 'Test Company'
    }
  ]
}

const setUp = () => {
  render(
      <TagsSectionView />
  )
}

describe('<TagsSectionView />', () => {
  describe('render', () => {
    it('Should render tags section view ', () => {
      setUp()

      const addButton = screen.getByText('Add Tag')
      const editButton = screen.getByText('Edit Tags')
      const deleteButton = screen.getByText('Delete Tags')

      expect(addButton).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      expect(deleteButton).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should open form when click on Add Tag button', () => {
      useTagsForm.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Tag' }))

      expect(screen.getByText('Add Tag')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('Should close form when click on Cancel', async () => {
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Tag' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should enable edition when click on Edit Tags button', () => {
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))

      expect(screen.getByRole('cell', { name: 'Fashion' })).toHaveClass('MuiDataGrid-cell MuiDataGrid-cell--textLeft MuiDataGrid-cell--editable')
    })

    it('Should disable edition when click on cancel', () => {
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should edit data when click on save before click on Edit tags', () => {
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(saveButton).toBeInTheDocument()
    })

    it('Should enable deletion when click on Delete Tags button', () => {
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })

    it('Should disable deletion when click on Cancel', () => {
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should delete tags when click on Save', () => {
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(saveButton).toBeInTheDocument()
    })
  })
})
