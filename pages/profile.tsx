import { useApolloClient } from '@apollo/client';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import ProfileForm from 'components/Profile/ProfileForm';
import ProfileOrders from 'components/Profile/ProfileOrders';
import { useAuth } from 'context/AuthContext';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import nookies, { destroyCookie } from 'nookies';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaRegAddressCard } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { user, logoutUser, userInfo, userOrders } = useAuth();

  const handleLogout = async () => {
    destroyCookie(null, 'jwt');
    client.clearStore();
    await router.push('/');
    logoutUser();
  };

  return (
    <>
      <NextSeo title="Slice Pizza - Profile" />
      <Container>
        <Box bg="white" rounded={8} p={[6, 6, 8, 10, 12]}>
          <Heading letterSpacing={-1} color="red.900" size="lg">
            Profile
          </Heading>
          <Text>Your email: {user?.me?.email}</Text>
          <Accordion allowToggle py={8}>
            <AccordionItem>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left">
                  <Icon as={RiShoppingCartLine} w={6} h={6} mr={6} />
                  Orders
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={8}>
                {userOrders && userOrders?.length > 0 ? (
                  userOrders.map((order, index) => {
                    if (!order) return null;
                    return (
                      <ProfileOrders
                        key={order?.id}
                        data={order}
                        index={index + 1}
                      />
                    );
                  })
                ) : (
                  <Text>No orders</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left">
                  <Icon as={FaRegAddressCard} w={6} h={6} mr={6} />
                  Personal Information
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={8}>
                {userInfo && <ProfileForm defaultValues={userInfo} />}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button onClick={handleLogout} leftIcon={<BiLogOut />}>
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { jwt } = nookies.get(ctx);

  if (!jwt) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
