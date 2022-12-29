import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import EditModifyTable from '../../../../src/views/EditModify/Components/EditModifyTable'
import { useEditModify } from '../../../../src/hooks/useEditModify'
import { body, head } from '../../../data/editModify'

jest.mock('../../../../src/hooks/useEditModify')

const customHookResponse = {
  body: null,
  head: [],
  isLoading: false,
  modifying: false,
  updateEditData: jest.fn()
}
const hookResponse = {
  body: body,
  head: head,
  isLoading: false,
  modifying: false,
  updateEditData: jest.fn()
}

const setUp = () => {
  render(
      <EditModifyTable/>
  )
}

describe('<EditModifyTable />', () => {
  describe('render', () => {
    it('Should render table inside container when send valid body', () => {
      useEditModify.mockImplementation(() => hookResponse)
      setUp()

      expect(screen.getByTestId('edit-modify-table-container')).toBeInTheDocument()
    })
    it('Should render table inside container when send null body', () => {
      useEditModify.mockImplementation(() => customHookResponse)
      setUp()

      expect(screen.getByTestId('edit-modify-table-container')).toBeInTheDocument()
    })

    it('Should not call edit button when there are not changes', () => {
      useEditModify.mockImplementation(() => hookResponse)
      const onBulkUpdate = jest.fn()
      render(<EditModifyTable onBulkUpdate={onBulkUpdate} />)

      const form = screen.getByTitle('Edit All')
      fireEvent.click(form)
      const button = screen.getByTitle('Save all changes')
      fireEvent.click(button)

      expect(onBulkUpdate).toBeCalledTimes(0)
    })
  })
})
