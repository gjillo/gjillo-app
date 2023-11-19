"use client"

import React, {useState} from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Column from "@components/Column";
import Grid from "@mui/material/Grid";

import CardModal from '@components/CardModal';

import {Project} from "@graphql/types";
import AddColumn from "@components/AddColumnButton";
import FakeColumn from '@components/FakeColumn';


function Project(props: Project) {
    const [isCreatingColumn, setIsCreatingColumn] = useState(false);
    const scrollable = React.useRef(null);

    const startCreatingColumn = () => {
        setIsCreatingColumn(true)
        setTimeout(()=>{
            const element = scrollable.current;
            if (element == null) return;
            const htmlElement = element as HTMLElement;
            htmlElement.scrollTo({
                left: htmlElement.scrollWidth - htmlElement.clientWidth,
                behavior: "smooth"
            })
        },0)
    }

    const stopCreatingColumn = () => {
        setIsCreatingColumn(false)
    }

    return (
        <Paper elevation={1} sx={{ m: 1 }}>
            <Typography
                variant="h3"
                sx={{ m: 2 }}
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
                {props.columns.map((col: any) =>
                    <Grid item key={col.uuid}>
                        <Column {...col}></Column>
                    </Grid>
                )}
                <Grid item>
                    {isCreatingColumn ?
                        <FakeColumn onFinished={stopCreatingColumn}/>
                        :
                        <AddColumn onClick={startCreatingColumn}/>
                    }
                </Grid>
            </Grid>
            <CardModal />
        </Paper>
    )
}

export default Project