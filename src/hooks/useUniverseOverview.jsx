import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { getUniverseOverViewFromObject, getUniverseOverviewFromQueryParams } from '../service/universeOverview'

const INITIAL_FILTER_STATE = {
  sector: '',
  investor_profile: '',
  size: '',
  growth_profile: '',
  vertical: ''
}

const useUniverseOverview = () => {
  const [kpiAverage, setKpiAverage] = useState(null)
  const [countBySize, setCountBySize] = useState(null)
  const [growthAndMargin, setGrowthAndMargin] = useState(null)
  const [expectedGrowthAndMargin, setExpectedGrowthAndMargin] = useState(null)
  const [revenueAndEbitda, setRevenueAndEbitda] = useState(null)
  const [ruleOf40, setRuleOf40] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fillFilters, setFillFilters] = useState(false)
  const [render, setRender] = useState(false)
  const [year, setYear] = useState(() => {
    const year = new Date().getFullYear()
    return year
  })
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE)

  useEffect(() => {
    console.log(year, filters)
    setIsLoading(true)
    getUniverseOverview({ year, ...filters })
  }, [filters, year])

  useEffect(() => {
    if (JSON.stringify(filters) === JSON.stringify(INITIAL_FILTER_STATE)) {
      setFillFilters(true)
    } else {
      setFillFilters(false)
    }
  }, [filters])

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
    setRender(true)
    if (!render) { setFillFilters(true) }
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
    setYear,
    setFilters
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
