import { useApolloClient } from '@apollo/client';
import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { initializeApollo } from 'lib/apolloClient';
import { CURRENT_USER } from 'lib/queries';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies, { destroyCookie } from 'nookies';
import React from 'react';
import { CurrentUser } from 'types/CurrentUser';

type ProfilePageProps = {};

const ProfilePage: React.FC<ProfilePageProps> = props => {
  const router = useRouter();
  const client = useApolloClient();

  const handleLogout = async () => {
    await client.clearStore();
    destroyCookie(null, 'jwt');
    router.push('/');
  };

  return (
    <Container>
      <Box bg="white" rounded={8} p={[6, 6, 8, 10, 12]}>
        <Heading mb={8} letterSpacing={-1} color="red.900" size="lg">
          Hello
        </Heading>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const jwt = nookies.get(ctx).jwt;

  if (!jwt) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
