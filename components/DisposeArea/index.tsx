import { Paper } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDataContext } from '@app/DataContext'
import { Droppable } from 'react-beautiful-dnd'

function DisposeArea() {
  const {
    dragAndDrop: { showDisposeArea },
  } = useDataContext()

  return (
    <Droppable droppableId={'DisposeArea'} type="ColumnCards">
      {provided => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '100px',
            width: '150px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'error.main',
            opacity: showDisposeArea ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <DeleteIcon sx={{ color: 'error.main' }} />
          <div style={{ display: 'none' }}>{provided.placeholder}</div>
        </Paper>
      )}
    </Droppable>
  )
}

export default DisposeArea
