import React from 'react'
import styles from './styles.module.scss'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Column} from "@graphql/types";
import ColumnCard from "@components/ColumnCard";


function Column(props: Column) {
  return (
    <Paper className={styles.column} elevation={3} sx={{ m: 2 }}>
      <Chip className={styles.column__tasksCounter} label={props.cards.length} size="small" />
      <Typography className={styles.column__title} variant="h2">{props.name}</Typography>
      <div>
        {props.cards.map(card => (
          <ColumnCard key={card.uuid} {...card} />
        ))}
      </div>
      <Button className={styles.column__addTask}><AddIcon /> Dodaj kartę</Button>
    </Paper>
  )
}

export default Column