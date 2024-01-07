import React from 'react'
import styles from './styles.module.scss'

import { Chip, Paper, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { ProjectQuery } from '@graphql/types'
import { useDataContext } from '@app/DataContext'
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd'

function getStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  }
}

type Props = NonNullable<
  NonNullable<ProjectQuery['project']>['columns']
>[0]['cards'][0] & { index: number }

function ColumnCard(props: Props) {
  const {
    cardModal: { setCardUuid, setOpen },
  } = useDataContext()

  const handleClick = () => {
    setCardUuid(props.uuid)
    setOpen(true)
  }

  return (
    <Draggable
      key={props.uuid}
      draggableId={props.uuid}
      index={props.index}
      disableInteractiveElementBlocking={false}
    >
      {(provided, snapshot) => (
        <div
          className={styles.columncard}
          onClick={handleClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <Paper className={styles.columncard__content} elevation={4}>
            <Typography variant="body1" className={styles.columncard__name}>
              {!props.name || props.name === '' ? <i>No title</i> : props.name}
            </Typography>
            {/*{labels && (*/}
            {/*  <ul className={styles.columncard__labels}>*/}
            {/*    {labels.map(label => (*/}
            {/*      <li key={label.name}><Chip className={styles.columncard__label} label={label.name} sx={{ backgroundColor: label.color }} size="small" /></li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            {/*)}*/}
            {/*{assignee && (*/}
            {/*  <Tooltip title={assignee}>*/}
            {/*    <Avatar className={styles.columncard__assignee} src="/to/be/changed.png" />*/}
            {/*  </Tooltip>*/}
            {/*)}*/}

            {props.deadline && (
              <Chip
                className={styles.columncard__date}
                label={new Date(props.deadline).toLocaleDateString()}
                icon={<CalendarMonthIcon />}
              />
            )}
          </Paper>
        </div>
      )}
    </Draggable>
  )
}

export default ColumnCard
