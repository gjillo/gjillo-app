"use client";
// ^ this file needs the "use client" pragma

import {ApolloLink, HttpLink, split} from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";

// have a function to create a client for you
function makeClient() {
    const httpLink = new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: process.env.NEXT_PUBLIC_GQL_SERVER,
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        fetchOptions: {cache: "no-store"},
        // you can override the default `fetchOptions` on a per query basis
        // via the `context` property on the options passed as a second argument
        // to an Apollo Client data fetching hook, e.g.:
        // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
    });

    const wsLink = new GraphQLWsLink(createClient({
        url: process.env.NEXT_PUBLIC_GQL_WS_SERVER ?? ""
    }));

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    return new NextSSRApolloClient({
        // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    // in a SSR environment, if you use multipart features like
                    // @defer, you need to decide how to handle these.
                    // This strips all interfaces with a `@defer` directive from your graphql.
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    splitLink,
                ])
                : splitLink,
    });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({children}: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}