import { Auth } from 'aws-amplify'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TagsSectionView } from '../../../../src/views/TagsView/Components/TagsSectionView'
import useTagsSections from '../../../../src/hooks/useTagsSections'
import useTagsTable from '../../../../src/hooks/useTagsTable'

jest.mock('../../../../src/hooks/useTagsSections')
jest.mock('../../../../src/hooks/useTagsTable')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const tableHookResponse = {
  addTag: jest.fn(),
  setOpenAdd: jest.fn(),
  setTagName: jest.fn(),
  setCompaniesSelected: jest.fn(),
  total: 1,
  isLoading: false,
  tags: [{ id: '123', name: 'Tag Sample', companies: [] }]
}

const hookResponse = {
  total: 1,
  companies: { 1: 'Sample company abc', 2: 'Sample company xyz' },
  companiesArray: [
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
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
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
    it('Should open form when click on Add Tag button', async () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Add Tag' })))

      expect(screen.getByText('Add Tag')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('Click on save should call service', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)

      setUp()
      fireEvent.click(screen.getByRole('button', { name: 'Add Tag' }))
      fireEvent.change(screen.getByPlaceholderText('Tag name'), { target: { value: 'Tag' } })
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))
      expect(tableHookResponse.addTag).toBeCalled()
    })

    it('Should close form when click on Cancel', async () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Tag' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should enable edition when click on Edit Tags button', () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('Should disable edition when click on cancel', () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should edit data when click on save before click on Edit tags', () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(saveButton).toBeInTheDocument()
    })

    it('Should enable deletion when click on Delete Tags button', () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })

    it('Should disable deletion when click on Cancel', () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should delete tags when click on Save', () => {
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(saveButton).toBeInTheDocument()
    })
  })
})
