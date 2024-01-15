'use client'

import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Column from '@components/Column'
import Grid from '@mui/material/Grid'
import CardModal from '@components/CardModal'
import {
  CardCreatedDocument,
  CardDeletedDocument,
  CardUpdatedDocument,
  ColumnCreatedDocument,
  ColumnDeletedDocument,
  CreateColumnDocument,
  DeleteCardDocument,
  MoveColumnDocument,
  ProjectQuery,
} from '@graphql/types'
import AddColumn from '@components/AddColumnButton'
import { useMutation, useSubscription } from '@node_modules/@apollo/client'
import { CircularProgress } from '@node_modules/@mui/material'
import Box from '@mui/material/Box'
import { MoveCardDocument } from '@graphql/types'
import { MoveCardToColumnDocument } from '@graphql/types'
import DisposeArea from '@components/DisposeArea'
import { useDataContext } from '@app/DataContext'
import MilestoneModal from "@components/MilestoneModal";

type Props = NonNullable<ProjectQuery['project']>

function Project(props: Props) {
  const [currentColumns, setCurrentColumns] = useState<Props['columns']>([])

  const [createColumn] = useMutation(CreateColumnDocument)
  const { data: subscriptionCreatedColumns } = useSubscription(
    ColumnCreatedDocument
  )

  const { data: subscriptionDeletedColumns } = useSubscription(
    ColumnDeletedDocument
  )

  const { data: subscriptionCardCreated } = useSubscription(CardCreatedDocument)

  const { data: subscriptionCardDeleted } = useSubscription(CardDeletedDocument)

  const { data: subscriptionCardUpdated } = useSubscription(CardUpdatedDocument)

  const scrollable = React.useRef(null)

  const [moveCard, {}] = useMutation(MoveCardDocument)
  const [moveCardToColumn, {}] = useMutation(MoveCardToColumnDocument)

  const [moveColumn] = useMutation(MoveColumnDocument)

  const [deleteCard] = useMutation(DeleteCardDocument)

  const {
    dragAndDrop: { setIsDragging, setShowDisposeArea },
  } = useDataContext()

  useEffect(() => {
    setCurrentColumns(props.columns)
  }, [props])

  const [shouldScroll, setShouldScroll] = useState(false)
  useEffect(() => {
    if (subscriptionCreatedColumns === undefined) {
      return
    }
    setCurrentColumns(prevColumns =>
      prevColumns.concat([subscriptionCreatedColumns.column_created])
    )

  }, [subscriptionCreatedColumns])

  useEffect(() => {
    console.log("columns changed, shouldScroll:", shouldScroll)
    if (shouldScroll) {
      scrollToLastColumn()
      setShouldScroll(false);
    }
  }, [currentColumns])

  useEffect(() => {
    if (subscriptionDeletedColumns === undefined) {
      return
    }
    setCurrentColumns(prevColumns =>
      prevColumns.filter(
        c => c.uuid !== subscriptionDeletedColumns.column_deleted
      )
    )
  }, [subscriptionDeletedColumns])

  useEffect(() => {
    if (subscriptionCardCreated === undefined) {
      return
    }
    const column = currentColumns.find(
      c => c.uuid === subscriptionCardCreated.card_created.column?.uuid
    )
    if (column === undefined) {
      return
    }
    const newColumn = {
      ...column,
    }

    newColumn.cards.push({
      uuid: subscriptionCardCreated.card_created.uuid,
      order: subscriptionCardCreated.card_created.order,
      assignees: [],
      tags: [],
    })

    setCurrentColumns(prevColumns =>
      prevColumns.map(c => {
        if (c.uuid === newColumn.uuid) {
          return newColumn
        }
        return c
      })
    )
  }, [subscriptionCardCreated])

  useEffect(() => {
    if (subscriptionCardDeleted === undefined) {
      return
    }

    const column = currentColumns.find(c =>
      c.cards.some(card => card.uuid === subscriptionCardDeleted.card_deleted)
    )

    if (column === undefined) {
      return
    }

    const newColumn = {
      ...column,
      cards: column.cards.filter(
        card => card.uuid !== subscriptionCardDeleted.card_deleted
      ),
    }

    setCurrentColumns(prevColumns =>
      prevColumns.map(c => {
        if (c.uuid === newColumn.uuid) {
          return newColumn
        }
        return c
      })
    )
  }, [subscriptionCardDeleted])

  useEffect(() => {
    if (subscriptionCardUpdated === undefined) {
      return
    }

    const updatedCards = subscriptionCardUpdated.card_updated

    if (!updatedCards) {
      return
    }


    // Card data was changed
    if (updatedCards.length === 1) {
      const updatedCard = updatedCards[0]

      const column = currentColumns.find(c =>
        c.cards.some(card => card.uuid === updatedCard.uuid)
      )

      if (column === undefined) {
        return
      }

      const newColumn = {
        ...column,
        cards: column.cards.map(card => {
          if (card.uuid === updatedCard.uuid) {
            return {
              ...card,
              ...updatedCard,
            }
          }
          return card
        }),
      }

      setCurrentColumns(prevColumns =>
        prevColumns.map(c => {
          if (c.uuid === newColumn.uuid) {
            return newColumn
          }
          return c
        })
      )
    } 
    // Card was moved
    else {
      const workingColumns: any = {}
      for (const updatedCard of updatedCards) {
        if (updatedCard?.column?.uuid === undefined) {
          continue
        }
        if (workingColumns[updatedCard?.column?.uuid] === undefined) {
          workingColumns[updatedCard.column?.uuid] = [updatedCard]
        } else {
          workingColumns[updatedCard.column?.uuid].push(updatedCard)
        }
      }

      const columnsUuids = updatedCards.map(card => card.column?.uuid).filter(uuid => uuid !== undefined)
      const updatedCardsUuids = updatedCards.map(card => card.uuid)

      const newColumns = Array.from(currentColumns).map(column => ({
        ...column,
        cards: column.cards.filter(card => !updatedCardsUuids.includes(card.uuid) || columnsUuids.includes(column.uuid) )
      }))

      for (const columnUuid in workingColumns) {
        const columnIndex = currentColumns.findIndex(c => c.uuid === columnUuid)

        if (columnIndex === -1) {
          continue
        }

        const newCards = Array.from(currentColumns[columnIndex].cards)

        for (const updatedCard of workingColumns[columnUuid]) {
          const cardIndex = newCards.findIndex(c => c.uuid === updatedCard.uuid)

          if (cardIndex === -1) {
            newCards.push(updatedCard)
          }

          newCards[cardIndex] = {
            ...newCards[cardIndex],
            ...updatedCard,
          }
        }

        newCards.sort((a, b) => a.order - b.order)

        const newColumn = {
          ...currentColumns[columnIndex],
          cards: newCards,
        }

        console.log(newColumn)

        newColumns[columnIndex] = newColumn
      }

      setCurrentColumns(newColumns)

    }
  }, [subscriptionCardUpdated])

  const scrollToLastColumn = () => {
    setTimeout(() => {
      const element = scrollable.current
      if (element == null) return
      const htmlElement = element as HTMLElement

      htmlElement.scrollTo({
        left: htmlElement.scrollWidth - htmlElement.clientWidth,
        behavior: 'smooth',
      })
    }, 30)
  }

  if (currentColumns.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  const handleDragStart = (result: any) => {
    setShowDisposeArea(result.type === 'ColumnCards')
    setIsDragging(true)
  }

  const handleDragEnd = (result: any) => {
    setIsDragging(false)
    setShowDisposeArea(false)
    if (!result.destination) {
      return
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return
    }

    if (result.destination.droppableId === 'DisposeArea') {
      handleCardDispose(result)
    } else if (result.type === 'ColumnCards') {
      handleCardDragEnd(result)
    } else if (result.type === 'Columns') {
      handleColumnDragEnd(result)
    }
  }

  const handleColumnDragEnd = (result: any) => {
    const { destination, source } = result

    const movedColumnUUID = currentColumns[source.index]?.uuid
    const destinationColumnUUID = currentColumns[destination.index]?.uuid

    const newColumns = Array.from(currentColumns)
    const removedColumn = newColumns.splice(source.index, 1)[0]
    newColumns.splice(destination.index, 0, removedColumn)

    setCurrentColumns(newColumns)

    moveColumn({
      variables: {
        uuidFrom: movedColumnUUID,
        uuidTo: destinationColumnUUID,
      },
    })
  }

  const handleCardDragEnd = (result: any) => {
    const { destination, source } = result

    const sourceColumn = currentColumns.find(c => c.uuid === source.droppableId)
    const destinationColumn = currentColumns.find(
      c => c.uuid === destination.droppableId
    )
    if (sourceColumn === undefined || destinationColumn === undefined) {
      return
    }

    if (sourceColumn.uuid === destinationColumn.uuid) {
      const newCards = Array.from(sourceColumn.cards)
      const removedCard = newCards.splice(source.index, 1)[0]
      newCards.splice(destination.index, 0, removedCard)

      const newColumn = {
        ...sourceColumn,
        cards: newCards,
      }

      setCurrentColumns(prevColumns =>
        prevColumns.map(c => {
          if (c.uuid === newColumn.uuid) {
            return newColumn
          }
          return c
        })
      )
    } else {
      const sourceCards = Array.from(sourceColumn.cards)
      const removedCard = sourceCards.splice(source.index, 1)[0]

      const destinationCards = Array.from(destinationColumn.cards)
      destinationCards.splice(destination.index, 0, removedCard)

      const newSourceColumn = {
        ...sourceColumn,
        cards: sourceCards,
      }

      const newDestinationColumn = {
        ...destinationColumn,
        cards: destinationCards,
      }

      setCurrentColumns(prevColumns =>
        prevColumns.map(c => {
          if (c.uuid === newSourceColumn.uuid) {
            return newSourceColumn
          }
          if (c.uuid === newDestinationColumn.uuid) {
            return newDestinationColumn
          }
          return c
        })
      )
    }

    const movedCardUUID = sourceColumn.cards[source.index]?.uuid
    const destinationCardUUID = destinationColumn.cards[destination.index]?.uuid

    if (destinationCardUUID === undefined) {
      moveCardToColumn({
        variables: {
          cardUuid: movedCardUUID,
          columnUuid: destinationColumn.uuid,
        },
      })
    } else {
      moveCard({
        variables: {
          uuidFrom: movedCardUUID,
          uuidTo: destinationCardUUID,
        },
      })
    }
  }

  const handleCardDispose = (result: any) => {
    const { draggableId, source } = result

    const column = currentColumns.find(c => c.uuid === source.droppableId)

    if (column === undefined) {
      return
    }

    const newColumn = {
      ...column,
      cards: column.cards.filter(c => c.uuid !== draggableId),
    }

    setCurrentColumns(prevColumns =>
      prevColumns.map(c => {
        if (c.uuid === newColumn.uuid) {
          return newColumn
        }
        return c
      })
    )

    deleteCard({ variables: { cardUuid: draggableId } })
  }

  const handleCreateColumn = () => {
    setShouldScroll(true);
    createColumn({ variables: { project_uuid: props.uuid } })
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Paper elevation={1} sx={{ m: 1, position: 'relative' }}>
        <Typography variant="h3" sx={{ m: 2 }} data-cy={'name'}>
          {props.name}
        </Typography>

        <Droppable
          droppableId={props.uuid}
          type="Columns"
          direction="horizontal"
        >
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Grid
                ref={scrollable}
                container
                // spacing={2} breaks scrolling, children margin required
                direction="row"
                overflow="auto"
                wrap={'nowrap'}
                sx={{
                  scrollBehavior: 'smooth',
                }}
              >
                <Grid
                  container
                  // spacing={2} breaks scrolling, children margin required
                  direction="row"
                  wrap={'nowrap'}
                  width="auto"
                >
                  {currentColumns.map((col: any, index: number) => (
                    <Grid item key={col.uuid} order={index}>
                      <Column {...col} index={index}></Column>
                    </Grid>
                  ))}

                  <Grid item order={999999}>
                    {provided.placeholder}
                  </Grid>
                </Grid>
                <Grid item>
                  <AddColumn
                    onClick={handleCreateColumn}
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </Droppable>
        <CardModal
          users={props.users}
          tags={props.tags}
          milestones={props.milestones}
        />
        <MilestoneModal/>
        <DisposeArea />
      </Paper>
    </DragDropContext>
  )
}

export default Project
