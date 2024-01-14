import {Chip, Paper, Typography} from "@node_modules/@mui/material";
import styles from "./styles.module.scss";
import CalendarMonthIcon from "@node_modules/@mui/icons-material/CalendarMonth";
import React from "react";
import {ProjectQuery} from "@graphql/types";
import {SxProps} from "@mui/material";

type Card = NonNullable<
    NonNullable<ProjectQuery['project']>['columns']
>[0]['cards'][0]

type Props = {
    name: Card['name']
    deadline: Card['deadline'],
    sx?: SxProps,
}

export default function CardInner (props: Props) {
    return (
        <div
            className={styles.card}
        >
            <Paper className={styles.content} elevation={4} sx={props.sx}>
                <Typography variant="body1" className={styles.name}>
                    {!props.name || props.name === '' ? <i>No title</i> : props.name}
                </Typography>
                {/*{labels && (*/}
                {/*  <ul className={styles.labels}>*/}
                {/*    {labels.map(label => (*/}
                {/*      <li key={label.name}><Chip className={styles.label} label={label.name} sx={{ backgroundColor: label.color }} size="small" /></li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                {/*)}*/}
                {/*{assignee && (*/}
                {/*  <Tooltip title={assignee}>*/}
                {/*    <Avatar className={styles.assignee} src="/to/be/changed.png" />*/}
                {/*  </Tooltip>*/}
                {/*)}*/}

                {props.deadline && (
                    <Chip
                        className={styles.date}
                        label={new Date(props.deadline).toLocaleDateString()}
                        icon={<CalendarMonthIcon />}
                    />
                )}
            </ Paper>
        </div>
    )
}