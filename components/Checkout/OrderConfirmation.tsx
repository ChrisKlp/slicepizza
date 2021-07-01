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
import formatMoney from 'lib/formatMoney';
import { TFormatOrder } from 'lib/formatOrder';
import { useRouter } from 'next/router';
import React from 'react';
import CheckoutItem from './CheckoutItem';

type OrderConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  data: TFormatOrder;
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
            {data.items.map(item => (
              <CheckoutItem key={item.id} data={item} order />
            ))}
          </Box>
          <HStack justify="space-between" w="full">
            <Heading as="p" fontSize="xl">
              TOTAL
            </Heading>
            <Heading as="p" fontSize="xl">
              {formatMoney(data.grandTotal)}
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
