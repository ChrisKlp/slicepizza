import {
  HStack,
  Box,
  Heading,
  IconButton,
  Text,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { TCartItem } from './CartContext';
import formatMoney from 'lib/formatMoney';
import { RiCloseLine } from 'react-icons/ri';
import { BiPlus, BiMinus } from 'react-icons/bi';

type CartItemProps = {
  data: TCartItem;
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  return (
    <>
      <HStack w="full">
        <Image src={data.imageUrl} width="96px" height="96px" />
        <Box flexGrow={1}>
          <HStack align="flex-start" justify="space-between" w="full">
            <Box>
              <Heading as="p" fontSize="md">
                {data.title}
              </Heading>
              <Heading as="p" color="red.500" fontSize="md">
                {formatMoney(data.price)}
              </Heading>
            </Box>
            <IconButton
              w="18px"
              minW="18px"
              icon={<RiCloseLine size={18} />}
              variant="link"
              color="gray.500"
              aria-label="delete item"
            />
          </HStack>
          <HStack mt={2}>
            <IconButton
              icon={<BiMinus size={18} />}
              colorScheme="blackAlpha"
              variant="ghost"
              aria-label="increment item counter"
              rounded={6}
              size="sm"
            />
            <Text>{data.quantity}</Text>
            <IconButton
              icon={<BiPlus size={18} />}
              colorScheme="blackAlpha"
              variant="ghost"
              aria-label="decrement item counter"
              rounded={6}
              size="sm"
            />
          </HStack>
        </Box>
      </HStack>
      <Divider my={4} />
    </>
  );
};

export default CartItem;
