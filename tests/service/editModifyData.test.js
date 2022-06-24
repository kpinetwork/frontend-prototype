import axios from 'axios'
import { Auth } from 'aws-amplify'
import { getEditModifyData, updateEditModifyData, deleteScenarios } from '../../src/service/editModifyData'
const { VITE_HOST: baseUrl } = import.meta.env

const editModifyPath = `${baseUrl}/edit_modify`
const deleteScenarioPath = `${baseUrl}/companies/{}/scenarios?from_details=${false}`

jest.mock('axios')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const editModifyData = {
  headers: ['Unique ID', 'Name', 'Sector', 'Vertical', 'Investor Profile', 'Actuals'],
  metrics: ['', '', '', '', '', 'Revenue'],
  years: ['', '', '', '', '', '2020'],
  companies: {
    123: {
      id: 123,
      name: 'Sample Company',
      sector: '',
      vertical: '',
      inves_profile_name: '',
      scenarios: [
        {}
      ]
    }
  }
}

const updateData = {
  edit: [
    {
      id: 123,
      description: { name: 'Sample Company 2' },
      scenarios: []
    }
  ],
  add: []
}

const deleteData = {
  scenarios: [
    {}
  ]
}

describe('editModify service', () => {
  describe('getEditModifyData', () => {
    it('API call successful should return edit modify data', async () => {
      axios.get.mockResolvedValueOnce(editModifyData)
      await getEditModifyData()

      expect(axios.get).toHaveBeenCalledWith(editModifyPath, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })

  describe('updateEditModifyData', () => {
    it('API call successful should return response update modify data', async () => {
      axios.put.mockResolvedValueOnce({ edited: true, added: [] })
      await updateEditModifyData(updateData)

      expect(axios.put).toHaveBeenCalledWith(editModifyPath, updateData, { headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })

  describe('deleteScenarios', () => {
    it('API call successful should return response delete scenarios', async () => {
      axios.delete.mockResolvedValueOnce({ 'scenarios deleted': 0 })
      await deleteScenarios(deleteData)

      expect(axios.delete).toHaveBeenCalledWith(deleteScenarioPath, { data: deleteData, headers: { Authorization: null, 'Content-Type': 'application/json' } })
    })
  })
})
