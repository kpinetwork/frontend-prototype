import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getUniverseOverviewFromQueryParams } from '../service/universeOverview'

const useUniverseOverview = () => {
  const { filters, setFilters, year, setYear, INITIAL_FILTER_STATE } = useContext(Context).filterFields
  const [kpiAverage, setKpiAverage] = useState(null)
  const [countBySize, setCountBySize] = useState(null)
  const [growthAndMargin, setGrowthAndMargin] = useState(null)
  const [expectedGrowthAndMargin, setExpectedGrowthAndMargin] = useState(null)
  const [revenueAndEbitda, setRevenueAndEbitda] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fillFilters, setFillFilters] = useState(false)

  useEffect(() => {
    if (JSON.stringify(filters) === JSON.stringify(INITIAL_FILTER_STATE)) {
      setFillFilters(true)
    } else {
      setFillFilters(false)
    }
    setIsLoading(true)
    getUniverseOverview({ year, ...filters })

    return () => setDefaultValues()
  }, [filters, year])

  const setDefaultValues = () => {
    setKpiAverage(null)
    setCountBySize(null)
    setGrowthAndMargin(null)
    setExpectedGrowthAndMargin(null)
    setIsLoading(false)
  }

  const getUniverseOverview = async (options) => {
    const result = await getUniverseOverviewFromQueryParams(options)
    const {
      kpiAverageArray,
      countBySizeArray,
      growthAndMarginObject,
      expectedGrowthAndMarginObject,
      revenueAndEbitdaObject
    } = destructuring(result)
    setKpiAverage(kpiAverageArray)
    setCountBySize(countBySizeArray)
    setGrowthAndMargin(growthAndMarginObject)
    setExpectedGrowthAndMargin(expectedGrowthAndMarginObject)
    setRevenueAndEbitda(revenueAndEbitdaObject)
    setIsLoading(false)
  }

  return {
    kpiAverage,
    countBySize,
    growthAndMargin,
    expectedGrowthAndMargin,
    revenueAndEbitda,
    isLoading,
    fillFilters,
    year,
    setYear,
    setFilters,
    filters
  }
}

export default useUniverseOverview

function destructuring (result) {
  const {
    kpi_average: kpiAverageArray,
    count_by_size: countBySizeArray,
    growth_and_margin: growthAndMarginObject,
    expected_growth_and_margin: expectedGrowthAndMarginObject,
    revenue_and_ebitda: revenueAndEbitdaObject
  } = result
  return {
    kpiAverageArray,
    countBySizeArray,
    growthAndMarginObject,
    expectedGrowthAndMarginObject,
    revenueAndEbitdaObject
  }
}
