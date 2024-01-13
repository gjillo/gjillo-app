"use client"
import {Alert, Box, CircularProgress, Modal, Paper, Snackbar, Typography,} from '@mui/material'

import {useLazyQuery, useMutation} from "@apollo/client";

import React, {useEffect, useState} from 'react'
import DateField from '../CardModal/Fields/DateField'
import EditableText from '../CardModal/EditableText'
import CloseButton from '../CardModal/CloseButton'
import {
  ColumnType,
  Milestone,
  MilestoneDocument,
  MilestoneQuery,
  UpdateMilestoneDeadlineDocument,
  UpdateMilestoneNameDocument,
} from '@graphql/types';
import {useDataContext} from "@app/DataContext";
import { PieChart } from '@mui/x-charts/PieChart';


export default function MilestoneModal() {
  const [milestoneName, setMilestoneName] = useState<Milestone['name']>('')
  const [creationTimestamp, setCreationTimestamp] = useState<Milestone['creation_timestamp']>('')
  const [deadline, setDeadline] = useState<string | null>(null)
  const [cards, setCards] = useState<NonNullable<MilestoneQuery['milestone']>['cards']>([])
  const [todoCards, setTodoCards] = useState<NonNullable<MilestoneQuery['milestone']>['cards']>([])
  const [inProgressCards, setInProgressCards] = useState<NonNullable<MilestoneQuery['milestone']>['cards']>([])
  const [doneCards, setDoneCards] = useState<NonNullable<MilestoneQuery['milestone']>['cards']>([])

  const {milestoneModal: { open, setOpen, milestoneUuid }} = useDataContext()

  const [getMilestoneData, {data, loading: loadingMilestoneData, error, refetch}] = useLazyQuery(MilestoneDocument)

  const [updateMilestoneName, {loading: pendingMilestoneNameUpdate}] = useMutation(UpdateMilestoneNameDocument)
  const [updateMilestoneDeadline, {loading: pendingMilestoneDeadlineUpdate}] = useMutation(UpdateMilestoneDeadlineDocument)


  // When the milestoneUuid changes, fetch the card data
  useEffect(() => {
    if (milestoneUuid) {
      getMilestoneData({
        variables: {
          milestoneUuid,
        },
      })
    }
  }, [milestoneUuid])

  // When the milestone data changes, mirror the changes in the local state
  useEffect(() => {
    setMilestoneName(data?.milestone?.name || '')
    setCreationTimestamp(data?.milestone?.creation_timestamp || '')
    setDeadline(data?.milestone?.deadline || '')
    setCards(data?.milestone?.cards || [])
  }, [data])

  const handleMilestoneNameChange = (value: Milestone["name"]) => {
    setMilestoneName(value)
    updateMilestoneName({
      variables: {
        uuid: milestoneUuid,
        name: value,
      }
    })
  }

  const handleDeadlineChange = (value: string | null) => {
    setDeadline(value)
    updateMilestoneDeadline({
      variables: {
        uuid: milestoneUuid,
        deadline: value
      }
    })
  }

  useEffect(() => {
    setTodoCards(
        cards.filter(card => card.column?.type == ColumnType.Todo)
    )
    setInProgressCards(
        cards.filter(card => card.column?.type == ColumnType.InProgress)
    )
    setDoneCards(
        cards.filter(card => card.column?.type == ColumnType.Done)
    )
  }, [cards])

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
          {loadingMilestoneData || !!error ? <CircularProgress /> : (<Paper
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
                setOpenFunction={useDataContext().milestoneModal.setOpen}
            />
            <Box
                sx={{
                  width: '50%',
                  padding: 1,
                }}
            >
              <EditableText
                  value={milestoneName || ''}
                  onValueChange={handleMilestoneNameChange}
                  dialogTitle="Change milestone name"
              >
                <Typography variant="h4">{milestoneName === '' ? <i>Click to add title</i> : milestoneName}</Typography>
              </EditableText>
              <Typography variant="body1">
                In progress
              </Typography>

              {/*temp*/}
              <br/>
              Todo
              <br/>
              {todoCards
                  .map(card =>
                      <div>{card.name}</div>
                  )
              }
              <br/>
              InProgress
              <br/>
              {inProgressCards
                  .map(card =>
                      <div>{card.name}</div>
                  )
              }
              <br/>
              Done
              <br/>
              {doneCards
                  .map(card =>
                      <div>{card.name}</div>
                  )
              }
              {/*  end temp*/}
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
              <DateField label="Deadline" value={deadline} onChange={value => handleDeadlineChange(value?.toISOString() || null)} />
              <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: todoCards.length, label: 'Todo', color: '#999999' },
                        { id: 1, value: inProgressCards.length, label: 'In progress', color: '#ff9800' },
                        { id: 2, value: doneCards.length, label: 'Done', color: '#8bc34a' },
                      ],
                      innerRadius: 80,
                      outerRadius: 100,
                      paddingAngle: 1,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 90,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                  width={400}
                  height={200}
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