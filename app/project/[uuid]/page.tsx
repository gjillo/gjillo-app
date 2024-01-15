import React from 'react'
import Project from '@components/Project';
import { getClient } from '@app/ApolloClientRSC'
import {ProjectDocument} from "@graphql/types";
import SignOutButton from "@app/dashboard/SignOutButton";
import {getSession} from "@utility/getSession";


export default async function ProjectPage({ params }: { params: { uuid: string }}) {
    const { data } = await getClient().query({
        query: ProjectDocument,
        variables: {
            projectUuid: params.uuid
        },
    });

    const session = await getSession();

    return (
        <>
            {session &&
                <SignOutButton/>
            }
            {data.project &&
                <Project {...data.project} />
            }
        </>
    )
}