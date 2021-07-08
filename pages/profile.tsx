import { useApolloClient } from '@apollo/client';
import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies, { destroyCookie } from 'nookies';
import React from 'react';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { logoutUser, user } = useAuth();

  const handleLogout = async () => {
    destroyCookie(null, 'jwt');
    client.resetStore();
    await router.push('/');
    logoutUser();
  };

  return (
    <Container>
      <Box bg="white" rounded={8} p={[6, 6, 8, 10, 12]}>
        <Heading mb={8} letterSpacing={-1} color="red.900" size="lg">
          Hello {user?.me?.email}
        </Heading>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { jwt } = nookies.get(ctx);

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
