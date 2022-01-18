import React from 'react'
import { Grid } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'
import { Sectors } from './Sectors'
import { Investor } from './Investor'
import { Size } from './Size'
import { Growth } from './Growth'
import { Vertical } from './Vertical'

export function Filter ({ setFilters, fillFilters, filters, xs, sm, md, lg, xl }) {
  const {
    growth_profile: growth,
    investor_profile: investor,
    sector,
    size,
    vertical
  } = filters
  return (
    <CardKPI title={'Filters'} actions={false} overflow={'auto'} textAlign={'start'}>
        <Grid container >
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
                <Sectors setFilters={setFilters} fillFilters={fillFilters} selectedList={sector}/>
            </Grid>
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
                <Investor setFilters={setFilters} fillFilters={fillFilters} selectedList={investor}/>
            </Grid>
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
               <Size setFilters={setFilters}fillFilters={fillFilters} selectedList={size}/>
            </Grid>
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
                <Growth setFilters={setFilters} fillFilters={fillFilters} selectedList={growth}/>
            </Grid>
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
                <Vertical setFilters={setFilters} fillFilters={fillFilters} selectedList={vertical}/>
            </Grid>
        </Grid>
    </CardKPI>
  )
}
