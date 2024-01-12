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

  const scrollable = React.useRef(null)

  const [moveCard, {}] = useMutation(MoveCardDocument)
  const [moveCardToColumn, {}] = useMutation(MoveCardToColumnDocument)

  const [moveColumn] = useMutation(MoveColumnDocument)

  const [deleteCard] = useMutation(DeleteCardDocument)

  const {
    dragAndDrop: { setIsDragging },
  } = useDataContext()

  useEffect(() => {
    setCurrentColumns(props.columns)
  }, [props])

  useEffect(() => {
    if (subscriptionCreatedColumns === undefined) {
      return
    }
    setCurrentColumns(prevColumns =>
      prevColumns.concat([subscriptionCreatedColumns.column_created])
    )
    scrollToLastColumn()
  }, [subscriptionCreatedColumns])

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
    setIsDragging(true)
  }

  const handleDragEnd = (result: any) => {
    setIsDragging(false)
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

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Paper elevation={1} sx={{ m: 1, position: 'relative' }}>
        <Typography variant="h3" sx={{ m: 2 }}>
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
                    onClick={() =>
                      createColumn({ variables: { project_uuid: props.uuid } })
                    }
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
        <DisposeArea />
      </Paper>
    </DragDropContext>
  )
}

export default Project
