import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

interface Props {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  dialogTitle: string
  multiline?: boolean
}

function EditableText({
  value,
  onValueChange,
  children,
  dialogTitle,
  multiline,
}: Props) {
  const [open, setOpen] = useState(false)
  const [draftText, setDraftText] = useState(value)

  useEffect(() => {
    setDraftText(value)
  }, [value])

  const handleClose = () => {
    setOpen(false)
    onValueChange(draftText)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraftText(event.target.value)
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          textTransform: 'none',
          color: 'inherit',
          textAlign: 'left',
          padding: 0,
          borderRadius: 0,
          display: 'inline-block',
        }}
      >
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            multiline={multiline || false}
            value={draftText}
            onChange={handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditableText
