import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: 10,
      marginTop: 20,
      marginBottom: 20,
      borderColor: '#7a7a7a',
      height: 510,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
      color: '#0d5600',
    },
    pos: {
      marginBottom: 12,
    },
  });

const columns = [
{field: 'id', headerName: 'ID', hide: true},
{field: 'kpi', headerName: 'KPI Averages', width: 200},
{field: 'value', headerName: 'All Sectors', width: 150},
];

const rows = [
{ id: 1, kpi: 'Actual growth', value: '7%'},
{ id: 2, kpi: 'Actual ebitda margins', value: '2%'},
{ id: 3, kpi: 'Rule of 40', value: '9'},
];

export const KPIAveragesCard = () => {
    const classes = useStyles();

    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            KPI Averages
          </Typography>
          <div style={{ height: 300, width: '100%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
              />
          </div>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
};
