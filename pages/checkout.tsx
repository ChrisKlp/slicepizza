import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutForm, CheckoutList } from 'components';
import { TFormInputs, formSchema } from 'lib/formSchema';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const CheckoutPage: React.FC = props => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInputs>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: TFormInputs) => console.log(data);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box bg="white" p={[6, 6, 8, 10, 12]} rounded={8} w={{ lg: '70%' }}>
            <CheckoutForm register={register} />
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
      </form>
    </Container>
  );
};

export default CheckoutPage;
