import React from 'react';
import { CountBySizeCard } from './CountBySizeCard';
import { KPIAveragesCard } from './KPIAveragesCard';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { GrowthAndMarginCard } from './GrowthAndMarginCard';
import { RevenueAndEbitdaCard } from './RevenueAndEbitdaCard';
import { ExpectedGrowthRateAndMarginCard } from './ExpectedGrowthRateAndMarginCard';

import Card from '@material-ui/core/Card';

const RuleOf40Graph = () => {
    return <Card style={{
        borderColor: '#7a7a7a',
        textAlign: 'center',
        marginTop: 20,
        marginLeft: 13,
        marginRight: 13,
        height: 400,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }} variant="outlined">
        <CardContent>
            <Typography gutterBottom>
                Rule of 40: By Sector
            </Typography>
        </CardContent>
    </Card>;
};

const RuleOf40GraphFilters = () => {
    return <Card style={{
        borderColor: '#7a7a7a',
        textAlign: 'center',
        marginTop: 20,
        marginLeft: 13,
        marginRight: 13,
        height: 400,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }} variant="outlined">
        <CardContent>
            Filters
        </CardContent>
    </Card>;
};

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
  );
};
