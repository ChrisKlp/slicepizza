import { Button, Container } from '@chakra-ui/react';
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
      >
        Go Back
      </Button>
    </Container>
  );
};

export default CheckoutPage;
