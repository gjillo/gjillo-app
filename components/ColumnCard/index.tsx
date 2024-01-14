import React from 'react'

import { ProjectQuery } from '@graphql/types'
import { useDataContext } from '@app/DataContext'
import { Draggable } from 'react-beautiful-dnd'
import disableDropAnimation from '@utility/disableDropAnimation'
import Card from "@components/Card/Card";

type Props = NonNullable<
  NonNullable<ProjectQuery['project']>['columns']
>[0]['cards'][0] & { index: number }

function ColumnCard(props: Props) {
  const {
    cardModal: { setCardUuid, setOpen },
  } = useDataContext()

  const handleClick = () => {
    setCardUuid(props.uuid)
    setOpen(true)
  }

  return (
    <Draggable
      key={props.uuid}
      draggableId={props.uuid}
      index={props.index}
      disableInteractiveElementBlocking={false}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={disableDropAnimation(provided.draggableProps.style, snapshot)}
          onClick={handleClick}
        >
          <Card
            name={props.name}
            deadline={props.deadline}
            tags={props.tags}
            assignees={props.assignees}
            sx={{
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: snapshot.draggingOver == 'DisposeArea' ? 'error.main' : 'transparent',
              transition: 'border-color 0.3s',
            }}
          />
        </div>
      )}
    </Draggable>
  )
}

export default ColumnCard
