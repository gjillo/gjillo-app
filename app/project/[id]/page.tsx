import React from 'react'
import Project from '@/components/Project';
import { getClient } from '@app/ApolloClientRSC'
import {gql} from "@node_modules/@apollo/client";

const GET_PROJECTS = gql`
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


export default async function ProjectPage({ params }: { params: { id: number }}) {
    const { data } = await getClient().query({
        query: GET_PROJECTS,
        variables: {
            projectId: Number(params.id)
        },
    });

    return (
        <>
            <Project {...data.project} />
        </>
    )
}
