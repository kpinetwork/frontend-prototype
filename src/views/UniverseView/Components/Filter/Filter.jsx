import React from 'react'
import { Grid } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'
import { Sectors } from './Sectors'
import { Investor } from './Investor'
import { Size } from './Size'
import { Growth } from './Growth'
import { Vertical } from './Vertical'

export function Filter ({ setFilters, fillFilters, filters }) {
  const {
    growth_profile: growth,
    investor_profile: investor,
    sector,
    size,
    vertical
  } = filters
  return (
    <CardKPI title={'Filters'} actions={false} overflow={'auto'} textAlign={'center'}>
        <Grid container>
            <Grid item xs={12} sm={10} lg={4}>
                <Sectors setFilters={setFilters} fillFilters={fillFilters} selectedList={sector}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={4}>
                <Investor setFilters={setFilters} fillFilters={fillFilters} selectedList={investor}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={4}>
               <Size setFilters={setFilters}fillFilters={fillFilters} selectedList={size}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <Growth setFilters={setFilters} fillFilters={fillFilters} selectedList={growth}/>
            </Grid>
            <Grid item xs={12} sm={10} lg={12}>
                <Vertical setFilters={setFilters} fillFilters={fillFilters} selectedList={vertical}/>
            </Grid>
        </Grid>
    </CardKPI>
  )
}
