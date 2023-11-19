import { Box, Typography } from '@mui/material'
import React from 'react'
import EditableText from './EditableText'

interface DescriptionProps {
  text: string
  setText: (text: string) => void
}

function Description({ text, setText }: DescriptionProps) {
  return (
    <Box
      sx={{
        bgcolor: 'grey.200',
        padding: 2,
        mt: 4,
      }}
    >
      <Typography variant="h6">Description</Typography>
      <EditableText
        value={text}
        onValueChange={setText}
        multiline
        dialogTitle="Change card description"
      >
        <Typography variant="body2">{text}</Typography>
      </EditableText>
    </Box>
  )
}

export default Description
