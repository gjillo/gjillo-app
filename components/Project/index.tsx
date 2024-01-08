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
  ColumnCreatedDocument,
  ColumnDeletedDocument,
  CreateColumnDocument,
  MoveColumnDocument,
  ProjectQuery,
} from '@graphql/types'
import AddColumn from '@components/AddColumnButton'
import { useMutation, useSubscription } from '@node_modules/@apollo/client'
import { CircularProgress } from '@node_modules/@mui/material'
import Box from '@mui/material/Box'
import { MoveCardDocument } from '@graphql/types'
import { MoveCardToColumnDocument } from '@graphql/types'

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

  const scrollable = React.useRef(null)

  const [moveCard, {}] = useMutation(MoveCardDocument)
  const [moveCardToColumn, {}] = useMutation(MoveCardToColumnDocument)

  const [moveColumn] = useMutation(MoveColumnDocument)

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return
    }

    if (result.type === 'ColumnCards') {
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

    console.log(movedColumnUUID, destinationColumnUUID)
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper elevation={1} sx={{ m: 1 }}>
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
                {/* {currentColumns.map((col: any) =>
                        <Grid item key={col.uuid}>
                            <Column {...col}></Column>
                        </Grid>
                    )} */}
                {currentColumns.map((col: any, index: number) => (
                  <Grid item key={col.uuid}>
                    <Column {...col} index={index}></Column>
                  </Grid>
                ))}

                <Grid item>
                  <AddColumn
                    onClick={() =>
                      createColumn({ variables: { project_uuid: props.uuid } })
                    }
                  />
                </Grid>
              </Grid>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <CardModal
          users={props.users}
          tags={props.tags}
          milestones={props.milestones}
        />
      </Paper>
    </DragDropContext>
  )
}

export default Project
