import { renderHook, act } from '@testing-library/react-hooks'
import { getCompanyPanelFromQueryParams } from '../../src/service/companyPanel'
import useCompanyPanel from '../../src/hooks/useCompanyPanel'

const serviceResponse = {
  total: 1,
  companies: [
    {
      id: '1234',
      name: 'Sample company',
      sector: 'Application Software',
      vertical: 'Education',
      is_public: false
    }
  ]
}

jest.mock('../../src/service/companyPanel')

const mockServices = (response) => {
  getCompanyPanelFromQueryParams.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

describe('useCompanyPanel', () => {
  it('company panel hook should return hook response', async () => {
    mockServices(serviceResponse)
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyPanel({ limit: 1, offset: 0 }))
    })

    expect(hookResponse.result.current.total).toEqual(serviceResponse.total)
    expect(hookResponse.result.current.companies).toEqual(serviceResponse.companies)
  })

  it('company panel hook should return error', async () => {
    mockServices('error')
    let hookResponse

    await act(async () => {
      hookResponse = renderHook(() => useCompanyPanel())
    })

    expect(hookResponse.result.current.total).toEqual(0)
    expect(hookResponse.result.current.companies).toEqual([])
  })
})
