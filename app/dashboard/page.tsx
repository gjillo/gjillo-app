import {getSession} from "@utility/getSession";
import {redirect} from "next/navigation";
import Box from "@mui/material/Box";
import {List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {getClient} from "@app/ApolloClientRSC";
import {GetProjectsDocument} from "@graphql/types";

export default async function Component() {
    const session = await getSession();

    if (!session || !session.user) {
        return redirect('/signin');
    }

    const {data} = await getClient().query({
        query: GetProjectsDocument
    });

    return (
        <Box data-cy={"dashboard"}>
            <Typography variant="h1">Dashboard</Typography>

            <Box sx={{height: "3rem"}} />

            <Typography variant="h4">Your projects:</Typography>

            <List>
                {data.projects.map(p =>
                    <ListItem key={p.uuid}>
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