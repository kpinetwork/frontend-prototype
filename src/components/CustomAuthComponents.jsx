import React, { useState } from 'react'
import { Hub } from 'aws-amplify'
import { Grid } from '@material-ui/core'
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import { Alert } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { makeStyles } from '@material-ui/core/styles'
import CustomDivider from './CustomDivider'
import CustomGoogleButton from './CustomGoogleButton'
import { AuthResponse, AuthMessage, AuthEvent } from './../utils/constants/Auth'

const useStyles = makeStyles(theme => ({
  googleButton: {
    textTransform: 'none',
    width: '100%',
    height: 45,
    fontSize: 16,
    marginBottom: 10
  },
  container: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  divider: {
    '&. MuiDivider-root': {
      width: '100%',
      backgroundColor: 'red'
    }
  }
}))

const CustomHeader = ({ titleButton, signIn, setError, error }) => {
  const classes = useStyles()
  return (
    <Grid className={classes.container} container>
      <CustomGoogleButton
        onClick={signIn}
        classes={classes}
        title={titleButton}
      />
      {
        error &&
        <Alert
          wrap="wrap" variation="error" isDismissible={true}
          onDismiss={(_) => setError(null)}
        >
          {error}
        </Alert>
      }
      <CustomDivider>
        or
      </CustomDivider>
    </Grid>
  )
}

const CustomAuthComponents = () => {
  const [error, setError] = useState(null)

  const signIn = async () => {
    return Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
  }

  const listenEvent = (data) => {
    const { payload } = data
    switch (payload.event) {
      case AuthEvent.CUSTOM_STATE_FAILURE:
        if (payload.data?.message === AuthResponse.USER_ALREADY_EXITS) {
          setError(AuthMessage.USER_ALREADY_EXITS)
        }
        break
      default:
        break
    }
  }

  Hub.listen('auth', listenEvent)

  return {
    SignIn: {
      Header () {
        return (
            <CustomHeader
              titleButton="Sign In with Google"
              signIn={signIn}
              setError={setError}
              error={error}
            />
        )
      }
    },
    SignUp: {
      Header () {
        return (
            <CustomHeader
              titleButton="Sign Up with Google"
              signIn={signIn}
              setError={setError}
              error={error}
            />
        )
      }
    }
  }
}

export default CustomAuthComponents
