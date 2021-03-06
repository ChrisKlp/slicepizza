import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'components';
import { AuthProvider } from 'context/AuthContext';
import { CartProvider } from 'context/CartContext';
import { useApollo } from 'lib/apolloClient';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React from 'react';
import 'styles/customNprogress.css';
import theme from 'styles/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const seo = {
  title: 'Slice Pizza',
  description: 'Pizza Delivery. Best pizza in Poland',
  openGraph: {
    type: 'website',
    url: 'https://slicepizza.vercel.app/',
    site_name: 'Slice Pizza',
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <>
      <DefaultSeo {...seo} />
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <CartProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CartProvider>
          </AuthProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
