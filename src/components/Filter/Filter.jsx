import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'
import { Investor } from './Investor'
import { Size } from './Size'
import { Growth } from './Growth'
import { Tag } from './Tag'
import useMetricRanges from '../../hooks/useMetricRanges'

export function Filter ({ setFilters, fillFilters, filters, xs, sm, md, lg, xl }) {
  const { getRangesBySpecificMetric } = useMetricRanges()
  const [rangesOptions, setRangesOptions] = useState([])
  const {
    growth_profile: growth,
    investor_profile: investor,
    size,
    tag
  } = filters

  const getRanges = async () => {
    const ranges = await getRangesBySpecificMetric('revenue')
    const options = ranges?.map(range => { return range.label })
    setRangesOptions(options)
  }

  useEffect(() => {
    getRanges()
  }, [])

  return (
    <CardKPI title={'Filters'} actions={false} overflow={'auto'} textAlign={'start'}>
        <Grid container >
            <Grid item xs={12}>
              <Tag setFilters={setFilters} selectedList={tag}/>
            </Grid>
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
                <Investor setFilters={setFilters} fillFilters={fillFilters} selectedList={investor}/>
            </Grid>
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
               <Size setFilters={setFilters}fillFilters={fillFilters} selectedList={size} rangesOptions={rangesOptions}/>
            </Grid>
            <Grid item xs={xs} sm={sm} md ={md} lg={lg} xl={xl} style={{ marginTop: 35 }}>
                <Growth setFilters={setFilters} fillFilters={fillFilters} selectedList={growth}/>
            </Grid>
        </Grid>
    </CardKPI>
  )
}
