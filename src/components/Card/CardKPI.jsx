import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
    borderRadius: 14,
    boxShadow: '3px 9px 23px -22px rgba(0,0,0,0.46)'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 18,
    color: '#0d5600',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  pos: {
    marginBottom: 12
  }
})

export function CardKPI ({ children, title, actions = true, overflow = 'none', textAlign = 'none', height = '40vh' }) {
  const classes = useStyles()
  return (
    <Card className={classes.root} style={{ overflow: overflow, textAlign: textAlign }}variant="outlined">
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <div style={{ height: height, width: '100%' }}>
          {children}
      </div>
    </CardContent>
    {
      actions &&
      <CardActions>
        <Button size="small" variant="text" color="inherit">Learn More</Button>
      </CardActions>
    }
  </Card>
  )
}
