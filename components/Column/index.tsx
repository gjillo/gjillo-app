import styles from './styles.module.scss'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Button, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CreateCardDocument, ProjectQuery } from '@graphql/types'
import ColumnCard from '@components/ColumnCard'
import ColumnMenu from '@components/ColumnMenu'
import { Droppable } from 'react-beautiful-dnd'
import { useMutation } from '@apollo/client'

type Props = NonNullable<NonNullable<ProjectQuery['project']>['columns']>[0]

function Column(props: Props) {
  const [createCard] = useMutation(CreateCardDocument);

  return (
    <Paper className={styles.column} elevation={3} sx={{ m: 2 }}>
      <Chip
        className={styles.column__tasksCounter}
        label={props.cards.length}
        size="small"
      />

      <Typography className={styles.column__title} variant="h2">
        {props.name ?? 'New column'}
      </Typography>
      <Typography
        className={styles.column__type}
        variant="h3"
        fontSize={'small'}
      >
        {props.description ?? 'Place for all your amazing ideas!'}
      </Typography>

      <ColumnMenu
        className={styles.column__menu}
        columnType={props.type}
        columnUuid={props.uuid}
      />

      <Droppable droppableId={props.uuid}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.column__cards}
            style={{
              minHeight: '20px',
            }}
          >
            {props.cards.map((card, index) => (
              <ColumnCard {...card} key={card.uuid} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Button className={styles.column__addTask} onClick={() => createCard({variables: {columnUuid: props.uuid}})}>
        <AddIcon /> Add Card
      </Button>
    </Paper>
  )
}

export default Column
