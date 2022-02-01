import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    color: '#959cae',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20
  }
}))

export function TitlePanel ({ title }) {
  const classes = useStyles()

  return (
    <Typography variant="h6" className={classes.title}>{title}</Typography>
  )
}
