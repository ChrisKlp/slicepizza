import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  SimpleGrid,
  Input,
  Box,
  Heading,
} from '@chakra-ui/react';
import React from 'react';

type CheckoutFormProps = {};

const CheckoutForm: React.FC<CheckoutFormProps> = () => {
  return (
    <form>
      <Heading mb={8} letterSpacing={-1} color="red.900">
        Checkout
      </Heading>
      <Box mb={10}>
        <Heading
          as="h5"
          fontSize="xs"
          textTransform="uppercase"
          mb={4}
          color="red.600"
        >
          Billing details
        </Heading>
        <SimpleGrid columns={{ md: 2 }} spacing={5}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input type="text" name="name" placeholder="John Doe" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input type="email" name="email" placeholder="john@mail.com" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">Phone number</FormLabel>
            <Input type="tel" name="phone" placeholder="+1 202-555-0136" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </Box>
      <Box>
        <Heading
          as="h5"
          fontSize="xs"
          textTransform="uppercase"
          mb={4}
          color="red.700"
        >
          SHIPPING INFO
        </Heading>
        <FormControl mb={5}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            type="text"
            name="address"
            placeholder="1137 Williams Avenue"
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <SimpleGrid columns={{ md: 2 }} spacing={5}>
          <FormControl>
            <FormLabel htmlFor="code">Zip Code</FormLabel>
            <Input type="text" name="code" placeholder="10001" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input type="text" name="city" placeholder="New York" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </Box>
    </form>
  );
};

export default CheckoutForm;
