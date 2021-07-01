import { TCartItem, TState } from 'context/CartContext';
import { TFormInputs } from './formSchema';

export type TFormatOrder = {
  grandTotal: number;
  items: TCartItem[];
  shipping: number;
  total: number;
  client: TFormInputs;
};

export const formatOrder = (
  data: TFormInputs,
  state: TState
): TFormatOrder => ({
  client: data,
  ...state,
  grandTotal: state.total + state.shipping,
});
