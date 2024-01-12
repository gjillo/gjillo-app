import React from 'react'
import styles from './styles.module.scss'

import { Chip, Paper, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { ProjectQuery } from '@graphql/types'
import { useDataContext } from '@app/DataContext'
import { Draggable } from 'react-beautiful-dnd'
import disableDropAnimation from '@utility/disableDropAnimation'

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
          style={disableDropAnimation(provided.draggableProps.style, snapshot)}
        >
          <Paper className={styles.columncard__content} elevation={4} sx={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: snapshot.draggingOver == 'DisposeArea' ? 'error.main' : 'transparent',
            transition: 'border-color 0.3s',
          }}>
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
