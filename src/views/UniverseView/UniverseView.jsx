import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { CountBySizeCard } from './Components/CountBySizeCard'
import { KPIAveragesCard } from './Components/KPIAveragesCard'
import { GrowthAndMarginCard } from './Components/GrowthAndMarginCard'
import { RevenueAndEbitdaCard } from './Components/RevenueAndEbitdaCard'
import { ExpectedGrowthRateAndMarginCard } from './Components/ExpectedGrowthRateAndMarginCard'
import { RuleGraph } from './Components/RuleGraph'
import { Filter } from './Components/Filter'
import useUniverseOverview from '../../hooks/useUniverseOverview'

export function UniverseView () {
  const { kpiAverage, countBySize, growthAndMargin, expectedGrowthAndMargin, revenueAndEbitda, ruleOf40 } = useUniverseOverview()
  return (
    <>
      <Grid container>
          <Grid item xs={12} sm={8} lg={6}><RuleGraph ruleOf40={ruleOf40}/></Grid>
          <Grid item xs={12} sm={4} lg={6}><Filter/></Grid>
      </Grid>
      <Divider />
      <Grid container>
          <Grid item xs={12} sm={6} lg={3}><KPIAveragesCard kpiAverage={kpiAverage}/></Grid>
          <Grid item xs={12} sm={6} lg={3}><CountBySizeCard countBySize={countBySize}/></Grid>
          <Grid item xs={12} sm={6} lg={3}><GrowthAndMarginCard growthAndMargin={growthAndMargin}/></Grid>
          <Grid item xs={12} sm={6} lg={3}><RevenueAndEbitdaCard revenueAndEbitda={revenueAndEbitda}/></Grid>
          <Grid item xs={12} sm={6} lg={3}><ExpectedGrowthRateAndMarginCard expectedGrowthAndMargin={expectedGrowthAndMargin}/></Grid>
      </Grid>
    </>
  )
}
