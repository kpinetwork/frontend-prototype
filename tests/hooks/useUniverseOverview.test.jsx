import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { getUniverseOverviewFromQueryParams } from '../../src/service/universeOverview'
import useUniverseOverview from '../../src/hooks/useUniverseOverview'
import { KPI_AVERAGE, COUNT_BY_SIZE, GROWTH_AND_MARGIN, EXP_GROWTH_AND_MARGIN, REVENUE_AND_EBITDA } from '../data/universeOverview'
import Context from '../../src/context/appContext'

const getUniverseOverviewResponse = {
  kpi_average: KPI_AVERAGE,
  count_by_size: COUNT_BY_SIZE,
  growth_and_margin: GROWTH_AND_MARGIN,
  expected_growth_and_margin: EXP_GROWTH_AND_MARGIN,
  revenue_and_ebitda: REVENUE_AND_EBITDA
}

jest.mock('../../src/service/universeOverview')

const mockService = (service, response) => {
  service.mockImplementation(() => {
    if (response === 'error') {
      throw new Error()
    }
    return response
  })
}

const wrapper = ({ children }) => (
    <Context.Provider value={{
      filterFields:
    {
      filters: {},
      year: '2021'
    }
    }}>
        {children}
    </Context.Provider>
)

describe('useUniverseOverview', () => {
  it('useUniverseOverview Hook render correctly ', async () => {
    mockService(getUniverseOverviewFromQueryParams, getUniverseOverviewResponse)

    let useUniverseOverviewResult
    await act(async () => {
      useUniverseOverviewResult = renderHook(() => useUniverseOverview(), { wrapper })
    })

    expect(useUniverseOverviewResult.result.current.kpiAverage).toEqual(getUniverseOverviewResponse.kpi_average)
    expect(useUniverseOverviewResult.result.current.growthAndMargin).toEqual(getUniverseOverviewResponse.growth_and_margin)
    expect(useUniverseOverviewResult.result.current.expectedGrowthAndMargin).toEqual(getUniverseOverviewResponse.expected_growth_and_margin)
    expect(useUniverseOverviewResult.result.current.revenueAndEbitda).toEqual(getUniverseOverviewResponse.revenue_and_ebitda)
    expect(useUniverseOverviewResult.result.current.year).toEqual('2021')
    expect(useUniverseOverviewResult.result.current.isLoading).toBeFalsy()
  })

  it('useUniverseOverview Hook render correctly when filters ', async () => {
    mockService(getUniverseOverviewFromQueryParams, getUniverseOverviewResponse)

    const wrapper = ({ children }) => (
      <Context.Provider value={{
        filterFields:
      {
        filters: { sector: ['Education'] },
        year: '2021',
        INITIAL_FILTER_STATE: { sector: ['Education'] }
      }
      }}>
          {children}
      </Context.Provider>
    )

    let useUniverseOverviewResult
    await act(async () => {
      useUniverseOverviewResult = renderHook(() => useUniverseOverview(), { wrapper })
    })

    expect(useUniverseOverviewResult.result.current.kpiAverage).toEqual(getUniverseOverviewResponse.kpi_average)
    expect(useUniverseOverviewResult.result.current.growthAndMargin).toEqual(getUniverseOverviewResponse.growth_and_margin)
    expect(useUniverseOverviewResult.result.current.expectedGrowthAndMargin).toEqual(getUniverseOverviewResponse.expected_growth_and_margin)
    expect(useUniverseOverviewResult.result.current.revenueAndEbitda).toEqual(getUniverseOverviewResponse.revenue_and_ebitda)
    expect(useUniverseOverviewResult.result.current.year).toEqual('2021')
    expect(useUniverseOverviewResult.result.current.isLoading).toBeFalsy()
  })
})
