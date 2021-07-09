import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Cart from 'components/Cart/Cart';
import { useAuth } from 'context/AuthContext';
import { useCart } from 'context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useCart();
  const { user } = useAuth();

  return (
    <Box
      as="header"
      h={[20, null, 24]}
      w="full"
      position="sticky"
      bg="#F6F5F1"
      top={0}
      left={0}
      zIndex="sticky"
    >
      <Container h="full">
        <HStack justify="space-between" align="center" h="full" w="full">
          <Box
            h={['40px', null, '60px']}
            w={['140px', null, '208px']}
            position="relative"
          >
            <Link href="/">
              <a>
                <Image
                  src="/images/slice-pizza-logo.png"
                  alt="Logo Slice Pizza"
                  layout="fill"
                  objectFit="contain"
                />
              </a>
            </Link>
          </Box>
          <HStack align="center" h="full">
            {user?.me ? (
              <Link href="/profile" passHref>
                <Avatar
                  as="a"
                  icon={<FiUser size={18} />}
                  name={user?.me?.email}
                  color="white"
                  size="sm"
                  w={10}
                  h={10}
                  fontSize="12px"
                  bg="yellow.500"
                />
              </Link>
            ) : (
              <Link href="/profile" passHref>
                <Avatar
                  as="a"
                  icon={<FiUser size={18} />}
                  color="blackAlpha.900"
                  size="sm"
                  w={10}
                  h={10}
                  fontSize="12px"
                  bg="white"
                />
              </Link>
            )}

            <Box position="relative">
              <IconButton
                icon={<FiShoppingCart />}
                aria-label="cart button"
                rounded="full"
                colorScheme="red"
                onClick={onOpen}
              />
              {state.items.length > 0 && (
                <Flex
                  position="absolute"
                  w="18px"
                  h="18px"
                  bg="yellow.400"
                  bottom="-5px"
                  right={0}
                  rounded="full"
                  justify="center"
                  align="center"
                  pointerEvents="none"
                >
                  <Text fontSize="xs">{state.items.length}</Text>
                </Flex>
              )}
            </Box>
          </HStack>
        </HStack>
      </Container>
      <Cart isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
