import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getTags, addTags, updateTags, deleteTags } from '../../src/service/tags'
const { VITE_HOST: baseUrl } = import.meta.env

const tags = {
  total: 2,
  tags: [{ id: '1', name: 'Tag' }]
}

const updateTagsResponse = {
  updated: true
}

const tagsUrl = `${baseUrl}/tags`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('tags service', () => {
  describe('get tags', () => {
    it('API call success should return all tags', async () => {
      axios.get.mockResolvedValueOnce(tags)
      await getTags({ limit: 10, offset: 10 })

      expect(axios.get).toHaveBeenCalledWith(`${tagsUrl}?limit=10&offset=10`, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })

  describe('add tag', () => {
    it('API call successful should add tag', async () => {
      const tagResponse = {
        id: '1',
        name: 'Tag Name',
        companies: ['1', '2'],
        added: true
      }
      axios.post.mockResolvedValueOnce({
        data: {
          tag: tagResponse
        }
      })
      await addTags('Tag Name', ['1', '2'])

      expect(axios.post).toHaveBeenCalledWith(`${tagsUrl}`, { name: 'Tag Name', companies: ['1', '2'] }, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })

    it('Add tag api call fails should return error message', async () => {
      axios.post.mockRejectedValueOnce({ response: 'Tag could not be added' })

      await addTags('Tag Name', ['1']).catch(err => {
        expect(err).toEqual({ error: 'Tag could not be added' })
      })
    })
  })

  describe('update tags', () => {
    it('should return if the tags were updated when api call is successful', async () => {
      axios.put.mockResolvedValueOnce(updateTagsResponse)
      await updateTags({})

      expect(axios.put).toHaveBeenCalledWith(tagsUrl, {},
        { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })

    it('Update tags api call fails should return error message', async () => {
      axios.put.mockRejectedValueOnce({ response: 'Tags could not be updated' })

      await updateTags({}).catch(err => {
        expect(err).toEqual({ error: 'Tags could not be updated' })
      })
    })
  })

  describe('delete tags', () => {
    it('should return if the tags were deleted when api call is successful', async () => {
      const tagsToDelete = ['1']
      axios.delete.mockResolvedValueOnce({ deleted: true })
      await deleteTags(tagsToDelete)

      expect(axios.delete).toHaveBeenCalledWith(tagsUrl,
        {
          headers: { Authorization: null, 'Content-Type': 'application/json' },
          data: tagsToDelete
        })
    })

    it('Delete tags api call fails should return error message', async () => {
      axios.delete.mockRejectedValueOnce({ response: 'Tags could not be deleted' })

      await deleteTags({}).catch(err => {
        expect(err).toEqual({ error: 'Tags could not be deleted' })
      })
    })
  })
})
