"use client"
import {
  Modal,
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  TextField,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material'

import { useQuery } from "@apollo/client";

import React, { useEffect, useState } from 'react'

import SingleSelectField from './Fields/SingleSelectField'
import DateField from './Fields/DateField'
import Description from './Description'
import MultiselectField from './Fields/MultiselectField'
import NumberField from './Fields/NumberField'
import CheckboxField from './Fields/CheckboxField'
import EditableText from './EditableText'
import CloseButton from './CloseButton'
import { CardDetailsDocument, Milestone, User, Tag } from '@graphql/types';

interface Props {
  open: boolean
  onClose: () => void
  cardUuid: string
}

function CardModal({open, onClose, cardUuid}: Props) {
  const [cardName, setCardName] = useState('Card name')
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nulla tenetur eaque veritatis excepturi beatae quos laudantium, optio necessitatibus maiores!'
  )

  const [assignees, setAssignees] = useState<User[]>([])
  const [milestone, setMilestone] = useState<Milestone['name']>(null)
  const [deadline, setDeadline] = useState<string | null>(null)
  const [tags, setTags] = useState<Tag[]>([])

  const { loading, data, error } = useQuery(CardDetailsDocument, {
    variables: {
      cardUuid
    }
  })

  useEffect(() => {
    if (data?.card_details?.name) {
      setCardName(data.card_details.name)
    }
    console.log(data)
  }, [data?.card_details?.name])

  useEffect(() => {
    if (data?.card_details?.description) {
      setDescription(data.card_details.description)
    }
  }, [data?.card_details?.description])

  useEffect(() => {
    if (data?.card_details?.assignees) {
      setAssignees(data.card_details.assignees)
    }
  }, [data?.card_details?.assignees])

  useEffect(() => {
    if (data?.card_details?.milestone) {
      setMilestone(data.card_details.milestone.name)
    }
  }, [data?.card_details?.milestone])

  useEffect(() => {
    if (data?.card_details?.deadline) {
      setDeadline(data.card_details.deadline)
    }
  }, [data?.card_details?.deadline])

  useEffect(() => {
    if (data?.card_details?.tags) {
      setTags(data.card_details.tags)
    }
  }, [data?.card_details?.tags])

  return (
    <Modal
      open={open}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none'
      }}
      onClose={onClose}
    >
      {loading ? <CircularProgress /> : (<Paper
        sx={{
          width: '100%',
          maxWidth: 800,
          minHeight: 400,
          padding: 4,
          display: 'flex',
          position: 'relative',
        }}
      >
        <CloseButton />
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
            In list <b>{data?.card_details?.column?.name}</b>
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

          <MultiselectField 
            options={[
              { value: 'Michał Karpierz' },
              { value: 'Krzysztof Wrona' },
              { value: 'Filip Kowalski' },
            ]}
            loading={true}
            label="Assignees"
            onChange={(_, value) => console.log(value)}
            value={assignees.map(assignee => ({ value: assignee.name as string }))}
          />

          <SingleSelectField
            label="Milestone"
            options={['This is milestone', 'Milestone 2']}
            loading={true}
            onChange={(_, value) => console.log(value)}
            value={milestone as string}
          />

          <DateField label="Deadline" value={deadline} onChange={value => console.log(value)} />

          <MultiselectField
            label="Tags"
            options={[
              { value: 'Feature', color: 'red' },
              { value: 'Bug', color: 'blue' },
              { value: 'Tag 3', color: 'green' },
            ]}
            loading={true}
            onChange={(_, value) => console.log(value)}
            value={tags}
          />

        </Box>
      </Paper>)}
    </Modal>
  )
}

export default CardModal
