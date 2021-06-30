import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
