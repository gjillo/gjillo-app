import React from 'react'

import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function AddColumn({onClick}: { onClick?: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <Paper elevation={3} sx={{ m: 2, p: 1 }}>
            <Button onClick={onClick}><AddIcon /></Button>
        </Paper>
    )
}

export default AddColumn