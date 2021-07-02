import { Container, Box, Heading, Button } from '@chakra-ui/react';
import { initializeApollo } from 'lib/apolloClient';
import { CURRENT_USER } from 'lib/queries';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import { destroyCookie } from 'nookies';

type ProfilePageProps = {
  user: any;
};

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const handleLogout = () => {
    destroyCookie(null, 'jwt');
  };
  return (
    <Container>
      <Box bg="white" rounded={8} p={[6, 6, 8, 10, 12]}>
        <Heading mb={8} letterSpacing={-1} color="red.900" size="lg">
          Hello User
        </Heading>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const jwt = parseCookies(ctx).jwt;

  const apolloClient = initializeApollo(undefined, jwt);

  const { data } = await apolloClient.query({ query: CURRENT_USER });

  return {
    props: { user: data.me },
  };
};
