import { renderHook, act } from '@testing-library/react-hooks'
import { getEditModifyData, updateEditModifyData, deleteScenarios } from '../../src/service/editModifyData'
import { useEditModify } from '../../src/hooks/useEditModify'
import { getCompanies } from '../../src/service/company'

const serviceGetResponse = {
  headers: ['Unique ID', 'Name', 'Sector', 'Vertical', 'Investor Profile', 'Actuals', '', '', '', ''],
  metrics: ['', '', '', '', '', 'Revenue', '', '', '', ''],
  years: ['', '', '', '', '', '2020', '', '', '', ''],
  periods: ['', '', '', '', '', 'Q1', 'Q2', 'Q3', 'Q4', 'Full-year'],
  companies: {
    123: {
      id: 123,
      name: 'Sample Company',
      sector: '',
      vertical: '',
      inves_profile_name: '',
      scenarios: [
        {},
        {},
        {},
        {},
        {}
      ]
    }
  }
}
const mockModifiedData = {
  add: [
    {
      year: 2021,
      metric: 'Sales & marketing',
      scenario: 'Actuals',
      company_id: '58d65dd5-3e72-4f9f-8bf5-3f74f2914b68',
      value: 25
    }
  ],
  edit: [
    {
      id: 'b3795b48-303f-4b8c-b9bd-b3839a26e220',
      description: {
        name: 'AMT TECH',
        inves_profile_name: 'Private equity'
      },
      scenarios: [
        {
          metric_id: '0a6c8724-9353-45b1-ac82-c6a18098167c',
          value: 119
        },
        {
          metric_id: 'e2f42171-5be7-4e94-a3dd-bd2276ceb8a4',
          value: 150
        },
        {
          metric_id: 'e05c0943-307f-479b-acf4-b3cefb6c6885',
          value: 120
        },
        {
          metric_id: '754a563a-b63d-4afa-b137-5b769163cd24',
          value: 50
        },
        {
          metric_id: '6ffe90c3-7ad7-4ef2-b6a2-6e3d571c690d',
          value: 300
        },
        {
          metric_id: '1f7c00cf-1f21-4f79-aef7-564c4039b88d',
          value: 70
        },
        {
          metric_id: '2a043235-c423-4e9c-9992-9b4472ae35f4',
          value: 200
        },
        {
          metric_id: '1bafd6b2-3c19-47db-b603-a03446e4fbb1',
          value: 220
        },
        {
          metric_id: '82c102c3-c65d-46e9-958a-a4c190781ba6',
          value: 10
        },
        {
          metric_id: '1eefc5c0-e010-4b47-91cc-83d7819f40ee',
          value: 8
        },
        {
          metric_id: 'f32a862e-0189-41e3-a818-8ae38add6b25',
          value: 2
        },
        {
          metric_id: '5ed2e68c-8b61-4e13-867a-3ecd3af07823',
          value: 26
        },
        {
          metric_id: '8af27107-2aca-4a07-8858-8e25883edb74',
          value: 129
        },
        {
          metric_id: '81a49219-cb62-4535-a79c-33a4d23e0b04',
          value: 69
        },
        {
          metric_id: '2c2a9f01-5869-4bb0-a6a2-b7955cd31433',
          value: 61
        },
        {
          metric_id: 'bc6cc340-8745-43d3-8406-3eb6c9ba0a30',
          value: 82
        },
        {
          metric_id: '5cffc2da-7876-46cd-9f13-45a1ce88fee2',
          value: 30
        },
        {
          metric_id: '59180f57-4f6f-4ec1-8ce0-f26d1d046060',
          value: 9
        },
        {
          metric_id: '69f188d0-e679-47b0-8da5-4e332d4f9c3e',
          value: 5
        },
        {
          metric_id: '49645c81-b659-40ae-8420-b445f09dbd6d',
          value: 7
        }
      ]
    }
  ],
  delete: [
    {
      metric_id: '19b3b8e2-3df2-4206-b1ce-946f64c695ba',
      scenario_id: '9b40c739-91b1-4ba7-a545-7b394ddbfdd0'
    }
  ]
}

const serviceCompanies = [
  { name: 'Sample Company' }
]

const mockModifyData = jest.fn()

const mockHook = {
  head: [
    ['Unique ID', 'Name', 'Sector', 'Vertical', 'Investor Profile', 'Actuals', '', '', '', ''],
    ['', '', '', '', '', 'Revenue', '', '', '', ''],
    ['', '', '', '', '', '2020', '', '', '', ''],
    ['', '', '', '', '', 'Q1', 'Q2', 'Q3', 'Q4', 'Full-year']
  ],
  body: [
    {
      id: 123,
      name: 'Sample Company',
      sector: '',
      vertical: '',
      inves_profile_name: '',
      scenarios: [
        {},
        {},
        {},
        {},
        {}
      ]
    }
  ],
  modifyData: mockModifyData
}

jest.mock('../../src/service/editModifyData')
jest.mock('../../src/service/company')

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
    mockService(getCompanies, JSON.parse(JSON.stringify(serviceCompanies)))
    mockService(getEditModifyData, expectedResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })

    expect(hookResponse.result.current.head).toEqual(mockHook.head)
    expect(hookResponse.result.current.body).toEqual(mockHook.body)
  })

  it('edit modify hook should return error when get edit modify fails', async () => {
    mockService(getCompanies, JSON.parse(JSON.stringify(serviceCompanies)))
    mockService(getEditModifyData, 'error')

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })

    expect(hookResponse.result.current.head).toEqual([])
    expect(hookResponse.result.current.body).toEqual([])
  })

  it('edit modify hook should execute updateEditData method when send changes', async () => {
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })
    const addSpy = jest.spyOn(hookResponse.result.current, 'updateEditData')

    await act(async () => {
      hookResponse.result.current.updateEditData(mockModifiedData)
    })

    expect(addSpy).toHaveBeenCalledWith(mockModifiedData)
  })

  it('edit modify hook should send message error when get data fails', async () => {
    const expectedResponse = {}
    expectedResponse['scenarios deleted'] = 1
    mockService(updateEditModifyData, 'error')

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })
    await act(async () => {
      await hookResponse.result.current.updateEditData(mockModifiedData)
    })

    expect(hookResponse.result.current.errorMessage).toEqual('Cannot get edit/modify data')
  })

  it('edit modify hook should execute deleteMetrics function when call modify with delete records', async () => {
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
    const addSpy = jest.spyOn(hookResponse.result.current, 'deleteMetrics')
    hookResponse.result.current.deleteMetrics(deleteObject)

    expect(addSpy).toBeCalledTimes(1)
  })

  it('edit modify hook should return 0 when call deleteMetrics function with null records', async () => {
    const deleteObject = null
    const expectedResponse = 0
    mockService(deleteScenarios, expectedResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useEditModify())
    })

    const result = await hookResponse.result.current.deleteMetrics(deleteObject)
    expect(result).toBe(0)
  })
})
