import React from 'react'
import styles from './styles.module.scss'

import { Button, Chip, Paper, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {ProjectQuery} from "@graphql/types";
import {useDataContext} from "@app/DataContext";

type Props = NonNullable<NonNullable<ProjectQuery['project']>["columns"]>[0]["cards"][0]

function ColumnCard(props: Props) {
  const { cardModal: { setCardUuid, setOpen } } = useDataContext()

  const handleClick = () => {
    setCardUuid(props.uuid)
    setOpen(true)
  }

  return (
    <Button className={styles.columncard} onClick={handleClick}>
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

        {props.deadline && (
          <Chip className={styles.columncard__date} label={new Date(props.deadline).toLocaleDateString()} icon={<CalendarMonthIcon />} />
        )}
      </Paper>
    </Button>
  )
}

export default ColumnCard