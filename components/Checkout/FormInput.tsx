import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormControlProps,
  InputProps,
  FormLabelProps,
  FormErrorMessageProps,
} from '@chakra-ui/react';
import { TFormInputs } from 'lib/formSchema';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type FormProps = FormControlProps &
  FormLabelProps &
  InputProps &
  FormErrorMessageProps;

type FormInputProps = {
  register: UseFormRegister<TFormInputs>;
  name: keyof TFormInputs;
} & FormProps;

const FormInput: React.FC<FormInputProps> = props => {
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input placeholder={props.placeholder} {...props.register(props.name)} />
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
