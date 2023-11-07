import React from 'react'
import styles from './styles.module.scss'
import ColumnCard, { ColumnCardProps } from '../ColumnCard';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// const tasks = [
//   {
//     name: 'Zadanie 1',
//     labels: [
//       {
//         name: 'Frontend',
//         color: '#FF0000'
//       }
//     ],
//     date: '2021-10-01',
//     assignee: 'Jan Kowalski'
//   },
//   {
//     name: 'Zadanie 2',
//     labels: [
//       {
//         name: 'Backend',
//         color: '#00FF00'
//       },
//       {
//         name: 'Frontend',
//         color: '#FF0000'
//       },
//       {
//         name: 'DevOps',
//         color: '#0000FF'
//       },
//       {
//         name: 'Cos tam',
//         color: '#2124af'
//       }
//     ],
//     date: '2021-10-01',
//     assignee: 'Jan Kowalski'
//   },
//   {
//     name: 'Zadanie 3',
//     date: '2021-10-01',
//   },
//   {
//     name: 'Zadanie kolejne'
//   }
// ]

export interface ColumnProps {
  id: number,
  name: string,
  type: string,
  description: string,
  cards: ColumnCardProps[],
}

function Column({name, type, description, cards}: ColumnProps) {
  return (
    <Paper className={styles.column} elevation={3} sx={{ m: 2 }}>
      <Chip className={styles.column__tasksCounter} label={cards.length} size="small" />
      <Typography className={styles.column__title} variant="h2">{name}</Typography>
      <div>
        {cards.map(card => (
          <ColumnCard key={card.id} {...card} />
        ))}
      </div>
      <Button className={styles.column__addTask}><AddIcon /> Dodaj kartę</Button>
    </Paper>
  )
}

export default Column