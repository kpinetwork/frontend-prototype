import React from 'react'
import { Button } from '@material-ui/core'
import GoogleIcon from './Icons/GoogleIcon'

const CustomGoogleButton = ({ onClick, title, classes }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      className={classes.googleButton}
      startIcon={<GoogleIcon />}
    >
      {title}
    </Button>
  )
}

export default CustomGoogleButton
