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

export function UniverseView () {
  return (
    <>
      <Grid container>
          <Grid item xs={12} sm={8} lg={6}><RuleGraph/></Grid>
          <Grid item xs={12} sm={4} lg={6}><Filter/></Grid>
      </Grid>
      <Divider />
      <Grid container>
          <Grid item xs={12} sm={6} lg={3}><KPIAveragesCard /></Grid>
          <Grid item xs={12} sm={6} lg={3}><CountBySizeCard /></Grid>
          <Grid item xs={12} sm={6} lg={3}><GrowthAndMarginCard /></Grid>
          <Grid item xs={12} sm={6} lg={3}><RevenueAndEbitdaCard /></Grid>
          <Grid item xs={12} sm={6} lg={3}><ExpectedGrowthRateAndMarginCard /></Grid>
      </Grid>
    </>
  )
}
