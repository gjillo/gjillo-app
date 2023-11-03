import React from 'react'
import styles from './styles.module.scss'
import ColumnCard from '../ColumnCard';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const tasks = [
  {
    name: 'Zadanie 1',
    labels: [
      {
        name: 'Frontend',
        color: '#FF0000'
      }
    ],
    date: '2021-10-01',
    assignee: 'Jan Kowalski'
  },
  {
    name: 'Zadanie 2',
    labels: [
      {
        name: 'Backend',
        color: '#00FF00'
      },
      {
        name: 'Frontend',
        color: '#FF0000'
      },
      {
        name: 'DevOps',
        color: '#0000FF'
      },
      {
        name: 'Cos tam',
        color: '#2124af'
      }
    ],
    date: '2021-10-01',
    assignee: 'Jan Kowalski'
  },
  {
    name: 'Zadanie 3',
    date: '2021-10-01',
  },
  {
    name: 'Zadanie kolejne'
  }
]

interface ColumnProps {
  name: string

}

function Column({name}: ColumnProps) {
  return (
    <Paper className={styles.column} elevation={3}>
      <Chip className={styles.column__tasksCounter} label={tasks.length} size="small" />
      <Typography className={styles.column__title} variant="h2">{name}</Typography>
      <div>
        {tasks.map(task => (
          <ColumnCard key={task.name} {...task} />
        ))}
      </div>
      <Button className={styles.column__addTask}><AddIcon /> Dodaj kartę</Button>
    </Paper>
  )
}

export default Column