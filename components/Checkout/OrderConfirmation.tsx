import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useCart } from 'context/CartContext';
import formatCartItem from 'lib/formatCartItem';
import formatMoney from 'lib/formatMoney';
import { useRouter } from 'next/router';
import React from 'react';
import { CreateOrder } from 'types/CreateOrder';
import CheckoutItem from './CheckoutItem';

type OrderConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  data: CreateOrder;
};

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const router = useRouter();
  const { cleanCart } = useCart();

  const handleClick = () => {
    onClose();
    cleanCart();
    router.push('/');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader>
          <Heading mb={4} letterSpacing={-1} color="red.900" size="xl">
            THANK YOU FOR YOUR ORDER
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Box mb={6}>
            {data.createOrder?.order?.pizzaOrder &&
              data.createOrder.order.pizzaOrder.map((item) => {
                if (!item?.pizza || !item?.quantity) return null;

                const checkoutItemData = formatCartItem(
                  item.pizza,
                  item.quantity
                );

                return (
                  <CheckoutItem key={item?.id} data={checkoutItemData} order />
                );
              })}
          </Box>
          <HStack justify="space-between" w="full">
            <Heading as="p" fontSize="xl">
              TOTAL
            </Heading>
            <Heading as="p" fontSize="xl">
              {data.createOrder?.order?.grandTotal &&
                formatMoney(data.createOrder.order.grandTotal)}
            </Heading>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button w="full" onClick={handleClick}>
            BACK TO HOME
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderConfirmation;
