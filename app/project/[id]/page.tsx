import React from 'react'
import Project from '@/components/Project';
import { getClient } from '@app/ApolloClientRSC'
import project from "@/queries/project.graphql";


export default async function ProjectPage({ params }: { params: { id: number }}) {
    const { data } = await getClient().query({
        query: project,
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
