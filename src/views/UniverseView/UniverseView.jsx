import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { CountBySizeCard } from './Components/CountBySizeCard'
import { KPIAveragesCard } from './Components/KPIAveragesCard'
import { GrowthAndMarginCard } from './Components/GrowthAndMarginCard'
import { RevenueAndEbitdaCard } from './Components/RevenueAndEbitdaCard'
import { ExpectedGrowthRateAndMarginCard } from './Components/ExpectedGrowthRateAndMarginCard'
import { RuleGraph } from './Components/RuleGraph'
import { Filter } from './Components/Filter'

const RuleOf40Graph = () => {
  return <Card style={{
    margin: 15,
    padding: 15,
    height: '50vh',
    overflow: 'auto',
    textAlign: 'center'
  }} variant="outlined">
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                Rule of 40: By Sector
            </Typography>
            <RuleGraph/>
        </CardContent>
    </Card>
}

const RuleOf40GraphFilters = () => {
  return <Card style={{
    margin: 15,
    padding: 15,
    height: '50vh',
    textAlign: 'center',
    overflow: 'auto'
  }} variant="outlined">
        <CardContent >
            <Filter/>
        </CardContent>
    </Card>
}

export const UniverseView = () => {
  return (
    <>
        <Grid container>
            <Grid item xs={12} sm={8} lg={6}><RuleOf40Graph/></Grid>
            <Grid item xs={12} sm={4} lg={6}><RuleOf40GraphFilters/></Grid>
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
