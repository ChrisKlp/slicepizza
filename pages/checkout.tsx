import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { CheckoutForm, CheckoutList } from 'components';
import { useRouter } from 'next/router';
import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const CheckoutPage: React.FC = props => {
  const router = useRouter();
  return (
    <Container>
      <Button
        leftIcon={<MdKeyboardArrowLeft />}
        variant="link"
        onClick={() => router.push('/')}
        my={6}
        color="blackAlpha.700"
      >
        Go Back
      </Button>
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Box bg="white" p={[6, 6, 8, 10, 12]} rounded={8} w={{ lg: '70%' }}>
          <CheckoutForm />
        </Box>
        <Box
          bg="white"
          p={[6, 6, 8, 10, 12]}
          rounded={8}
          ml={{ lg: 6, xl: 10 }}
          mt={{ base: 8, lg: 0 }}
          w={{ lg: '30%' }}
        >
          <CheckoutList />
        </Box>
      </Flex>
    </Container>
  );
};

export default CheckoutPage;
