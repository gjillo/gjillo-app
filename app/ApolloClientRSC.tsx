import {ApolloClient, DefaultOptions, HttpLink, InMemoryCache} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        ssrMode: true,
        // Remember that this is the interface the SSR server will use to connect to the
        // API server, so we need to ensure it isn't firewalled, etc
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GQL_SERVER,
        }),
        cache: new InMemoryCache(),
        defaultOptions: defaultOptions, // Disable cache
    });
});