import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default function Provider ({ children }) {
    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    );
}
