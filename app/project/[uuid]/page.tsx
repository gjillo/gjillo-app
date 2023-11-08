import React from 'react'
import Project from '@components/Project';
import { getClient } from '@app/ApolloClientRSC'
import project from '@graphql/project.query.graphql';


export default async function ProjectPage({ params }: { params: { uuid: string }}) {
    const { data } = await getClient().query({
        query: project,
        variables: {
            projectUuid: params.uuid
        },
    });

    return (
        <>
            <Project {...data.project} />
        </>
    )
}
