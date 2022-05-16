import { Auth } from 'aws-amplify'
import { renderHook, act } from '@testing-library/react-hooks'
import useCompaniesPanelTable from '../../src/hooks/useCompaniesPanelTable'
import useCompanyPanel from '../../src/hooks/useCompanyPanel'
import useCompaniesToChange from '../../src/hooks/useCompaniesToChange'
import { changeCompanyPublicly } from '../../src/service/changeCompanyPublicly'

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

jest.mock('../../src/hooks/useCompanyPanel')
jest.mock('../../src/hooks/useCompaniesToChange')
jest.mock('../../src/service/changeCompanyPublicly')

const mockService = (response) => {
  changeCompanyPublicly.mockImplementation(() => response)
}

const serviceResponse = {
  statusCode: 200,
  body: { modified: true }
}

const companies = [
  {
    id: '1',
    name: 'Sample company abc',
    sector: 'Application Software',
    vertical: 'Media',
    inves_profile_name: 'Private equity',
    is_public: false
  },
  {
    id: '2',
    name: 'Sample company xyz',
    sector: 'Semiconductors',
    vertical: 'Logistics',
    inves_profile_name: 'Family office',
    is_public: false
  }
]
const useCompanyPanelResponse = {
  total: 1,
  companies: [companies[0]],
  setCompanies: jest.fn(),
  isLoading: false,
  getCompanyPanel: jest.fn().mockImplementation(() => [companies[1]])
}

const useCompaniesToChangeResponse = {
  companiesToChange: { [companies[0].id]: companies[0] }
}

describe('useCompaniesPanelTable', () => {
  it('render hook', async () => {
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPanel.mockImplementation(() => useCompanyPanelResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesPanelTable())
    })

    expect(hookResponse.result.current.companies).toEqual(useCompanyPanelResponse.companies)
    expect(hookResponse.result.current.isLoading).toBeFalsy()
    expect(hookResponse.result.current.wantsChange).toBeFalsy()
  })

  it('callNextCompanies when change page for the first time', async () => {
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPanel.mockImplementation(() => useCompanyPanelResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesPanelTable())
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })
    const page = hookResponse.result.current.page
    const rowsPerPage = hookResponse.result.current.rowsPerPage

    expect(hookResponse.result.current.offset).toEqual(page * rowsPerPage)
    expect(hookResponse.result.current.page).toEqual(1)
  })

  it('callNextCompanies when change page is not the first time', async () => {
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPanel.mockImplementation(() => useCompanyPanelResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesPanelTable())
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
      hookResponse.result.current.handleChangePage('', 0)
    })
    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('callNextCompanies when newPage minus page is less than 0', async () => {
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPanel.mockImplementation(() => useCompanyPanelResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesPanelTable())
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 1)
    })
    await act(async () => {
      hookResponse.result.current.handleChangePage('', 0)
    })

    expect(hookResponse.result.current.page).toEqual(0)
  })

  it('handleChangeRowsPerPage should change rows per page', async () => {
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPanel.mockImplementation(() => useCompanyPanelResponse)
    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesPanelTable())
    })
    await act(async () => {
      hookResponse.result.current.handleChangeRowsPerPage({
        target: {
          value: 25
        }
      })
    })

    expect(hookResponse.result.current.rowsPerPage).toEqual(25)
  })

  it('onSave when there are companies to change', async () => {
    mockService(serviceResponse)
    useCompaniesToChange.mockImplementation(() => useCompaniesToChangeResponse)
    useCompanyPanel.mockImplementation(() => useCompanyPanelResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesPanelTable())
    })
    await act(async () => {
      hookResponse.result.current.onSave()
    })

    expect(useCompanyPanelResponse.getCompanyPanel).toHaveBeenCalled()
  })

  it('onSave when there are not companies to change', async () => {
    mockService(serviceResponse)
    useCompaniesToChange.mockImplementation(() => ({ ...useCompaniesToChangeResponse, companiesToChange: {} }))
    useCompanyPanel.mockImplementation(() => useCompanyPanelResponse)

    let hookResponse
    await act(async () => {
      hookResponse = renderHook(() => useCompaniesPanelTable())
    })
    await act(async () => {
      hookResponse.result.current.onSave()
    })

    expect(useCompanyPanelResponse.getCompanyPanel).toHaveBeenCalled()
  })
})
