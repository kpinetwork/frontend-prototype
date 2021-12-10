import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { getUniverseOverview, getUniverseOverViewFromObject } from '../service/universeOverview'

const useUniverseOverview = () => {
  const [kpiAverage, setKpiAverage] = useState(null)
  const [countBySize, setCountBySize] = useState(null)
  const [growthAndMargin, setGrowthAndMargin] = useState(null)
  const [expectedGrowthAndMargin, setExpectedGrowthAndMargin] = useState(null)
  const [revenueAndEbitda, setRevenueAndEbitda] = useState(null)
  const [ruleOf40, setRuleOf40] = useState(null)

  useEffect(() => {
    getUniverseOverViewFromObject(2020).then(result => {
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
    })
  }, [])

  return {
    kpiAverage,
    countBySize,
    growthAndMargin,
    expectedGrowthAndMargin,
    revenueAndEbitda,
    ruleOf40
  }
}

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

export default useUniverseOverview
