import React from 'react'
import {List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";

export default function Home() {
    return (
        <>
            <Typography variant="h1">Home</Typography>
            <List>
                <ListItem>
                    <ListItemButton href="/project/1">
                        <ListItemText>
                            Project 1
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href="/signin">
                        <ListItemText>
                            Sign In
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton href="/dashboard">
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}
