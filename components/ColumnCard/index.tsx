import React from 'react'
import styles from './styles.module.scss'

import { Avatar, Button, Chip, Paper, Tooltip, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface Label {
  name: string
  color: string
}

interface ColumnCardProps {
  name: string
  labels?: Label[]
  date?: string
  assignee?: string
}

function ColumnCard({ name, labels, date, assignee }: ColumnCardProps) {
  return (
    <Button className={styles.columncard}>
      <Paper className={styles.columncard__content} elevation={4}>
        <Typography variant="body1" className={styles.columncard__name}>{name}</Typography>
        {labels && (
          <ul className={styles.columncard__labels}>
            {labels.map(label => (
              <li><Chip className={styles.columncard__label} key={label.name} label={label.name} sx={{ backgroundColor: label.color }} size="small" /></li>
            ))}
        </ul>
        )}
        {assignee && (
          <Tooltip title={assignee}>
            <Avatar className={styles.columncard__assignee} src="/to/be/changed.png" />
          </Tooltip>
        )}

        {date && (
          <Chip className={styles.columncard__date} label={date} icon={<CalendarMonthIcon />} />
        )}
      </Paper>
    </Button>
  )
}

export default ColumnCard