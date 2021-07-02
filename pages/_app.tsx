import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'components';
import { useApollo } from 'lib/apolloClient';
import redirectUser from 'lib/redirectUser';
import type { AppContext, AppProps } from 'next/app';
import { NextRouter } from 'next/dist/client/router';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'styles/customNprogress.css';
import theme from 'styles/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState, pageProps.jwt);

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

type TPageProps = {
  jwt?: string;
} & Partial<NextRouter>;

MyApp.getInitialProps = async function ({ Component, ctx }: AppContext) {
  let pageProps = {} as TPageProps;
  const jwt = parseCookies(ctx).jwt;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!jwt) {
    if (ctx.pathname === '/profile') {
      redirectUser(ctx, '/login');
    }
  }

  pageProps.query = ctx.query;
  pageProps.jwt = jwt;

  return { pageProps };
};

export default MyApp;
