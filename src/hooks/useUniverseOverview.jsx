import { useContext, useEffect, useState } from 'react'
import FilterContext from '../context/filterContext'
import { getUniverseOverviewFromQueryParams } from '../service/universeOverview'

const useUniverseOverview = () => {
  const { filters, setFilters, year, setYear, INITIAL_FILTER_STATE } = useContext(FilterContext)
  const [kpiAverage, setKpiAverage] = useState(null)
  const [countBySize, setCountBySize] = useState(null)
  const [growthAndMargin, setGrowthAndMargin] = useState(null)
  const [expectedGrowthAndMargin, setExpectedGrowthAndMargin] = useState(null)
  const [revenueAndEbitda, setRevenueAndEbitda] = useState(null)
  const [ruleOf40, setRuleOf40] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fillFilters, setFillFilters] = useState(false)

  useEffect(() => {
    console.log(year, filters)
    if (JSON.stringify(filters) === JSON.stringify(INITIAL_FILTER_STATE)) {
      setFillFilters(true)
    } else {
      setFillFilters(false)
    }
    setIsLoading(true)
    getUniverseOverview({ year, ...filters })
  }, [filters, year])

  const getUniverseOverview = async (options) => {
    const result = await getUniverseOverviewFromQueryParams(options)
    const {
      kpiAverageArray,
      countBySizeArray,
      growthAndMarginObject,
      expectedGrowthAndMarginObject,
      revenueAndEbitdaObject,
      ruleOf40Array
    } = destructuring(result)
    setKpiAverage(kpiAverageArray)
    setCountBySize(countBySizeArray)
    setGrowthAndMargin(growthAndMarginObject)
    setExpectedGrowthAndMargin(expectedGrowthAndMarginObject)
    setRevenueAndEbitda(revenueAndEbitdaObject)
    setRuleOf40(ruleOf40Array)
    setIsLoading(false)
  }

  return {
    kpiAverage,
    countBySize,
    growthAndMargin,
    expectedGrowthAndMargin,
    revenueAndEbitda,
    ruleOf40,
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
    revenue_and_ebitda: revenueAndEbitdaObject,
    rule_of_40: ruleOf40Array
  } = result
  return {
    kpiAverageArray,
    countBySizeArray,
    growthAndMarginObject,
    expectedGrowthAndMarginObject,
    revenueAndEbitdaObject,
    ruleOf40Array
  }
}
