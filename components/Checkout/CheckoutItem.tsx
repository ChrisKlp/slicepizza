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
import formatMoney from 'lib/formatMoney';
import { RiCloseLine } from 'react-icons/ri';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useCart, TCartItem } from 'context/CartContext';

type CheckoutItemProps = {
  data: TCartItem;
};

const CheckoutItem: React.FC<CheckoutItemProps> = ({ data }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  return (
    <>
      <HStack w="full" align="flex-start">
        <Image src={data.imageUrl} width="96px" height="96px" />
        <Box pt={2} flexGrow={1}>
          <HStack align="flex-start" justify="space-between" w="full">
            <Box>
              <Heading as="p" fontSize="md">
                {data.title}
              </Heading>
              <Heading as="p" color="red.500" fontSize="md">
                {formatMoney(data.price)}
              </Heading>
            </Box>
            <Text lineHeight="none">x{data.quantity}</Text>
          </HStack>
        </Box>
      </HStack>
      <Divider my={4} />
    </>
  );
};

export default CheckoutItem;
