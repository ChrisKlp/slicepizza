import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useCart } from 'context/CartContext';
import formatMoney from 'lib/formatMoney';
import React from 'react';
import CheckoutItem from './CheckoutItem';

const CheckoutList: React.FC = () => {
  const { state } = useCart();

  return (
    <VStack align="flex-start" h="full">
      <Heading fontSize="xl" mb={6}>
        Cart ({state.items.length})
      </Heading>
      <Box w="full" flexGrow={1}>
        {state.items.map((item) => (
          <CheckoutItem key={item.id} data={item} />
        ))}
      </Box>
      <VStack w="full" spacing={1}>
        <HStack justify="space-between" w="full">
          <Text>TOTAL</Text>
          <Text>{formatMoney(state.total)}</Text>
        </HStack>
        <HStack justify="space-between" w="full" pb={2}>
          <Text>SHIPPING</Text>
          <Text>{formatMoney(state.shipping)}</Text>
        </HStack>
        <HStack justify="space-between" w="full" pb={2}>
          <Text fontWeight="bold">GRAND TOTAL</Text>
          <Text fontWeight="bold">
            {formatMoney(state.total + state.shipping)}
          </Text>
        </HStack>
        <Button type="submit" w="full" disabled={!state.items.length}>
          CONTINUE & PAY
        </Button>
      </VStack>
    </VStack>
  );
};

export default CheckoutList;
