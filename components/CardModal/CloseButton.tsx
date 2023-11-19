import React from 'react'

import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDataContext, IDataContext } from '@app/DataContext'

function CloseButton() {
  const {cardModal: { setOpen }} = useDataContext() as IDataContext

  return (
    <Button
      onClick={() => setOpen(false)}
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: 0,
        'minWidth': 'unset',
        color: 'inherit',
      }}
    >
      <CloseIcon />
    </Button>
  )
}

export default CloseButton
