import React from 'react'
import styles from './styles.module.scss'

import { Avatar, Button, Chip, Paper, Tooltip, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface Label {
  name: string
  color: string
}

interface TaskProps {
  name: string
  labels?: Label[]
  date?: string
  assignee?: string
}

function Task({ name, labels, date, assignee }: TaskProps) {
  return (
    <Button className={styles.task}>
      <Paper className={styles.task__content} elevation={4}>
        <Typography variant="body1" className={styles.task__name}>{name}</Typography>
        {labels && (
          <ul className={styles.task__labels}>
            {labels.map(label => (
              <li><Chip className={styles.task__label} key={label.name} label={label.name} sx={{ backgroundColor: label.color }} size="small" /></li>
            ))}
        </ul>
        )}
        {assignee && (
          <Tooltip title={assignee}>
            <Avatar className={styles.task__assignee} src="/to/be/changed.png" />
          </Tooltip>
        )}

        {date && (
          <Chip className={styles.task__date} label={date} icon={<CalendarMonthIcon />} />
        )}
      </Paper>
    </Button>
  )
}

export default Task