import React from 'react'

import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
    setOpenFunction: (open: boolean) => void
}

function CloseButton({ setOpenFunction }: Props) {
  return (
    <Button
      onClick={() => setOpenFunction(false)}
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: 0,
        minWidth: 'unset',
        color: 'inherit',
      }}
    >
      <CloseIcon />
    </Button>
  )
}

export default CloseButton
