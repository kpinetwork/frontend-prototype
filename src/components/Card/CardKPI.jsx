import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 18,
    color: '#0d5600'
  },
  pos: {
    marginBottom: 12
  }
})

export function CardKPI ({ children, title, actions = true, overflow = 'none' }) {
  const classes = useStyles()
  return (
    <Card className={classes.root} style={{ overflow: overflow }}variant="outlined">
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <div style={{ height: '50vh', width: '100%' }}>
          {children}
      </div>
    </CardContent>
    {
      actions &&
      <CardActions>
        <Button size="small" variant="outlined" color="inherit">Learn More</Button>
      </CardActions>
    }
  </Card>
  )
}
