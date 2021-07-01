import { Box } from '@chakra-ui/react';
import { CartProvider } from 'context/CartContext';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CartProvider>
        <Header />
        <Box as="main">{children}</Box>
        <Footer />
      </CartProvider>
    </>
  );
};

export default Layout;
