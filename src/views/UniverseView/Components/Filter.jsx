import React from 'react'
import { Grid } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'
import { Sectors } from './Filter/Sectors'
import { Investor } from './Filter/Investor'
import { Size } from './Filter/Size'
import { Growth } from './Filter/Growth'
import { Vertical } from './Filter/Vertical'

export function Filter ({ setFilters, fullEndpoint }) {
  return (
    <CardKPI title={'Filters'} actions={false} overflow={'auto'} textAlign={'center'}>
        <Grid container>
            <Grid item xs={12} sm={10} lg={6}>
                <Sectors setFilters={setFilters} fullEndpoint={fullEndpoint}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <Investor setFilters={setFilters} fullEndpoint={fullEndpoint}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
               <Size setFilters={setFilters}fullEndpoint={fullEndpoint}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <Growth setFilters={setFilters} fullEndpoint={fullEndpoint}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={12}>
                <Vertical setFilters={setFilters} fullEndpoint={fullEndpoint}/>
            </Grid>
        </Grid>
    </CardKPI>
  )
}
