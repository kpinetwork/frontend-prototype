import React from 'react'
import { Divider, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    width: '100%'
  },
  border: {
    borderBottom: '1px solid lightgray',
    width: '30%'
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontSize: 16,
    color: 'gray'
  }
}))

const CustomDivider = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
        <Box className={classes.container}>
          <Divider className={classes.border} />
          <span className={classes.content}>{children}</span>
          <Divider className={classes.border} />
        </Box>
    </div>
  )
}
export default CustomDivider
