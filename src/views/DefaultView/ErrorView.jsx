import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  code: {
    fontSize: '150px',
    color: '#09357F'
  },
  box: {
    height: '100%',
    backgroundColor: 'white',
    textAlign: 'center',
    marginTop: '15%'
  },
  message: {
    fontSize: '40px',
    textAlign: 'center',
    color: '#535D6D',
    fontWeight: 'bold'
  }
}))

export const ErrorView = ({ code, message }) => {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
        <Typography className={classes.code}>{code}</Typography>
        <Typography className={classes.message}>{message}</Typography>
    </Box>
  )
}
