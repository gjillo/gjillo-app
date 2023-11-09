"use client"

import React from 'react'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Column from "@components/Column";
import Grid from "@mui/material/Grid";
import {Alert, LinearProgress} from "@mui/material";

import {useQuery} from "@apollo/client";
import {ProjectDocument} from "@generated/graphql-operations";
import {Project} from "@generated/graphql-operations";


function Project(props: Project) {
    console.log(props)
    const { loading, data, error } = useQuery(ProjectDocument,{
        variables: {
            projectUuid: props.uuid
        },
    });
    if (loading) return <LinearProgress />
    if (error) return <Alert severity="error">{`${error}`}</Alert>

    console.log(data)

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