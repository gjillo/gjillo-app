import { Modal, Paper, Typography, Box, Chip, Stack } from '@mui/material'

import React from 'react'

import Field from './Field'
import DatePicker from './DatePicker'

function CardModal() {
  return (
    <Modal
      open={true}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 800,
          minHeight: 400,
          padding: 3,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            width: '50%',
            padding: 1,
          }}
        >
          <Typography variant="h4">Card Modal</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip label="test" />
            <Typography variant="body2">Utworzył: Jan Kowalski</Typography>
          </Stack>
          <Box
            sx={{
              bgcolor: 'grey.200',
              padding: 2,
              mt: 4,
            }}
          >
            <Typography variant="h6">Opis</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              nulla tenetur eaque veritatis excepturi beatae quos laudantium,
              optio necessitatibus maiores!
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            padding: 1,
          }}
        >
          <Field
            options={['Jan Kowalski', 'Adam Jakistam', 'Bożena Costam']}
            loading={true}
            label="Osoby"
          />

          <Field
            label="Kamień milowy"
            options={['Kamień milowy 1', 'Kamień milowy 2']}
            loading={true}
          />

          <DatePicker label="Data zakończenia" />
        </Box>
      </Paper>
    </Modal>
  )
}

export default CardModal
