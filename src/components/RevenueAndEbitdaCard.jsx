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
{field: 'count', headerName: 'Count by size', width: 200},
{field: 'revenue', headerName: 'Revenue', width: 150},
{field: 'ebitda', headerName: 'Ebitda', width: 150},
];

const rows = [
{ id: 1, count: '<$10 million', revenue: 'None', ebitda: 'None'},
{ id: 2, count: '$10-<30 million', revenue: '102%', ebitda: '135%'},
{ id: 3, count: '$30-<$50 million', revenue: '99%', ebitda: '128%'},
{ id: 4, count: '$50-$100 million', revenue: '103%', ebitda: '69%'},
{ id: 5, count: '$100 million+', revenue: '102%', ebitda: '120%'},
{ id: 6, count: 'ALL', revenue: '101%', ebitda: '109%'},
];

export const RevenueAndEbitdaCard = () => {
    const classes = useStyles();

    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Revenue & ebitda vs budget
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={6}
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
