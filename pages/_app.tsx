import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'components';
import { AuthProvider } from 'context/AuthContext';
import { CartProvider } from 'context/CartContext';
import { initializeApollo, useApollo } from 'lib/apolloClient';
import { CURRENT_USER } from 'lib/queries';
import type { AppContext, AppProps } from 'next/app';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React from 'react';
import 'styles/customNprogress.css';
import theme from 'styles/theme';
import { CurrentUser } from 'types/CurrentUser';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type MyAppProps = {
  user: CurrentUser | null;
} & AppProps;

const MyApp = ({ Component, pageProps, user }: MyAppProps) => {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <AuthProvider currentUser={user}>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let pageProps = {} as any;
  let user = {} as CurrentUser | null;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;

  const { jwt } = parseCookies(ctx);

  if (jwt) {
    const apolloClient = initializeApollo();
    await apolloClient
      .query({
        query: CURRENT_USER,
        context: {
          headers: { authorization: `Bearer ${jwt}` },
        },
      })
      .then(({ data }) => {
        user = data;
      })
      .catch(() => {
        user = null;
      });
  }

  return { pageProps, user };
};

export default MyApp;
