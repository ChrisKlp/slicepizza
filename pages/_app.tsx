import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'components';
import { useApollo } from 'lib/apolloClient';
import type { AppContext, AppProps } from 'next/app';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React from 'react';
import 'styles/customNprogress.css';
import theme from 'styles/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}

// MyApp.getInitialProps = async function ({ Component, ctx }: AppContext) {
//   let pageProps = {} as any;

//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   pageProps.query = ctx.query;

//   return { pageProps };
// };

export default MyApp;
