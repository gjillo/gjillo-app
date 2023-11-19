import React from 'react'

import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function CloseButton() {
  return (
    <Button
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: 0,
        'min-width': 'unset',
        color: 'inherit',
      }}
    >
      <CloseIcon />
    </Button>
  )
}

export default CloseButton
