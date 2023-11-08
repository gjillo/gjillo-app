"use client"

import React from 'react'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Column, { ColumnProps } from "@components/Column";
import Grid from "@mui/material/Grid";


interface ProjectProps {
    uuid: number,
    name: string,
    created: string,
    columns: ColumnProps[]
}


function Project(props: ProjectProps) {
    return (
        <Paper elevation={1} sx={{ m: 1 }}>
            <Typography
                variant="h3"
                sx={{ m: 2 }}
            >{props.name}</Typography>
            <Grid
                container
                // spacing={2} breaks scrolling, children margin required
                direction="row"
                overflow="auto"
                wrap={"nowrap"}
            >
                {props.columns.map((col: any) =>
                    <Grid item key={col.uuid}>
                        <Column {...col}></Column>
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default Project