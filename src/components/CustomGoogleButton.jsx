import React from 'react'
import { Button } from '@material-ui/core'
import GoogleIcon from './Icons/GoogleIcon'

const CustomGoogleButton = ({ onClick, title, classes }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      className={classes.googleButton}
      startIcon={<GoogleIcon style={{ color: '#364b8a' }}/>}
    >
      {title}
    </Button>
  )
}

export default CustomGoogleButton
