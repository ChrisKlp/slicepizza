import { useQuery } from '@apollo/client';
import { Avatar, Box, Container, HStack, IconButton } from '@chakra-ui/react';
import { LOGO } from 'lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Logo } from 'types/Logo';

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  const { data } = useQuery<Logo>(LOGO);

  return (
    <Container as="header">
      <HStack
        justify="space-between"
        align="center"
        h={[20, null, 24]}
        w="full"
      >
        <Box
          h={['40px', null, '60px']}
          w={['140px', null, '208px']}
          position="relative"
        >
          <Link href="/">
            {data?.logo?.image?.url && (
              <a>
                <Image
                  src={data.logo.image.url}
                  alt="Logo Slice Pizza"
                  layout="fill"
                  objectFit="contain"
                />
              </a>
            )}
          </Link>
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
          <IconButton
            icon={<FiShoppingCart />}
            aria-label="cart button"
            rounded="full"
            colorScheme="red"
          />
        </HStack>
      </HStack>
    </Container>
  );
};

export default Navigation;
