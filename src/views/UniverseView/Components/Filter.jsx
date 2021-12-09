import { Checkbox, FormControlLabel, FormGroup, Grid } from '@material-ui/core'
import React from 'react'
import { CardKPI } from '../../../components/Card/CardKPI'

export function Filter () {
  return (
    <CardKPI title={'Filters'} actions={false} overflow={'auto'} textAlign={'center'}>
        <Grid container>
            <Grid item xs={12} sm={10} lg={6}>
                <FormGroup>
                    <span>Sectors</span>
                    <FormControlLabel control={<Checkbox color="default"/>} label="All" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Application Software" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Communication Equipment" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Computer Hardware" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Online Media" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Semiconductors" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <FormGroup>
                    <span>Investor Profile</span>
                    <FormControlLabel control={<Checkbox color="default"/>} label="All" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Early stage VC" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Growth stage VC" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Private equity" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Founder backend" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Family office" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <FormGroup>
                    <span>Size</span>
                    <FormControlLabel control={<Checkbox color="default"/>} label="All" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="<$10 million" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="$10-<30 million" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="$30-<$50 million" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="$50-$100 million" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="$100 million +" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <FormGroup>
                    <span>Growth profile</span>
                    <FormControlLabel control={<Checkbox color="default"/>} label="All" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Negative growth (<0%)" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Low growth (0-<10%)" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Medium growth (10%-<30%)" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="High growth (30%-<50%)" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Hyper growth (50%+)" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <FormGroup>
                    <span>Vertical</span>
                    <FormControlLabel control={<Checkbox color="default"/>} label="All" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Accounting & Auditing" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Banking" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Business Services" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Consumer Services" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Ecommerce" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Education" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Energy" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Engineering" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Entertaiment" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Environment" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Fashion" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Govermment" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Healthcare" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Heavy Industry" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Hotels" />
                </FormGroup>
            </Grid>
            <Grid item xs={12} sm={10} lg={6}>
                <FormGroup>
                    <span>.</span>
                    <FormControlLabel control={<Checkbox color="default"/>} label="Infrastructure" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Insurance" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Law" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Life Sciences" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Logistics" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Manufacturing" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Media" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Mining" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Non-profits" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Professional Services" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Publishing" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Real Estate" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Transportation" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Utilities" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Wholesale" />
                    <FormControlLabel control={<Checkbox color="default"/>} label="Horizontal" />
                </FormGroup>
            </Grid>
        </Grid>
    </CardKPI>
  )
}
