"use client"
import {
  Modal,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'

import { useQuery } from "@apollo/client";

import React, { useEffect, useState } from 'react'

import SingleSelectField from './Fields/SingleSelectField'
import DateField from './Fields/DateField'
import Description from './Description'
import MultiselectField from './Fields/MultiselectField'
import EditableText from './EditableText'
import CloseButton from './CloseButton'
import { CardDetailsDocument, Milestone, User, Tag } from '@graphql/types';
import { useDataContext, IDataContext } from "@app/DataContext";

function CardModal() {
  const [cardName, setCardName] = useState('Card name')
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nulla tenetur eaque veritatis excepturi beatae quos laudantium, optio necessitatibus maiores!'
  )
  const [assignees, setAssignees] = useState<User[]>([])
  const [milestone, setMilestone] = useState<Milestone['name']>(null)
  const [deadline, setDeadline] = useState<string | null>(null)
  const [tags, setTags] = useState<Tag[]>([])

  const [dataMirrored, setDataMirrored] = useState(false)

  const {cardModal: { open, setOpen, cardUuid }} = useDataContext() as IDataContext

  const {data, loading, error, refetch} = useQuery(CardDetailsDocument, {
    variables: {
      cardUuid,
    },
    skip: !cardUuid
  })

  useEffect(() => {
    if (cardUuid) {
      refetch({
        cardUuid
      })
      console.log('refetch')
    }
  }, [cardUuid])

  useEffect(() => {
    setDataMirrored(false)
  }, [loading])

  useEffect(() => {
    setCardName(data?.card_details?.name || '')
    setDescription(data?.card_details?.description || '')
    setAssignees(data?.card_details?.assignees || [])
    setMilestone(data?.card_details?.milestone?.name || null)
    setDeadline(data?.card_details?.deadline || null)
    setTags(data?.card_details?.tags || [])
  }, [data])

  useEffect(() => {
    setDataMirrored(true)
  }, [cardName, description, assignees, milestone, deadline, tags, data])

  return (
    <Modal
      open={open}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none'
      }}
      onClose={() => setOpen(false)}
    >
      {loading || !dataMirrored ? <CircularProgress /> : (<Paper
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
            options={['Milestone 1', 'Milestone 2', 'Milestone 3']}
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
