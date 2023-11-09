import React from 'react'
import Project from '@components/Project';
import { getClient } from '@app/ApolloClientRSC'
import project from '@queries/project.graphql';

import {ProjectDocument, ProjectQuery} from "@generated/graphql-operations";


export default async function ProjectPage({ params }: { params: { uuid: string }}) {
    const { data } = await getClient().query({
        query: ProjectDocument,
        variables: {
            projectUuid: params.uuid
        },
    });

    console.log(data)

    return (
        <>
            {data?.project &&
                <Project {...data.project} />
            }
        </>
    )
}