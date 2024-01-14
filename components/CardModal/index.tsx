"use client"
import {
  Modal,
  Paper,
  Typography,
  Box,
  IconButton ,
  CircularProgress,
  Snackbar,
  Alert,
  Backdrop,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";

import React, { useEffect, useState } from 'react'

import DropdownSingleField from './Fields/DropdownSingleField'
import DateField from './Fields/DateField'
import Description from './Description'
import EditableText from './EditableText'
import CloseButton from './CloseButton'
import {
  CardDetailsDocument,
  UpdateCardNameDocument,
  Milestone,
  Tag,
  Card,
  IUser,
  ProjectQuery,
  UpdateCardDescriptionDocument,
  UpdateCardTagsDocument,
  UpdateCardAssigneesDocument,
  UpdateCardDeadlineDocument,
  UpdateCardMilestoneDocument,
  ProjectUser,
  CardUpdatedDocument
} from '@graphql/types';
import { useDataContext } from "@app/DataContext";
import Assignees from './Assignees';
import Tags from './Tags';
import Grid from "@mui/material/Grid";

type Props = Pick<NonNullable<ProjectQuery["project"]>, "users" | "tags" | "milestones">

function CardModal({users, milestones, tags: tagsList}: Props) {
  const [cardName, setCardName] = useState<Card['name']>('')
  const [description, setDescription] = useState<Card['description']>(null)
  const [assignees, setAssignees] = useState<IUser[]>([])
  const [milestone, setMilestone] = useState<Milestone['name']>(null)
  const [deadline, setDeadline] = useState<string | null>(null)
  const [tags, setTags] = useState<Tag[]>([])

  const {cardModal: { open, setOpen, cardUuid }} = useDataContext()
  const {milestoneModal: { setOpen: setMilestoneOpen, setMilestoneUuid }} = useDataContext()

  const [getCardData, {data, loading: loadingCardData, error, refetch}] = useLazyQuery(CardDetailsDocument)

  const [updateCardName, {loading: pendingCardNameUpdate}] = useMutation(UpdateCardNameDocument)
  const [updateCardDescription, {loading: pendingCardDescriptionUpdate}] = useMutation(UpdateCardDescriptionDocument)
  const [updateCardAssignees, {loading: pendingCardAssigneesUpdate}] = useMutation(UpdateCardAssigneesDocument)
  const [updateCardTags, {loading: pendingCardTagsUpdate}] = useMutation(UpdateCardTagsDocument)
  const [updateCardDeadline, {loading: pendingCardDeadlineUpdate}] = useMutation(UpdateCardDeadlineDocument)
  const [updateCardMilestone, {loading: pendingCardMilestoneUpdate}] = useMutation(UpdateCardMilestoneDocument)

  const {data: subscriptionCardUpdated} = useSubscription(CardUpdatedDocument)

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

  useEffect(() => {
    if (subscriptionCardUpdated?.card_updated?.uuid === cardUuid) {
      refetch()
    }
  }, [subscriptionCardUpdated])

  // When the card data changes, mirror the changes in the local state
  useEffect(() => {
    setCardName(data?.card_details?.name || '')
    setDescription(data?.card_details?.description || null)
    setAssignees(data?.card_details?.assignees || [])
    setMilestone(data?.card_details?.milestone?.name || null)
    setDeadline(data?.card_details?.deadline || null)
    setTags(data?.card_details?.tags || [])
  }, [data])

  const handleCardNameChange = (value: Card["name"]) => {
    setCardName(value)
    updateCardName({
      variables: {
        uuid: cardUuid,
        name: value,
      }
    })
  }

  const handleDescriptionChange = (value: Card["description"]) => {
    setDescription(value)
    updateCardDescription({
      variables: {
        uuid: cardUuid,
        description: value,
      }
    })
  }

  const handleAssigneesChange = (value: ProjectUser[]) => {
    setAssignees(value)
    
    const assigneeUuids = value.reduce((acc, assignee) => {
      if (assignee.uuid) {
        acc.push(assignee.uuid)
      }
      return acc
    }, [] as string[])

    updateCardAssignees({
      variables: {
        uuid: cardUuid,
        assigneeUuids
      }
    })
  }

  const handleMilestoneChange = (value: Milestone["name"]) => {
    setMilestone(value)
    updateCardMilestone({
      variables: {
        uuid: cardUuid,
        milestoneUuid: milestones.find(milestone => milestone.name === value)?.uuid || null
      }
    })
  }

  const handleDeadlineChange = (value: string | null) => {
    setDeadline(value)
    updateCardDeadline({
      variables: {
        uuid: cardUuid,
        deadline: value
      }
    })
  }

  const handleTagsChange = (value: Tag[]) => {
    setTags(value)
    updateCardTags({
      variables: {
        uuid: cardUuid,
        tagUuids: value.map(tag => tag.uuid),
      }
    })
  }

  const pendingDataUpdate = pendingCardNameUpdate || pendingCardDescriptionUpdate || pendingCardAssigneesUpdate || pendingCardTagsUpdate || pendingCardDeadlineUpdate || pendingCardMilestoneUpdate

  const openMilestone = () => {
    const milestoneUuid = milestones.find(m => m.name === milestone)?.uuid
    if (milestoneUuid) {
      setMilestoneUuid(milestoneUuid)
    }
    setMilestoneOpen(true)
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
          {loadingCardData || !!error ? <CircularProgress /> : (<Paper
            sx={{
              width: '100%',
              maxWidth: 800,
              minHeight: 400,
              padding: 4,
              display: 'flex',
              position: 'relative',
            }}
          >
            <CloseButton
              setOpenFunction={useDataContext().cardModal.setOpen}
            />
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
                <Typography variant="h4">{cardName === '' ? <i>Click to add title</i> : cardName}</Typography>
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

              <Assignees assigneesList={users} selectedAssignees={assignees} handleAssigneesChange={handleAssigneesChange} />

              <Grid container spacing={2} sx={{mb: 3}}>
                <Grid item xs={10}>
                  <DropdownSingleField
                      label="Milestone"
                      options={milestones.map(milestone => milestone.name || '') || []}
                      onChange={value => handleMilestoneChange(value)}
                      value={milestone || null}
                  />
                </Grid>
                <Grid item xs={'auto'} sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <IconButton
                      onClick={openMilestone}
                      disabled={!milestone}
                  >
                    <OpenInNewIcon
                        sx={{
                          color: '#757575'
                        }}
                    />
                  </IconButton >
                </Grid>
              </Grid>

              <DateField label="Deadline" value={deadline} onChange={value => handleDeadlineChange(value?.toISOString() || null)} />

              <Tags tagsList={tagsList} selectedTags={tags} handleTagsChange={handleTagsChange} />

              {pendingDataUpdate && (<Backdrop open={true}>
                <CircularProgress />
              </Backdrop>)}
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
