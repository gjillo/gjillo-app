"use client"

import React, {useEffect, useState} from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Column from "@components/Column";
import Grid from "@mui/material/Grid";
import CardModal from '@components/CardModal';
import {
    ColumnCreatedDocument,
    ColumnDeletedDocument,
    CreateColumnDocument,
    ProjectQuery
} from "@graphql/types";
import AddColumn from "@components/AddColumnButton";
import {useMutation, useSubscription} from "@node_modules/@apollo/client";
import {CircularProgress} from "@node_modules/@mui/material";
import Box from "@mui/material/Box";

type Props = NonNullable<ProjectQuery['project']>

function Project(props: Props) {
    const [currentColumns, setCurrentColumns] = useState<Props["columns"]>([]);

    const [createColumn] = useMutation(CreateColumnDocument);
    const {data: subscriptionCreatedColumns} = useSubscription(ColumnCreatedDocument);

    const {data: subscriptionDeletedColumns} = useSubscription(ColumnDeletedDocument);

    const scrollable = React.useRef(null);

    useEffect(() => {
        setCurrentColumns(props.columns);
    }, [props]);

    useEffect(() => {
        if (subscriptionCreatedColumns === undefined) {
            return;
        }
        setCurrentColumns((prevColumns) => prevColumns.concat([subscriptionCreatedColumns.column_created]))
        scrollToLastColumn();
    }, [subscriptionCreatedColumns]);

    useEffect(() => {
        if (subscriptionDeletedColumns === undefined) {
            return;
        }
        setCurrentColumns((prevColumns) => prevColumns.filter(c => c.uuid !== subscriptionDeletedColumns.column_deleted))
    }, [subscriptionDeletedColumns]);

    const scrollToLastColumn = () => {
        setTimeout(()=>{
            const element = scrollable.current;
            if (element == null) return;
            const htmlElement = element as HTMLElement;

            htmlElement.scrollTo({
                left: htmlElement.scrollWidth - htmlElement.clientWidth,
                behavior: "smooth"
            })
        },30);
    }

    if (currentColumns.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    height: '100%'
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Paper elevation={1} sx={{m: 1}}>
            <Typography
                variant="h3"
                sx={{m: 2}}
            >{props.name}</Typography>
            <Grid
                ref={scrollable}
                container
                // spacing={2} breaks scrolling, children margin required
                direction="row"
                overflow="auto"
                wrap={"nowrap"}
                sx={{
                    scrollBehavior: "smooth"
                }}
            >
                {currentColumns.map((col: any) =>
                    <Grid item key={col.uuid}>
                        <Column {...col}></Column>
                    </Grid>
                )}

                <Grid item>
                    <AddColumn onClick={() => createColumn({variables: {project_uuid: props.uuid}})}/>
                </Grid>
            </Grid>
            <CardModal users={props.users} tags={props.tags} milestones={props.milestones}/>
        </Paper>
    )
}

export default Project