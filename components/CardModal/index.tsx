import { Modal, Paper, Typography, Box, Chip, Stack } from '@mui/material'

import React from 'react'

import SingleSelectField from './Fields/SingleSelectField'
import DateField from './Fields/DateField'
import Description from './Description'
import MultiselectField from './Fields/MultiselectField'
import TextField from './Fields/TextField'
import NumberField from './Fields/NumberField'
import CheckboxField from './Fields/CheckboxField'

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
            <Typography variant="body2">
              <b>Utworzył:</b> Jan Kowalski
            </Typography>
          </Stack>
          <Description
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nulla
        tenetur eaque veritatis excepturi beatae quos laudantium, optio
        necessitatibus maiores!"
          />
        </Box>
        <Box
          sx={{
            width: '50%',
            padding: 1,

            '& > .MuiTextField-root, & > .MuiAutocomplete-root': {
              width: '100%',
              mb: 3,
            },

            '& > .MuiFormControlLabel-root': {
              mb: 3,
            },

            '& > .MuiTextField-root:last-child, & > .MuiAutocomplete-root:last-child, & > .MuiFormControlLabel-root:last-child':
              {
                mb: 0,
              },
          }}
        >
          <SingleSelectField
            options={['Jan Kowalski', 'Adam Jakistam', 'Bożena Costam']}
            loading={true}
            label="Osoby"
            onChange={(_, value) => console.log(value)}
          />

          <SingleSelectField
            label="Kamień milowy"
            options={['Kamień milowy 1', 'Kamień milowy 2']}
            loading={true}
            onChange={(_, value) => console.log(value)}
          />

          <DateField
            label="Data zakończenia"
            onChange={value => console.log(value)}
          />

          <MultiselectField
            label="Etykiety"
            options={[
              { value: 'Etykieta 1', color: 'red' },
              { value: 'Etykieta 2', color: 'blue' },
              { value: 'Etykieta 3', color: 'green' },
            ]}
            loading={true}
            onChange={(_, value) => console.log(value)}
          />

          <TextField
            label="Link do zadania"
            onChange={e => console.log(e.target.value)}
          />
          <NumberField
            label="Numer zadania"
            onChange={e => console.log(e.target.value)}
          />
          <CheckboxField
            label="Czy zakończono?"
            onChange={(_, checked) => console.log(checked)}
          />
        </Box>
      </Paper>
    </Modal>
  )
}

export default CardModal
