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
  },
  row: {
    display: 'flex',
    paddingTop: 10
  },
  rowReverse: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row-reverse'
  }
}))

export default function ButtonActions ({ okName, cancelName, onOk, onCancel, allowActions = true, reverse = true }) {
  const classes = useStyles()
  return (
    <Box className={reverse ? classes.rowReverse : classes.row}>
      <Button onClick={onOk}
        className={classes.mainButton}
        variant='contained'
        style={{ marginRight: reverse ? 0 : 20 }}
        disabled={!allowActions}
       >
        {okName}
      </Button>
      <Button onClick={onCancel}
        className={classes.textButton}
        variant='outlined'
        disabled={!allowActions}
      >
        {cancelName}
      </Button>
    </Box>
  )
}
