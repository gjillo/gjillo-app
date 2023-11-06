import React from 'react'
import Project from '@/components/Project';

export default function Home({ params }: { params: { id: number }}) {
    return (
        <>
            <Project id={Number(params.id)} />
        </>
    )
}
