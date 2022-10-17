import React from 'react'
import { Auth } from 'aws-amplify'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { TagsView } from '../../../src/views/TagsView/TagsView'
import useTagsTable from '../../../src/hooks/useTagsTable'
import useTagsSections from '../../../src/hooks/useTagsSections'

jest.mock('../../../src/hooks/useTagsTable')
jest.mock('../../../src/hooks/useTagsSections')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const tableHookResponse = {
  total: 1,
  isLoading: false,
  tags: [{ id: '123', name: 'Tag Sample', companies: [] }]
}

const hookResponse = {
  total: 1,
  companies: [
    {
      id: 'id',
      name: 'Test Company'
    }
  ]
}

const setUp = () => {
  render(
      <TagsView />
  )
}

describe('<TagsView />', () => {
  describe('render', () => {
    it('Should render tags view components', async () => {
      useTagsTable.mockImplementation(() => tableHookResponse)
      useTagsSections.mockImplementation(() => hookResponse)
      setUp()

      const title = screen.getAllByText('Tags')

      expect(title).toHaveLength(2)
    })
  })
})
