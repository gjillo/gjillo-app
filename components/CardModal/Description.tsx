import { Box, Typography } from '@mui/material'
import React from 'react'

interface DescriptionProps {
  text: string
}

function Description({ text }: DescriptionProps) {
  return (
    <Box
      sx={{
        bgcolor: 'grey.200',
        padding: 2,
        mt: 4,
      }}
    >
      <Typography variant="h6">Opis</Typography>
      <Typography variant="body2">{text}</Typography>
    </Box>
  )
}

export default Description
