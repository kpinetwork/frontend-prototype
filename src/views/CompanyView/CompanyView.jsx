import React from 'react'
import { Grid } from '@material-ui/core'
import { CompanyCard } from './Components/CompanyCard'
import { DesciptionCard } from './Components/DescriptionCard'
import { ReportRuleGraph } from './Components/ReportRuleGraph'
export function CompanyView () {
  return (
    <>
      <Grid container>
          <Grid item xs={12} sm={4.5} lg={3} xl={2}><DesciptionCard/></Grid>
          <Grid item xs={12} sm={4} lg={3} xl={2}><CompanyCard/></Grid>
          <Grid item xs={12} sm={8} lg={6} xl={8}><ReportRuleGraph/></Grid>
      </Grid>
    </>
  )
}
