import { useMutation } from '@apollo/client';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import { AuthForm } from 'components';
import { TAuthInputs } from 'lib/formSchema';
import { REGISTER } from 'lib/mutations';
import NextLink from 'next/link';
import React from 'react';

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  const [handleRegister, { called, loading, error }] = useMutation(REGISTER, {
    onCompleted({ register }) {
      console.log(register);
    },
  });

  const onSubmit = (data: TAuthInputs) => {
    handleRegister({
      variables: {
        input: {
          username: data.email,
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <Flex
      sx={{ minHeight: 'calc(100vh - 184px)' }}
      align="center"
      justify="center"
    >
      <Box bg="white" p={[6, 9, 12]} rounded={6} w="full" maxW="xl">
        <Heading mb={6} size="lg">
          Sign up
        </Heading>
        {error && (
          <Alert status="error" rounded={8} mb={5}>
            <AlertIcon />
            <AlertTitle mr={2}>Failed to create an account</AlertTitle>
          </Alert>
        )}
        <AuthForm onSubmit={onSubmit} isLoading={called && loading} signup />
        <Text align="center" fontSize="sm">
          Already have an account?{' '}
          <NextLink href="/login" passHref>
            <Link color="red.500" fontSize="sm">
              Log in
            </Link>
          </NextLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignupPage;
