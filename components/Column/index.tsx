import React from 'react'
import styles from './styles.module.scss'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Button, Chip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {ProjectQuery} from "@graphql/types";
import ColumnCard from "@components/ColumnCard";
import ColumnMenu from "@components/ColumnMenu";

type Props = NonNullable<NonNullable<ProjectQuery['project']>["columns"]>[0]

function Column(props: Props) {
  return (
    <Paper className={styles.column} elevation={3} sx={{ m: 2 }}>
      <Chip className={styles.column__tasksCounter} label={props.cards.length} size="small" />
      <Typography className={styles.column__title} variant="h2">{props.name}</Typography>
      <Typography className={styles.column__type} variant="h3" fontSize={"small"}>{props.description}</Typography>
      <ColumnMenu className={styles.column__menu} columnType={props.type}/>
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