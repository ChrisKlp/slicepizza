import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema, TAuthInputs } from 'lib/formSchema';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye } from 'react-icons/ai';

type AuthFormProps = {
  onSubmit: (data: TAuthInputs) => void;
  isLoading: boolean;
  signup?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLoading, signup }) => {
  const [show, setShow] = useBoolean(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthInputs>({
    resolver: yupResolver(authSchema),
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} w="full" noValidate>
      <FormControl id="email" mb={6} isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          placeholder="mail@example.com"
          type="email"
          variant="filled"
          {...register('email')}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" mb={6} isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password:</FormLabel>
        <InputGroup>
          <Input
            placeholder="*********"
            type={show ? 'text' : 'password'}
            variant="filled"
            {...register('password')}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              size="sm"
              onClick={setShow.toggle}
              colorScheme="blackAlpha"
              variant="link"
              icon={<AiFillEye size={18} />}
              aria-label="show password"
              _focus={{ boxShadow: 'none' }}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        mb={6}
        w="full"
        isLoading={isLoading}
        loadingText="Submitting"
      >
        {signup ? 'Sign Up' : 'Log in'}
      </Button>
    </Box>
  );
};

export default AuthForm;
