import React from 'react'

import { Box, Typography, Tooltip } from '@material-ui/core'
import { Help } from '@material-ui/icons'

export default function CustomTooltipTitle ({ name, variant, title, customColor, nameStyle, justifyContent }) {
  const defaultStyle = { marginRight: 10, fontWeight: 'bold' }

  const isValidName = (name) => {
    return name && name !== ''
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isValidName(justifyContent) ? justifyContent : 'space-between' }}>
        <Typography variant={isValidName(variant) ? variant : 'body2'} style={nameStyle || defaultStyle}>
            {name}
        </Typography>
        <Tooltip title={<Typography variant='body2'>{title}</Typography>} placement="top">
            <Help style={{ color: isValidName(customColor) ? customColor : '#ffffff', fontSize: 18 }} />
        </Tooltip>
    </Box>
  )
}
