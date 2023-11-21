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

import DropdownSingleField from './Fields/DropdownSingleField'
import DateField from './Fields/DateField'
import Description from './Description'
import DropdownMultipleField from './Fields/DropdownMultipleField'
import EditableText from './EditableText'
import CloseButton from './CloseButton'
import {
  CardDetailsDocument,
  Milestone,
  Tag,
  Card,
  IUser,
  ProjectQuery
} from '@graphql/types';
import { useDataContext } from "@app/DataContext";

type Props = Pick<NonNullable<ProjectQuery["project"]>, "users" | "tags" | "milestones">

function CardModal({users, milestones, tags: tagsList}: Props) {
  const [cardName, setCardName] = useState<Card['name']>(null)
  const [description, setDescription] = useState<Card['description']>(null)
  const [assignees, setAssignees] = useState<IUser[]>([])
  const [milestone, setMilestone] = useState<Milestone['name']>(null)
  const [deadline, setDeadline] = useState<string | null>(null)
  const [tags, setTags] = useState<Omit<Tag, "uuid">[]>([])

  const {cardModal: { open, setOpen, cardUuid }} = useDataContext()

  const [getCardData, {data, loading, error}] = useLazyQuery(CardDetailsDocument)

  // When the cardUuid changes, fetch the card data
  useEffect(() => {
    if (cardUuid) {
      getCardData({
        variables: {
          cardUuid,
        },
      })
    }
  }, [cardUuid])

  // When the card data changes, mirror the changes in the local state
  useEffect(() => {
    setCardName(data?.card_details?.name || null)
    setDescription(data?.card_details?.description || null)
    setAssignees(data?.card_details?.assignees || [])
    setMilestone(data?.card_details?.milestone?.name || null)
    setDeadline(data?.card_details?.deadline || null)
    setTags(data?.card_details?.tags || [])
  }, [data])

  const handleCardNameChange = (value: Card["name"]) => {
    setCardName(value)
    // TODO: add mutation
  }

  const handleDescriptionChange = (value: Card["description"]) => {
    setDescription(value)
  }

  const handleAssigneesChange = (value: {value: string}[]) => {
    setAssignees(value.map(user => ({ name: user.value })))
  }

  const handleMilestoneChange = (value: Milestone["name"]) => {
    setMilestone(value)
  }

  const handleDeadlineChange = (value: string | null) => {
    setDeadline(value)
  }

  const handleTagsChange = (value: Omit<Tag, "uuid">[]) => {
    setTags(value)
  }

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
                onValueChange={handleCardNameChange}
                dialogTitle="Change card name"
              >
                <Typography variant="h4">{cardName}</Typography>
              </EditableText>
              <Typography variant="body1">
                In list <b>{data?.card_details?.column?.name}</b>
              </Typography>

              <Description text={description || ''} setText={handleDescriptionChange} />
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

              <DropdownMultipleField 
                options={users.map(user => ({ value: user.name || '' })) || []}
                label="Assignees"
                onChange={value => handleAssigneesChange(value)}
                value={assignees.map(assignee => ({ value: assignee.name || '' }))}
              />

              <DropdownSingleField
                label="Milestone"
                options={milestones.map(milestone => milestone.name || '') || []}
                onChange={value => handleMilestoneChange(value)}
                value={milestone || null}
              />

              <DateField label="Deadline" value={deadline} onChange={value => handleDeadlineChange(value?.toISOString() || null)} />

              <DropdownMultipleField
                label="Tags"
                options={tagsList || []}
                onChange={value => handleTagsChange(value)}
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
