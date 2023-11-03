'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {gql, useMutation} from "@apollo/client";
import createApolloClient from "../ApolloClient";
import {
    useQuery,
    useSuspenseQuery,
    useBackgroundQuery,
    useReadQuery,
    useFragment,
} from "@apollo/experimental-nextjs-app-support/ssr";


const ADD_USER = gql`
    mutation AddUser(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $username: String!,
        $password: String!,
    ) {
        add_user(
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            username: $username,
            password: $password,
        ) {
            id
            first_name
            last_name
            email
            username
            password
        }
    }
`;

// const ADD_USER = gql`
//     mutation AddUser(
//         $first_name: String!,
//         $last_name: String!,
//         $email: String!,
//         $username: String!,
//         $password: String!,
//     ) {
//         add_user(
//             first_name: $first_name,
//             last_name: $last_name,
//             email: $email,
//             username: $username,
//             password: $password,
//         ) {
//             id
//             first_name
//             last_name
//             email
//             username
//             password
//         }
//     }
// `;

export default function Register() {

    // const [add_user, { data, loading, error }] = useMutation(ADD_USER);

    const { loading, error, data } = useQuery(gql`
        query Users {
            users {
                users {
                    user_id
                    first_name
                    last_name
                    email
                    username
                    register_timestamp
                    last_login_timestamp
                }
            }
        }`)
    console.log(data)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { loading, error, data } = useQuery(gql`
            query Users {
                users {
                    users {
                        user_id
                        first_name
                        last_name
                        email
                        username
                        register_timestamp
                        last_login_timestamp
                    }
                }
            }`)
        console.log(data)
        // const data = new FormData(event.currentTarget);
        // // add_user({variables: {
        // //         firstName: data.get('firstName'),
        // //         lastName: data.get('lastName'),
        // //         email: data.get('email'),
        // //         username: data.get('username'),
        // //         password: data.get('password'),
        // //     }})
        // console.log({
        //     firstName: data.get('firstName'),
        //     lastName: data.get('lastName'),
        //     email: data.get('email'),
        //     username: data.get('username'),
        //     password: data.get('password'),
        // });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}