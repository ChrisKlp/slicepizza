import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema, TAuthInputs } from 'lib/formSchema';
import NextLink from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  const [show, setShow] = useBoolean(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthInputs>({
    resolver: yupResolver(authSchema),
  });

  const onSubmit = (data: TAuthInputs) => {
    console.log(data);
  };

  return (
    <Flex
      sx={{ minHeight: 'calc(100vh - 184px)' }}
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        bg="white"
        p={[6, 9, 12]}
        rounded={6}
        w="full"
        maxW="xl"
        noValidate
      >
        <Heading mb={6} size="lg">
          Sign up
        </Heading>
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
              <Button
                size="sm"
                onClick={setShow.toggle}
                colorScheme="blackAlpha"
                variant="ghost"
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" mb={6}>
          Sign up
        </Button>
        <Text align="center" fontSize="sm">
          Already have an account?{' '}
          <NextLink href="/login" passHref>
            <Link color="red.500" fontSize="sm">
              Log in
            </Link>
          </NextLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
