import {
  Modal,
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  TextField,
} from '@mui/material'

import React from 'react'

import SingleSelectField from './Fields/SingleSelectField'
import DateField from './Fields/DateField'
import Description from './Description'
import MultiselectField from './Fields/MultiselectField'
import NumberField from './Fields/NumberField'
import CheckboxField from './Fields/CheckboxField'
import EditableText from './EditableText'

function CardModal() {
  const [cardName, setCardName] = React.useState('Card name')
  const [description, setDescription] = React.useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nulla tenetur eaque veritatis excepturi beatae quos laudantium, optio necessitatibus maiores!'
  )

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
          <EditableText
            value={cardName}
            onValueChange={setCardName}
            dialogTitle="Change card name"
          >
            <Typography variant="h4">{cardName}</Typography>
          </EditableText>
          <Typography variant="body1">
            In list <b>To do</b>
          </Typography>

          <Description text={description} setText={setDescription} />
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
            label="Assignee"
            onChange={(_, value) => console.log(value)}
          />

          <SingleSelectField
            label="Milestone"
            options={['Milestone 1', 'Milestone 2']}
            loading={true}
            onChange={(_, value) => console.log(value)}
          />

          <DateField label="Deadline" onChange={value => console.log(value)} />

          <MultiselectField
            label="Tags"
            options={[
              { value: 'Tag 1', color: 'red' },
              { value: 'Tag 2', color: 'blue' },
              { value: 'Tag 3', color: 'green' },
            ]}
            loading={true}
            onChange={(_, value) => console.log(value)}
          />

          <TextField
            label="Example custom text field"
            onChange={e => console.log(e.target.value)}
          />
          <NumberField
            label="Example custom number field"
            onChange={e => console.log(e.target.value)}
          />
          <CheckboxField
            label="Example custom checkbox field"
            onChange={(_, checked) => console.log(checked)}
          />
        </Box>
      </Paper>
    </Modal>
  )
}

export default CardModal
