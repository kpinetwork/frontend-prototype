import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getTags, addTags } from '../../src/service/tags'

const tags = {
  total: 2,
  tags: [{ id: '1', name: 'Tag' }]
}
const { VITE_HOST: baseUrl } = import.meta.env

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
  })
})
