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
import { LOGIN } from 'lib/mutations';
import NextLink from 'next/link';
import React from 'react';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  const [handleLogin, { called, loading, data, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      console.log(login);
    },
  });

  const onSubmit = (data: TAuthInputs) => {
    handleLogin({
      variables: {
        input: {
          identifier: data.email,
          password: data.password,
          provider: 'local',
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
          Log in
        </Heading>
        {error && (
          <Alert status="error" rounded={8} mb={5}>
            <AlertIcon />
            <AlertTitle mr={2}>Wrong email or password</AlertTitle>
          </Alert>
        )}
        <AuthForm onSubmit={onSubmit} isLoading={called && loading} />
        <Text align="center" fontSize="sm">
          Need an account?{' '}
          <NextLink href="/signup" passHref>
            <Link color="red.500" fontSize="sm">
              Sign up
            </Link>
          </NextLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
