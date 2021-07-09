/* eslint-disable no-console */
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { parseCookies } from 'nookies';
import { useMemo } from 'react';

let globalApolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:1337/graphql'
      : process.env.NEXT_PUBLIC_ENDPOINT,
  credentials: 'same-origin',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError)
    console.log(
      `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
    );
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = parseCookies().jwt;

  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }));
  }

  return forward(operation);
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState?: NormalizedCacheObject) => {
  const apolloClient = globalApolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = apolloClient.extract();

    apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === 'undefined') return apolloClient;

  if (!globalApolloClient) globalApolloClient = apolloClient;

  return apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
