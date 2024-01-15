import React from 'react'
import styles from './styles.module.scss'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Button, Chip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ColumnMenu from "@components/ColumnMenu";
import Column from "@components/Column";


function FakeColumn({onFinished}: { onFinished?: React.MouseEventHandler<HTMLButtonElement>}) {
  return (
    // <Column
    //     name={"Name placeholder"}
    //     description={"Description placeholder"}
    //     cards={[]}
    //     order={9999999}
    //     uuid={"abc"}
    // />
    <Paper className={styles.column} elevation={3} sx={{ m: 2 }}>
      <Chip className={styles.column__tasksCounter} label={0} size="small" />
      <Typography className={styles.column__title} variant="h2">{"Name placeholder"}</Typography>
      <Typography className={styles.column__type} variant="h3" fontSize={"small"}>{"Description placeholder"}</Typography>
      <ColumnMenu className={styles.column__menu} columnType={null} columnUuid={''}/>
      <Button className={styles.column__addTask} onClick={onFinished}>Temp finish creating/submit</Button>
      <Button className={styles.column__addTask}><AddIcon /> Add card</Button>
    </Paper>
  )
}

export default FakeColumn