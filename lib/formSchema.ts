import * as yup from 'yup';

export type TFormInputs = {
  name: string;
  email: string;
  phone: number;
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
