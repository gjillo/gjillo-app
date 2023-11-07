"use client"

import React from 'react'
import styles from './styles.module.scss'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {gql, useMutation} from "@apollo/client";
import {
    useQuery,
    useSuspenseQuery,
    useBackgroundQuery,
    useReadQuery,
    useFragment,
} from "@apollo/experimental-nextjs-app-support/ssr";
import Column, { ColumnProps } from "@/components/Column";
import Grid from "@mui/material/Grid";
import {Alert, LinearProgress} from "@mui/material";


interface ProjectProps {
    id: number,
    name: string,
    created: string,
    columns: ColumnProps[]
}

function Project(props: ProjectProps) {
    // const {loading, error, data} = useQuery(GET_PROJECT, {
    //     variables: {projectId: id},
    // });
    //
    // if (loading) return <LinearProgress />
    // if (error) return <Alert severity="error">{`${error}`}</Alert>

    console.log(props)

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
                    <Grid item key={col.id}>
                        <Column {...col}></Column>
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default Project