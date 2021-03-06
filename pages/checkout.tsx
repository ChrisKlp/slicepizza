import { useMutation } from '@apollo/client';
import { Box, Button, Container, Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutForm, CheckoutList, OrderConfirmation } from 'components';
import { useAuth } from 'context/AuthContext';
import { useCart } from 'context/CartContext';
import { TInitialFormValues } from 'lib/formatInitialFormValues';
import { formatOrder } from 'lib/formatOrder';
import { formSchema } from 'lib/formSchema';
import { CREATE_ORDER } from 'lib/mutations';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { CreateOrder } from 'types/CreateOrder';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [order, setOrder] = useState<CreateOrder>();

  const { state } = useCart();
  const { userInfo, user } = useAuth();

  const [createOrder, { loading }] = useMutation<CreateOrder>(CREATE_ORDER, {
    fetchPolicy: 'no-cache',
    onCompleted(createOrderData) {
      setOrder(createOrderData);
      onOpen();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInitialFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: userInfo || undefined,
  });

  const onSubmit = (data: TInitialFormValues) => {
    const inputData = formatOrder(data, state, user);

    createOrder({
      variables: {
        input: {
          data: inputData,
        },
      },
    });
  };

  return (
    <>
      <NextSeo title="Slice Pizza - Checkout" />
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
              <CheckoutForm
                register={register}
                errors={errors}
                title="Checkout"
              />
            </Box>
            <Box
              bg="white"
              p={[6, 6, 8, 10, 12]}
              rounded={8}
              ml={{ lg: 6, xl: 10 }}
              mt={{ base: 8, lg: 0 }}
              w={{ lg: '30%' }}
            >
              <CheckoutList loading={loading} />
            </Box>
          </Flex>
        </form>
      </Container>
      {order && (
        <OrderConfirmation isOpen={isOpen} onClose={onClose} data={order} />
      )}
    </>
  );
};

export default CheckoutPage;
