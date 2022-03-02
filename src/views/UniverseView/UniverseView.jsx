import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { CountBySizeCard } from './Components/Cards/CountBySizeCard'
import { KPIAveragesCard } from './Components/Cards/KPIAveragesCard'
import { GrowthAndMarginCard } from './Components/Cards/GrowthAndMarginCard'
import { RevenueAndEbitdaCard } from './Components/Cards/RevenueAndEbitdaCard'
import { ExpectedGrowthRateAndMarginCard } from './Components/Cards/ExpectedGrowthRateAndMarginCard'
import { Filter } from '../../components/Filter/Filter'
import { RuleGraph } from './Components/RuleGraph'
import useUniverseOverview from '../../hooks/useUniverseOverview'
import { Information } from '../../components/HeaderInformation'
import { ComparisonView } from './../ComparisonView/ComparisonView'

export function UniverseView () {
  const {
    kpiAverage,
    countBySize,
    growthAndMargin,
    expectedGrowthAndMargin,
    revenueAndEbitda,
    ruleOf40,
    fillFilters,
    isLoading,
    year,
    setYear,
    setFilters,
    filters
  } = useUniverseOverview()
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}><Information year={year} setYear={setYear}/></Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} sm={8} lg={6}><RuleGraph ruleOf40={ruleOf40} /></Grid>
          <Grid item xs={12} sm={4} lg={6}><Filter setFilters={setFilters} fillFilters={fillFilters} filters={filters} xs={12} sm={10} md ={10} lg={6} xl={4}/></Grid>
      </Grid>
      <Divider />
      <Grid container>
          <Grid item xs={12} sm={6} lg={4}><KPIAveragesCard kpiAverage={kpiAverage} isLoading={isLoading}/></Grid>
          <Grid item xs={12} sm={6} lg={4}><CountBySizeCard countBySize={countBySize} isLoading={isLoading}/></Grid>
          <Grid item xs={12} sm={6} lg={4}><GrowthAndMarginCard growthAndMargin={growthAndMargin} isLoading={isLoading}/></Grid>
          <Grid item xs={12} sm={6} lg={6}><RevenueAndEbitdaCard revenueAndEbitda={revenueAndEbitda} isLoading={isLoading}/></Grid>
          <Grid item xs={12} sm={6} lg={6}><ExpectedGrowthRateAndMarginCard expectedGrowthAndMargin={expectedGrowthAndMargin} isLoading={isLoading}/></Grid>
      </Grid>
      <Grid>
        <ComparisonView fromUniverseOverview={true}/>
      </Grid>
    </>
  )
}
