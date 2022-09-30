import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { TagsView } from '../../../src/views/TagsView/TagsView'

const setUp = () => {
  render(
      <TagsView />
  )
}

describe('<TagsView />', () => {
  describe('render', () => {
    it('Should render tags view components', () => {
      setUp()

      const title = screen.getAllByText('Tags')

      expect(title).toHaveLength(2)
    })
  })
})
