import React from 'react'
import { Box, Card, CardContent, CardHeader, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ErrorOutline } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '80vh'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      mimWidth: '55vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  alert: {
    '& .MuiCardHeader-title': {
      fontSize: '18px'
    }
  }
}))

function CardMessage ({ title, message, type }) {
  const classes = useStyles()
  return (
    <Box pt={2}>
      <Card style={{ backgroundColor: '#fef8f8' }} className={classes.root}>
        <CardHeader title={title} style={{ color: '#c4000f' }} className={classes.alert}
        avatar={
            <Avatar style={{ backgroundColor: 'transparent' }}>
                <ErrorOutline style={{ color: '#c4000f' }}/>
            </Avatar>
        }
        />
        <CardContent>
          <Typography variant="body1">{message}</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CardMessage
