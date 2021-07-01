import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import Cart from 'components/Cart/Cart';
import { useCart } from 'context/CartContext';
import { LOGO } from 'lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Logo } from 'types/Logo';

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state } = useCart();
  const { data } = useQuery<Logo>(LOGO);

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
            {data?.logo?.image?.url && (
              <Link href="/">
                <a>
                  <Image
                    src={data.logo.image.url}
                    alt="Logo Slice Pizza"
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
              </Link>
            )}
          </Box>
          <HStack align="center" h="full">
            <Link href="/profile" passHref>
              <Avatar
                as="a"
                icon={<FiUser size={18} />}
                size="sm"
                w={10}
                h={10}
                fontSize="12px"
                bg="white"
              />
            </Link>
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

export default Navigation;
