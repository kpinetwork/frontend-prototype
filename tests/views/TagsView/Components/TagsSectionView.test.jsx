import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TagsSectionView } from '../../../../src/views/TagsView/Components/TagsSectionView'
import useTagsSections from '../../../../src/hooks/useTagsSections'
import useTagsTable from '../../../../src/hooks/useTagsTable'
import { NOTHING_TO_CHANGE, UPDATE_TAGS_SUCCESS } from '../../../../src/utils/constants/tagsError'

jest.mock('../../../../src/hooks/useTagsTable')
jest.mock('../../../../src/hooks/useTagsSections')

const tags = {
  123: { id: 123, name: 'Tag Sample', companies: [] },
  124: { id: 124, name: 'Fashion', companies: [] }
}

const ADD_TAGS_RESPONSES = {
  added_response: { added: true },
  fail_response: { error: "Can't add tag" }
}

const UPDATE_TAGS_RESPONSES = {
  updated_response: { updated: true },
  fail_response: { error: "Can't update tag" }
}

const DELETE_TAGS_RESPONSES = {
  deleted_response: { deleted: 1 },
  fail_response: { error: "Can't delete tags" }
}

const tableHookResponse = {
  handleChangePage: jest.fn(),
  handleChangePageSize: jest.fn(),
  addTag: () => ADD_TAGS_RESPONSES.added_response,
  setOpenAdd: jest.fn(),
  setTagName: jest.fn(),
  setCompaniesSelected: jest.fn(),
  total: 2,
  isLoading: false,
  allowActions: true,
  actionWaiting: false,
  pageSize: 10,
  page: 0,
  tags: JSON.parse(JSON.stringify(Object.values(tags))),
  data: JSON.parse(JSON.stringify(tags)),
  initialData: JSON.parse(JSON.stringify(tags)),
  setData: jest.fn(),
  updateTagsInfo: () => UPDATE_TAGS_RESPONSES.updated_response,
  tagsToDelete: [],
  setTagsToDelete: jest.fn(),
  onDeleteTags: () => DELETE_TAGS_RESPONSES.deleted_response,
  setIsLoading: jest.fn()
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

      const addButton = screen.getByText('Add tag')
      const editButton = screen.getByText('Edit tags')
      const deleteButton = screen.getByText('Delete tags')

      expect(addButton).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      expect(deleteButton).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Should open form when click on Add Tag button', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Add tag' })))

      expect(screen.getByText('Add Tag')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('Click on save should call add service', async () => {
      useTagsSections.mockImplementation(() => hookResponse)
      useTagsTable.mockImplementation(() => tableHookResponse)
      setUp()

      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Add tag' })) })
      await waitFor(() => { fireEvent.change(screen.getByPlaceholderText('Tag name'), { target: { value: 'Tag' } }) })
      await waitFor(() => { fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Company Name' } }) })
      await waitFor(() => { fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' }) })
      await waitFor(() => { fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' }) })
      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })

      const message = screen.getByText('Tag added successfully')

      expect(message).toBeInTheDocument()
    })

    it('should show an error when save service fails', async () => {
      useTagsSections.mockImplementation(() => hookResponse)
      useTagsTable.mockImplementation(() => ({ ...tableHookResponse, addTag: () => ADD_TAGS_RESPONSES.fail_response }))
      setUp()

      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Add tag' })) })
      await waitFor(() => { fireEvent.change(screen.getByPlaceholderText('Tag name'), { target: { value: 'Tag' } }) })
      await waitFor(() => { fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Company Name' } }) })
      await waitFor(() => { fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' }) })
      await waitFor(() => { fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' }) })
      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })

      const message = screen.getByText("Can't add tag")

      expect(message).toBeInTheDocument()
    })

    it('Should close form when click on Cancel', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()
      let cancelButton

      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Add tag' })) })
      await waitFor(() => { cancelButton = screen.getByRole('button', { name: 'Cancel' }) })
      await waitFor(() => { fireEvent.click(cancelButton) })

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should enable edition when click on Edit Tags button', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit tags' }))

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('Should disable edition when click on cancel', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()
      let cancelButton

      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Edit tags' })) })
      await waitFor(() => { cancelButton = screen.getByRole('button', { name: 'Cancel' }) })
      await waitFor(() => { fireEvent.click(cancelButton) })

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should open snackbar when save edited values click without changes', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Edit tags' })) })
      await waitFor(() => { fireEvent.doubleClick(screen.getByRole('cell', { name: 'Tag Sample' })) })
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Save' })))

      expect(screen.getByText(NOTHING_TO_CHANGE)).toBeInTheDocument()
    })

    it('Should close snackbar when click outside of the snackbar', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Edit tags' })) })
      await waitFor(() => { fireEvent.doubleClick(screen.getByRole('cell', { name: 'Tag Sample' })) })
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Save' })))

      const message = await screen.queryByText(UPDATE_TAGS_SUCCESS)
      const closeMessage = screen.getByRole('button', { name: 'Close' })
      fireEvent.click(closeMessage)

      waitFor(() => { expect(message).not.toBeInTheDocument() })
    })

    it('Should enable tags checkbox selection when click on Delete Tags button', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Delete tags' })) })
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })

    it('Should disable tags checkbox selection for deleting when click on Cancel', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete tags' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      await waitFor(() => { fireEvent.click(cancelButton) })

      expect(cancelButton).not.toBeInTheDocument()
      expect(tableHookResponse.setTagsToDelete).toHaveBeenCalled()
    })
  })

  describe('update tags', () => {
    it('Should call updateTagsInfo when click on Save and tag changed', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Edit tags' })) })
      await waitFor(() => { fireEvent.doubleClick(screen.getByRole('cell', { name: 'Tag Sample' })) })
      await waitFor(() => { fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Science' } }) })
      await waitFor(() => fireEvent.click(screen.getByRole('cell', { name: 'Fashion' })))
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Save' })))

      const errorMessage = screen.getByText(UPDATE_TAGS_SUCCESS)

      expect(errorMessage).toBeInTheDocument()
    })
  })

  describe('delete tags', () => {
    it('Should open dialog when click on Save with tags selected', async () => {
      useTagsTable.mockImplementation(() => ({ ...tableHookResponse, tagsToDelete: [123] }))
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete tags' }))
      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })

      expect(screen.getByRole('dialog')).toBeVisible()
    })

    it('Should close dialog when click on Cancel for comfirmation', async () => {
      useTagsTable.mockImplementation(() => ({ ...tableHookResponse, tagsToDelete: [123] }))
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete tags' }))
      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'No' })))

      expect(screen.getByRole('dialog')).not.toBeVisible()
    })

    it('Should call onDeleteTags when click on Ok in comfirmation for deleting', async () => {
      useTagsTable.mockImplementation(() => ({ ...tableHookResponse, tagsToDelete: [123] }))
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete tags' }))
      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Yes' })))

      const message = screen.getByText('The tags were deleted successfully')

      expect(message).toBeInTheDocument()
    })

    it('Should show the erroe message when click on Ok in comfirmation for deleting but service fails', async () => {
      useTagsTable.mockImplementation(() => ({ ...tableHookResponse, tagsToDelete: [123], onDeleteTags: () => DELETE_TAGS_RESPONSES.fail_response }))
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete tags' }))
      await waitFor(() => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Yes' })))

      const message = screen.getByText("Can't delete tags")

      expect(message).toBeInTheDocument()
    })
  })
})
