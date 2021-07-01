import {
  HStack,
  Box,
  Heading,
  IconButton,
  Divider,
  Button,
  VStack,
} from '@chakra-ui/react';
import formatMoney from 'lib/formatMoney';
import React from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { RiCloseLine } from 'react-icons/ri';
import Image from 'next/image';
import { useCart } from 'context/CartContext';
import CheckoutItem from './CheckoutItem';

type CheckoutListProps = {};

const CheckoutList: React.FC<CheckoutListProps> = () => {
  const { state } = useCart();

  return (
    <VStack align="flex-start">
      <Heading fontSize="xl" mb={6}>
        Cart ({state.items.length})
      </Heading>
      <Box w="full">
        {state.items.map(item => (
          <CheckoutItem key={item.id} data={item} />
        ))}
      </Box>
      <VStack w="full">
        <HStack justify="space-between" w="full">
          <Heading as="p" fontSize="lg">
            TOTAL
          </Heading>
          <Heading as="p" fontSize="lg">
            {formatMoney(state.total)}
          </Heading>
        </HStack>
        <Button w="full" disabled={!state.items.length}>
          CHECKOUT
        </Button>
      </VStack>
    </VStack>
  );
};

export default CheckoutList;
