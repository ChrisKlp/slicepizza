import * as yup from 'yup';

export type TFormInputs = {
  name: string;
  email: string;
  phone: number;
  address: string;
  code: string;
  city: string;
};

export const formSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  address: yup.string().required(),
  code: yup.string().required(),
  city: yup.string().required(),
});
