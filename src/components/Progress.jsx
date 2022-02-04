import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

function LoadingProgress () {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress color="inherit"/>
    </Box>
  )
}

export default LoadingProgress
