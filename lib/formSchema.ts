import * as yup from 'yup';

export type TFormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  code: string;
  city: string;
};
const requiredMessage = 'Can’t be empty';

export const formSchema = yup.object().shape({
  name: yup.string().required(requiredMessage),
  email: yup.string().email('Input a valid email').required(requiredMessage),
  phone: yup.string().required(requiredMessage),
  address: yup.string().required(requiredMessage),
  code: yup.string().required(requiredMessage),
  city: yup.string().required(requiredMessage),
});

export type TAuthInputs = {
  email: string;
  password: string;
};

export const authSchema = yup.object().shape({
  email: yup.string().email('Input a valid email').required(requiredMessage),
  password: yup
    .string()
    .min(8, 'Use at least 8 characters')
    .required(requiredMessage),
});
