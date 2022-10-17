import axios from 'axios'
import { Auth } from 'aws-amplify'
import { TAG } from '../data/companies'
import { addTags } from '../../src/service/tags'

const { VITE_HOST: baseUrl } = import.meta.env

const companiesUrl = `${baseUrl}/tags`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('tags service', () => {
  describe('add tag', () => {
    it('API call successful should add tag', async () => {
      axios.post.mockResolvedValueOnce({
        data: {
          tag: {
            id: TAG.id,
            name: TAG.name,
            companies: ['1', '2'],
            added: true
          }
        }
      })
      await addTags(TAG.name, ['1', '2'])

      expect(axios.post).toHaveBeenCalledWith(`${companiesUrl}/tags`, { name: TAG.name, companies: ['1', '2'] }, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
