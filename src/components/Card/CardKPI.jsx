import { Button, Card, CardActions, CardContent, Typography, useMediaQuery } from '@material-ui/core'
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
    color: '#005f83',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  body: {
    display: 'grid',
    alignSelf: 'center',
    justifySelf: 'center'
  },
  pos: {
    marginBottom: 12
  }
})

export function CardKPI ({ children, topActions, title, actions = true, overflow = 'none', textAlign = 'none', height = '40vh', fullScreen = false }) {
  const isPhone = useMediaQuery('(max-width: 768px)')

  const classes = useStyles()

  return (
    <Card className={classes.root} style={{ overflow: overflow, textAlign: textAlign }} variant="outlined">
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <div>
        {topActions}
      </div>
      <div className={classes.body} style={{ height: (!fullScreen && isPhone) ? '40vh' : height, width: '100%' }} data-testid="description-card">
          {children}
      </div>
    </CardContent>
    {
      actions &&
      <CardActions>
        <Button size="small" variant="text" color="inherit">Learn More about this</Button>
      </CardActions>
    }
  </Card>
  )
}
