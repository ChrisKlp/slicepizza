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
import { useAuth } from 'context/AuthContext';
import { TAuthInputs } from 'lib/formSchema';
import { REGISTER } from 'lib/mutations';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import nookies, { setCookie } from 'nookies';
import React from 'react';
import { Register } from 'types/Register';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { getUser, loading: authLoading } = useAuth();

  const [handleRegister, { called, loading, error }] = useMutation<Register>(
    REGISTER,
    {
      onCompleted({ register }) {
        if (register.jwt) {
          setCookie(null, 'jwt', register.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
          getUser();
        }
        router.push('/');
      },
    }
  );

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
    <>
      <NextSeo title="Slice Pizza - Signup" />
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
          <AuthForm
            onSubmit={onSubmit}
            isLoading={(called && loading) || authLoading}
            signup
          />
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
    </>
  );
};

export default SignupPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { jwt } = nookies.get(ctx);

  if (jwt) {
    return {
      redirect: {
        destination: '/profile',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
