import {getSession} from "@utility/getSession";
import {redirect} from "next/navigation";
import Box from "@mui/material/Box";
import {List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {getClient} from "@app/ApolloClientRSC";
import {GetProjectsDocument} from "@graphql/types";
import SignOutButton from "@app/dashboard/SignOutButton";
import React from "react";

export default async function Component() {
    const session = await getSession();

    console.log("=======", process.env.APP_ENV);

    if (process.env.APP_ENV !== 'test' && (!session || !session.user)) {
        return redirect('/signin');
    }

    const {data} = await getClient().query({
        query: GetProjectsDocument
    });

    return (
        <Box data-cy={"dashboard"}
            sx={{
                p: 2
            }}
        >
            {session &&
                <SignOutButton/>
            }
            <Typography variant="h1">Dashboard</Typography>

            <Box sx={{height: "3rem"}} />

            <Typography variant="h4">Your projects:</Typography>

            <List>
                {data.projects.map(p =>
                    <ListItem key={p.uuid} data-cy={'project'}>
                        <ListItemButton href={`/project/${p.uuid}`}>
                            <ListItemText>
                                {p.name}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );
}