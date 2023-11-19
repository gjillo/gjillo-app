"use client"

import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Column from "@components/Column";
import Grid from "@mui/material/Grid";
import {ProjectDetails} from "@graphql/types";
import CardModal from '@components/CardModal';
import { useDataContext, IDataContext } from "@app/DataContext";


function Project(props: ProjectDetails) {

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
            <CardModal />
        </Paper>
    )
}

export default Project