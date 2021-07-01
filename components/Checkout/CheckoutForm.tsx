import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { TFormInputs } from 'lib/formSchema';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import FormInput from './FormInput';

type CheckoutFormProps = {
  register: UseFormRegister<TFormInputs>;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ register }) => {
  return (
    <>
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
          <FormInput
            label="Name"
            placeholder="John Doe"
            type="text"
            name="name"
            register={register}
          />
          <FormInput
            label="Email address"
            placeholder="john@mail.com"
            type="email"
            name="email"
            register={register}
          />
          <FormInput
            label="Phone number"
            placeholder="+1 202-555-0136"
            type="tel"
            name="phone"
            register={register}
          />
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
        <FormInput
          label="Address"
          placeholder="1137 Williams Avenue"
          type="text"
          name="address"
          mb={5}
          register={register}
        />
        <SimpleGrid columns={{ md: 2 }} spacing={5}>
          <FormInput
            label="Zip Code"
            placeholder="10001"
            type="text"
            name="code"
            register={register}
          />
          <FormInput
            label="City"
            placeholder="Bialystok"
            type="text"
            name="city"
            register={register}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default CheckoutForm;
