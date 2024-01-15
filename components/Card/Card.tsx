import {Chip, Paper, Typography} from "@node_modules/@mui/material";
import styles from "./styles.module.scss";
import CalendarMonthIcon from "@node_modules/@mui/icons-material/CalendarMonth";
import React from "react";
import {ProjectQuery} from "@graphql/types";
import {Avatar, AvatarGroup, SxProps, Tooltip} from "@mui/material";

type Card = NonNullable<
    NonNullable<ProjectQuery['project']>['columns']
>[0]['cards'][0]

type Props = {
    name: Card['name']
    deadline: Card['deadline'],
    tags: Card['tags'],
    assignees: Card['assignees'],
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
                {props.tags && (
                  <ul className={styles.labels}>
                    {props.tags.map(tag => (
                      <li key={tag.value}><Chip className={styles.label} label={tag.value} sx={{ backgroundColor: tag.color }} size="small" /></li>
                    ))}
                </ul>
                )}
                {props.assignees && (
                    <AvatarGroup max={3} className={styles.assignees}>
                        {props.assignees.map(ass =>
                            <Tooltip title={ass.name}>
                                <Avatar src={ass.image} className={styles.avatar} data-cy="assigneeImage"/>
                            </Tooltip>
                        )}
                    </AvatarGroup>
                )}

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