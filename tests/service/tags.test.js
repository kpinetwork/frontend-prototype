import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getTags, updateTags } from '../../src/service/tags'
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

  describe('update tags', () => {
    it('should return if the tags were updated', async () => {
      axios.put.mockResolvedValueOnce(updateTagsResponse)
      await updateTags({})

      expect(axios.put).toHaveBeenCalledWith(tagsUrl, {},
        { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
