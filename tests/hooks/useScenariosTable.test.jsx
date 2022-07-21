import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getCompanyDetails, addCompanyScenario, deleteCompanyScenarios } from '../../src/service/companyDetails'
import { getMetricsType } from '../../src/service/metrics'
import useScenariosTable from '../../src/hooks/useScenariosTable'
import { COMPANIESDETAILS, SCENARIO } from '../data/companies'
import Context from '../../src/context/appContext'
import { BASEMETRICS } from '../../src/utils/constants/Metrics'

jest.mock('../../src/service/companyDetails')
jest.mock('../../src/service/metrics')

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const metrics = BASEMETRICS.map(metric => metric.name)

const wrapper = ({ children }) => (
  <Context.Provider value={{ company: { selectedCompanyID: '123' } }}>
    {children}
  </Context.Provider>
)

describe('useScenariosTable', () => {
  it('scenarios table should return scenarios', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    mockService(getMetricsType, metrics)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(0)
    expect(hookResponse.result.current.scenarios).toEqual(COMPANIESDETAILS.scenarios.metrics)
    expect(hookResponse.result.current.total).toEqual(COMPANIESDETAILS.scenarios.metrics.length)
  })

  it('scenarios table should catch errors', async () => {
    mockService(getCompanyDetails, 'error')
    mockService(getMetricsType, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(0)
    expect(hookResponse.result.current.scenarios).toEqual([])
    expect(hookResponse.result.current.total).toEqual(0)
    expect(hookResponse.result.current.metricNames).toEqual([])
  })

  it('scenarios table should handleChangePage when first time in page', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 1)
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('scenarios table should handle change page when not first time in page', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 1)
    })

    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 0)
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('scenarios table should handle change page when first time in page and next page', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 1)
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 0)
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage({}, 1)
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(10)
    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('scenarios table should handle change rowsPerPage', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })

    await act(async () => {
      hookResponse.result.current.handleChangeRowsPerPage({ target: { value: 25 } })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(25)
  })

  it('add scenario success', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    mockService(addCompanyScenario, true)
    let hookResponse
    let addScenario

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })
    await act(async () => {
      addScenario = hookResponse.result.current.addScenario(SCENARIO)
    })

    expect(addScenario).toBeTruthy()
    expect(getCompanyDetails).toBeCalled()
  })

  it('add scenario catch error', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    mockService(addCompanyScenario, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })
    await act(async () => {
      hookResponse.result.current.addScenario(SCENARIO)
    })

    expect(hookResponse.result.current.loading).toBeFalsy()
  })

  it('delete scenarios success', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    mockService(deleteCompanyScenarios, () => true)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })
    await act(async () => {
      hookResponse.result.current.deleteScenarios(SCENARIO)
    })

    expect(deleteCompanyScenarios).toHaveBeenCalled()
  })

  it('delete scenarios catch error', async () => {
    mockService(getCompanyDetails, COMPANIESDETAILS)
    mockService(deleteCompanyScenarios, 'error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useScenariosTable(), { wrapper })
    })
    await act(async () => {
      hookResponse.result.current.deleteScenarios(SCENARIO)
    })

    expect(hookResponse.result.current.loading).toBeFalsy()
  })
})
