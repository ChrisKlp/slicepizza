import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import formatMoney from 'lib/formatMoney';
import React from 'react';
import { useCart } from './CartContext';
import CartItem from './CartItem';

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state } = useCart();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton mt={1} />
          <Heading fontSize="xl">Cart ({state.items.length})</Heading>
        </DrawerHeader>

        <DrawerBody>
          {state.items.map(item => (
            <CartItem key={item.id} data={item} />
          ))}
        </DrawerBody>

        <DrawerFooter>
          <VStack w="full">
            <HStack justify="space-between" w="full">
              <Heading as="p" fontSize="xl">
                TOTAL
              </Heading>
              <Heading as="p" fontSize="xl">
                {formatMoney(state.total)}
              </Heading>
            </HStack>
            <Button w="full">CHECKOUT</Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
