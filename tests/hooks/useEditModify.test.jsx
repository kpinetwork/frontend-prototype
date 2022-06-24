import { renderHook, act } from '@testing-library/react-hooks'
import { getEditModifyData, updateEditModifyData, deleteScenarios } from '../../src/service/editModifyData'
import { useEditModify } from '../../src/hooks/useEditModify'

const serviceGetResponse = {
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

const servicePostResponse = {
  edited: true,
  added: []
}

const mockModifyData = jest.fn()

const mockHook = {
  head: [
    ['Unique ID', 'Name', 'Sector', 'Vertical', 'Investor Profile', 'Actuals'],
    ['', '', '', '', '', 'Revenue'],
    ['', '', '', '', '', '2020']
  ],
  body: [
    {
      id: 123,
      name: 'Sample Company',
      sector: '',
      vertical: '',
      inves_profile_name: '',
      scenarios: [
        {}
      ]
    }
  ],
  modifyData: mockModifyData
}

jest.mock('../../src/service/editModifyData')

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useEditModify', () => {
  it('edit modify hook should return data', async () => {
    const expectedResponse = JSON.parse(JSON.stringify(serviceGetResponse))
    mockService(getEditModifyData, expectedResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })

    expect(hookResponse.result.current.head).toEqual(mockHook.head)
    expect(hookResponse.result.current.body).toEqual(mockHook.body)
  })

  it('edit modify hook should return error', async () => {
    mockService(getEditModifyData, 'error')

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })

    expect(hookResponse.result.current.head).toEqual([])
    expect(hookResponse.result.current.body).toEqual([])
  })

  it('edit modify hook when call reset should return init data', async () => {
    const expectedResponse = JSON.parse(JSON.stringify(serviceGetResponse))
    mockService(getEditModifyData, expectedResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })
    hookResponse.result.current.body[0].name = 'Sample Company Test'
    await act(async () => {
      hookResponse.result.current.resetData()
    })

    expect(hookResponse.result.current.body).toEqual(mockHook.body)
  })

  it('edit modify hook should return edited true when call modify with edit data', async () => {
    const expectedResponse = JSON.parse(JSON.stringify(servicePostResponse))
    mockService(updateEditModifyData, expectedResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })
    act(() => {
      hookResponse.result.current.setChangeObject({ 123: { id: 123, description: { name: 'Sample Company 2' }, scenarios: [] } })
    })
    await act(async () => {
      await hookResponse.result.current.updateEditData()
    })

    expect(hookResponse.result.current.updated).toBeTruthy()
    expect(hookResponse.result.current.recordsAdded).toEqual([])
  })

  it('edit modify hook should return records added when call modify with added', async () => {
    const addObject = {
      123: [{ scenario: 'Actuals', year: 2020, metric: 'Revenue', value: '47' }],
      124: []
    }
    const expectedResponse = JSON.parse(JSON.stringify(servicePostResponse))
    expectedResponse.added = {
      123: [
        { scenario: addObject.scenario, metric: addObject.metric, added: true }
      ]
    }
    mockService(updateEditModifyData, expectedResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })
    act(() => {
      hookResponse.result.current.setAddObject(addObject)
    })
    await act(async () => {
      await hookResponse.result.current.updateEditData()
    })

    expect(hookResponse.result.current.updated).toBeTruthy()
    expect(hookResponse.result.current.recordsAdded).toEqual(expectedResponse.added)
  })

  it('edit modify hook should update deleted when call modify with delete records', async () => {
    const deleteObject = {
      123: { scenarios: [{ scenario: 'Actuals', year: 2020, metric: 'Revenue', value: '47' }] },
      124: { scenarios: [] }
    }
    const expectedResponse = {}
    expectedResponse['scenarios deleted'] = 1
    mockService(deleteScenarios, expectedResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })
    act(() => {
      hookResponse.result.current.setDeleteObject(deleteObject)
    })
    await act(async () => {
      await hookResponse.result.current.updateEditData()
    })

    expect(hookResponse.result.current.deleted).toEqual(1)
  })

  it('edit modify hook should update message error when modify fails', async () => {
    const deleteObject = {
      123: { scenarios: [{ scenario: 'Actuals', year: 2020, metric: 'Revenue', value: '47' }] },
      124: { scenarios: [] }
    }
    const expectedResponse = {}
    expectedResponse['scenarios deleted'] = 1
    mockService(deleteScenarios, expectedResponse)
    mockService(updateEditModifyData, 'error')

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })
    act(() => {
      hookResponse.result.current.setDeleteObject(deleteObject)
    })
    await act(async () => {
      await hookResponse.result.current.updateEditData()
    })

    expect(hookResponse.result.current.errorMessage).toEqual('Cannot modify records, please try again')
  })
})
