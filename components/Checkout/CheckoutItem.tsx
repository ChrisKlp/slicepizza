import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';
import { TCartItem } from 'context/CartContext';
import formatMoney from 'lib/formatMoney';
import Image from 'next/image';
import React from 'react';

type CheckoutItemProps = {
  data: TCartItem;
  order?: boolean;
};

const CheckoutItem: React.FC<CheckoutItemProps> = ({ data, order }) => {
  return (
    <>
      <HStack w="full" align="flex-start">
        <Box flexShrink={0}>
          <Image
            src={data.imageUrl}
            width={order ? '45px' : '96px'}
            height={order ? '45px' : '96px'}
            alt="pizza img"
          />
        </Box>
        <Box pt={order ? 0 : 2} flexGrow={1}>
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
          <Text lineHeight="none" fontSize="xs" color="gray.500">
            {data.toppings}
          </Text>
        </Box>
      </HStack>
      <Divider my={4} />
    </>
  );
};

export default CheckoutItem;
