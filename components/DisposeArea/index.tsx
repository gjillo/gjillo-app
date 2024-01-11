import { Box } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDataContext } from '@app/DataContext'
import { Droppable } from 'react-beautiful-dnd'

function DisposeArea() {
  const {
    dragAndDrop: { isDragging },
  } = useDataContext()

  return (
    <Droppable droppableId={'DisposeArea'} type="ColumnCards">
      {provided => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            width: '150px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'error.main',
            opacity: isDragging ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <DeleteIcon sx={{ color: 'error.main' }} />
          <div style={{ display: 'none' }}>{provided.placeholder}</div>
        </Box>
      )}
    </Droppable>
  )
}

export default DisposeArea
