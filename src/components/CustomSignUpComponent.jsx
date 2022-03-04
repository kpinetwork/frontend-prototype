import React from 'react'
import { Typography } from '@material-ui/core'
import { Authenticator } from '@aws-amplify/ui-react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  hint: {
    fontStyle: 'italic',
    color: '#808080',
    fontSize: 15
  }
}))

const CustomSignUpComponents = () => {
  const classes = useStyles()
  return {
    SignUp: {
      FormFields () {
        return (
          <>
            <Authenticator.SignUp.FormFields />
            <Typography className={classes.hint} >Password must be at least 8 characters long and must contain lowercase, uppercase and symbols</Typography>
          </>
        )
      }
    }
  }
}

export default CustomSignUpComponents
