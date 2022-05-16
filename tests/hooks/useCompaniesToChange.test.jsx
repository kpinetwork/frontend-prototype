import { renderHook, act } from '@testing-library/react-hooks'
import { changeCompanyPublicly } from '../../src/service/changeCompanyPublicly'
import useCompaniesToChange from '../../src/hooks/useCompaniesToChange'

const serviceResponse = {
  statusCode: 200,
  body: { modified: true }
}

const mockHook = {
  companiesToChange: { 123: true }
}

jest.mock('../../src/service/changeCompanyPublicly')

const mockServices = (response) => {
  changeCompanyPublicly.mockImplementation(() => response)
}

beforeEach(() => {
  mockServices(serviceResponse)
})

describe('useCompaniesToChange', () => {
  it('Company panel hook should return companies to change', async () => {
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesToChange())
    })

    act(() => {
      hookResponse.result.current.handleChange(
        {
          event: { target: { checked: true } },
          company: { id: '123', is_public: false },
          field: 'is_public'
        })
    })

    expect(hookResponse.result.current.companiesToChange).toEqual(mockHook.companiesToChange)
  })

  it('CompanyChecked should return if company is check in case it is already in companiesToChange', async () => {
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesToChange())
    })

    act(() => {
      hookResponse.result.current.handleChange(
        {
          event: { target: { checked: true } },
          company: { id: '123', is_public: false },
          field: 'is_public'
        })
    })
    const isChecked = hookResponse.result.current.isCompanyChecked({ company: { id: '123', is_public: false }, field: 'is_public' })

    expect(isChecked).toBeTruthy()
  })

  it('CompanyChecked should return if company is check in case it is not in companiesToChange', async () => {
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesToChange())
    })
    const isChecked = hookResponse.result.current.isCompanyChecked({ company: { id: '123', is_public: false }, field: 'is_public' })

    expect(isChecked).toBeFalsy()
  })

  it('Company panel hook should return empty object when there are no companies to change', async () => {
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesToChange())
    })

    act(() => {
      hookResponse.result.current.handleChange(
        {
          event: { target: { checked: true } },
          company: { id: '123', is_public: true },
          field: 'is_public'
        })
    })

    expect(hookResponse.result.current.companiesToChange).toEqual({})
  })

  it('Company panel hook should return empty object when clean CompaniesToChange', async () => {
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesToChange())
    })

    act(() => {
      hookResponse.result.current.cleanCompaniesToChange()
    })

    expect(hookResponse.result.current.companiesToChange).toEqual({})
  })
})
