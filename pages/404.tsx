import { VStack, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Custom404: React.FC = () => {
  return (
    <VStack h={80} spacing={2} align="center" justify="center">
      <Heading size="4xl">404</Heading>
      <Text>Page Not Found</Text>
    </VStack>
  );
};

export default Custom404;
