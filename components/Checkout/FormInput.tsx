import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { TInitialFormValues } from 'lib/formatInitialFormValues';
import { TFormInputs } from 'lib/formSchema';
import React from 'react';
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';

type FormInputProps = {
  register: UseFormRegister<TInitialFormValues>;
  errors: DeepMap<TInitialFormValues, FieldError>;
  name: keyof TFormInputs;
  placeholder: string;
  type: string;
  label: string;
} & FormControlProps;

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  label,
  register,
  errors,
  ...props
}) => {
  return (
    <FormControl id={name} isInvalid={!!errors[name]} {...props}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input placeholder={placeholder} {...register(name)} type="type" />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
