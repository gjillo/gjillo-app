import React from 'react'
import styles from './styles.module.scss'

import { Avatar, Button, Chip, Paper, Tooltip, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Card} from "@generated/graphql-operations";

interface Label {
  name: string
  color: string
}

function ColumnCard(props: Card) {
  return (
    <Button className={styles.columncard}>
      <Paper className={styles.columncard__content} elevation={4}>
        <Typography variant="body1" className={styles.columncard__name}>{props.name}</Typography>
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

        {props.created && (
          <Chip className={styles.columncard__date} label={props.created} icon={<CalendarMonthIcon />} />
        )}
      </Paper>
    </Button>
  )
}

export default ColumnCard