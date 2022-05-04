import React from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  textButton: {
    textTransform: 'none',
    marginRight: 10
  },
  mainButton: {
    textTransform: 'none',
    marginRight: 10,
    backgroundColor: '#364b8a',
    color: 'white'
  }
}))

export default function ButtonActions ({ okName, cancelName, onOk, onCancel, style }) {
  const classes = useStyles()
  return (
    <Box style={style}>
      <Button onClick={onOk}
        className={classes.mainButton}
        variant='contained'
       >
        {okName}
      </Button>
      <Button onClick={onCancel}
        className={classes.textButton}
        variant='outlined'
      >
        {cancelName}
      </Button>
    </Box>
  )
}
