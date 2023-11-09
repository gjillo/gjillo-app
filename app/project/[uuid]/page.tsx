import React from 'react'
import Project from '@components/Project';
import { getClient } from '@app/ApolloClientRSC'
import {ProjectDocument} from "@graphql/types";


export default async function ProjectPage({ params }: { params: { uuid: string }}) {
    const { data } = await getClient().query({
        query: ProjectDocument,
        variables: {
            projectUuid: params.uuid
        },
    });

    return (
        <>
            <Project {...data.project!} />
        </>
    )
}