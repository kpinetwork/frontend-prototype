import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TagsSectionView } from '../../../../src/views/TagsView/Components/TagsSectionView'
import useTagsSections from '../../../../src/hooks/useTagsSections'
import useTagsTable from '../../../../src/hooks/useTagsTable'
import { NOTHING_TO_CHANGE, UPDATE_ERROR } from '../../../../src/utils/constants/tagsError'
import { ESCAPE } from '../../../keyEventCodes'

jest.mock('../../../../src/hooks/useTagsTable')
jest.mock('../../../../src/hooks/useTagsSections')

const tags = {
  123: { id: 123, name: 'Tag Sample', companies: [] },
  124: { id: 124, name: 'Fashion', companies: [] }
}

const tableHookResponse = {
  handleChangePage: jest.fn(),
  handleChangePageSize: jest.fn(),
  addTag: jest.fn(),
  setOpenAdd: jest.fn(),
  setTagName: jest.fn(),
  setCompaniesSelected: jest.fn(),
  total: 2,
  isLoading: false,
  allowActions: true,
  pageSize: 10,
  page: 0,
  tags: JSON.parse(JSON.stringify(Object.values(tags))),
  data: JSON.parse(JSON.stringify(tags)),
  initialData: JSON.parse(JSON.stringify(tags)),
  setData: jest.fn(),
  updateTagsInfo: jest.fn(),
  errorMessage: null,
  setErrorMessage: jest.fn()
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
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Add Tag' })))

      expect(screen.getByText('Add Tag')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('Click on save should call service', async () => {
      useTagsSections.mockImplementation(() => hookResponse)
      useTagsTable.mockImplementation(() => tableHookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Tag' }))
      fireEvent.change(screen.getByPlaceholderText('Tag name'), { target: { value: 'Tag' } })
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Company Name' } })
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' })
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' })
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))

      expect(tableHookResponse.addTag).toBeCalled()
    })

    it('Should close form when click on Cancel', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Add Tag' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should enable edition when click on Edit Tags button', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('Should disable edition when click on cancel', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should open snackbar when save edited values click without changes', async () => {
      tableHookResponse.updateTagsInfo.mockReturnValue(UPDATE_ERROR)
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      fireEvent.doubleClick(screen.getByRole('cell', { name: 'Tag Sample' }))
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Save' })))

      expect(screen.getByRole('presentation')).toBeInTheDocument()
      expect(screen.getByText(NOTHING_TO_CHANGE)).toBeInTheDocument()
    })

    it('Should close snackbar when click outside of the snackbar', async () => {
      tableHookResponse.updateTagsInfo.mockReturnValue(UPDATE_ERROR)
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      fireEvent.doubleClick(screen.getByRole('cell', { name: 'Tag Sample' }))
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Save' })))
      await waitFor(() => fireEvent.keyDown(screen.getByRole('presentation'), ESCAPE))

      expect(screen.getByRole('presentation')).not.toHaveFocus()
    })

    it('Should enable deletion when click on Delete Tags button', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })

      expect(saveButton).toBeInTheDocument()
      expect(cancelButton).toBeInTheDocument()
    })

    it('Should disable deletion when click on Cancel', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelButton)

      expect(cancelButton).not.toBeInTheDocument()
    })

    it('Should delete tags when click on Save', () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Delete Tags' }))
      const saveButton = screen.getByRole('button', { name: 'Save' })
      fireEvent.click(saveButton)

      expect(saveButton).toBeInTheDocument()
    })
  })

  describe('update tags', () => {
    it('Should call updateTagsInfo when click on Save and tag changed', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      fireEvent.click(screen.getByRole('button', { name: 'Edit Tags' }))
      fireEvent.doubleClick(screen.getByRole('cell', { name: 'Tag Sample' }))
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Science' } })
      await waitFor(() => fireEvent.click(screen.getByRole('cell', { name: 'Fashion' })))
      await waitFor(() => fireEvent.click(screen.getByRole('button', { name: 'Save' })))

      expect(tableHookResponse.updateTagsInfo).toHaveBeenCalled()
    })
  })
})
