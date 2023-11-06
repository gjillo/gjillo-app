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
import Column from "@/components/Column";
import Grid from "@mui/material/Grid";
import {Alert, LinearProgress} from "@mui/material";

const GET_PROJECT = gql`
    query Project($projectId: Int!) {
        project(projectId: $projectId) {
            id
            name
            created
            columns {
                id
                name
                order
                type
                description
                cards {
                    id
                    name
                    description
                    story_points
                    created
                    order
                }
            }
        }
    }`


interface ProjectProps {
    id: number
}

function Project({id}: ProjectProps) {
    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables: {projectId: id},
    });

    if (loading) return <LinearProgress />
    if (error) return <Alert severity="error">{`${error}`}</Alert>

    console.log(data)

    return (
        <Paper elevation={1} sx={{ m: 1 }}>
            <Typography
                variant="h3"
                sx={{ m: 2 }}
            >{data.project.name}</Typography>
            <Grid
                container
                // spacing={2} breaks scrolling, children margin required
                direction="row"
                overflow="auto"
                wrap={"nowrap"}
            >
                {data.project.columns.map((col: any) =>
                    <Grid item key={col.id}>
                        <Column {...col}></Column>
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default Project