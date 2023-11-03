import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        uri: "https://localhost:4000/grahpql/",
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;