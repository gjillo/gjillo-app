import React from 'react'
import styles from './styles.module.scss'
import ColumnCard from '../ColumnCard';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Button, Chip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {gql, useMutation} from "@apollo/client";
import {
    useQuery,
    useSuspenseQuery,
    useBackgroundQuery,
    useReadQuery,
    useFragment,
} from "@apollo/experimental-nextjs-app-support/ssr";
import Column from "@/components/Column";

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
        variables: {projectId: 1},
    });
    // console.log("Get", data)
    if (data) {
        console.log(data.project)
    }


    return (
        <>
            <Typography>Project {id}</Typography>
            <div className={styles.columns}>
                {data && data.project.columns.map(col =>
                    <Column {...col} key={col.id}></Column>
                )}
            </div>
        </>
    )
}

export default Project