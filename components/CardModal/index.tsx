"use client"
import {
  Modal,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material'

import { useLazyQuery } from "@apollo/client";

import React, { useEffect, useState } from 'react'

import SingleSelectField from './Fields/SingleSelectField'
import DateField from './Fields/DateField'
import Description from './Description'
import MultiselectField from './Fields/MultiselectField'
import EditableText from './EditableText'
import CloseButton from './CloseButton'
import { CardDetailsDocument, Milestone, User, Tag, Card } from '@graphql/types';
import { useDataContext, IDataContext } from "@app/DataContext";
import { usePathname } from 'next/navigation'

function CardModal() {
  const [cardName, setCardName] = useState<Card['name']>(null)
  const [description, setDescription] = useState<Card['description']>(null)
  const [assignees, setAssignees] = useState<User[]>([])
  const [milestone, setMilestone] = useState<Milestone['name']>(null)
  const [deadline, setDeadline] = useState<string | null>(null)
  const [tags, setTags] = useState<Tag[]>([])

  const pathname = usePathname()

  const {cardModal: { open, setOpen, cardUuid }} = useDataContext() as IDataContext

  const [getCardData, {data, loading, error}] = useLazyQuery(CardDetailsDocument)

  useEffect(() => {
    if (cardUuid) {
      getCardData({
        variables: {
          cardUuid,
          projectUuid: pathname.split('/')[2]
        },
      })
      console.log(pathname.split('/')[2])
    }
  }, [cardUuid])

  useEffect(() => {
    setCardName(data?.card_details?.name || null)
    setDescription(data?.card_details?.description || null)
    setAssignees(data?.card_details?.assignees || [])
    setMilestone(data?.card_details?.milestone?.name || null)
    setDeadline(data?.card_details?.deadline || null)
    setTags(data?.card_details?.tags || [])
  }, [data])

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
        <>
          {loading || !!error ? <CircularProgress /> : (<Paper
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
                value={cardName || ''}
                onValueChange={setCardName}
                dialogTitle="Change card name"
              >
                <Typography variant="h4">{cardName}</Typography>
              </EditableText>
              <Typography variant="body1">
                In list <b>{data?.card_details?.column?.name}</b>
              </Typography>

              <Description text={description || ''} setText={setDescription} />
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
                options={data?.project?.users.map(user => ({ value: user.name || '' })) || []}
                label="Assignees"
                onChange={(_, value) => console.log(value)}
                value={assignees.map(assignee => ({ value: assignee.name || '' }))}
              />

              <SingleSelectField
                label="Milestone"
                // options={['Milestone 1', 'Milestone 2', 'Milestone 3']}
                options={data?.project?.milestones.map(milestone => milestone.name || '') || []}
                onChange={(_, value) => console.log(value)}
                value={milestone || null}
              />

              <DateField label="Deadline" value={deadline} onChange={value => console.log(value)} />

              <MultiselectField
                label="Tags"
                options={data?.project?.tags || []}
                onChange={(_, value) => console.log(value)}
                value={tags}
              />

            </Box>
          </Paper>)}
          <Snackbar open={!!error}>
            <Alert severity="error" sx={{ width: '100%' }}>
              Error while fetching card data
            </Alert>
          </Snackbar>
        </>
      </Modal>
  )
}

export default CardModal
