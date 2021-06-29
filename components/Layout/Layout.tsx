import { Box } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="main">{children}</Box>
    </>
  );
};

export default Layout;
