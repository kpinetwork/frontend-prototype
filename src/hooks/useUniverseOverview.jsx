import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { getUniverseOverViewFromObject, getUniverseOverviewFromQueryParams, getUniverseOverviewFromQueryParams2 } from '../service/universeOverview'

const useUniverseOverview = () => {
  const [kpiAverage, setKpiAverage] = useState(null)
  const [countBySize, setCountBySize] = useState(null)
  const [growthAndMargin, setGrowthAndMargin] = useState(null)
  const [expectedGrowthAndMargin, setExpectedGrowthAndMargin] = useState(null)
  const [revenueAndEbitda, setRevenueAndEbitda] = useState(null)
  const [ruleOf40, setRuleOf40] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fullEndpoint, setFullEndpoint] = useState(false)
  const [currentYear] = useState(() => {
    const date = new Date()
    return date.getFullYear()
  })
  const options = {
    year: currentYear,
    sector: [],
    investor: [],
    size: [],
    growth: [],
    vertical: []
  }

  useEffect(() => {
    console.log(options)
    getUniverseOverview({ year: '2020' })
  }, [])

  const handleOptionsChange = async (name, option) => {
    options[name] = option
    console.log(options)
    setFullEndpoint(false)
    // await getUniverseOverviewFromQueryParams({ year: '2020', vertical: 'Banking' })
  }

  const getUniverseOverview = async (options) => {
    const result = await getUniverseOverViewFromObject(options)
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
    setFullEndpoint(true)
  }

  return {
    kpiAverage,
    countBySize,
    growthAndMargin,
    expectedGrowthAndMargin,
    revenueAndEbitda,
    ruleOf40,
    isLoading,
    fullEndpoint,
    handleOptionsChange
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
