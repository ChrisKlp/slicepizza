import { TCartItem, TState } from 'context/CartContext';
import { TInitialFormValues } from './formatInitialFormValues';

export type TFormatOrder = {
  grandTotal: number;
  items: TCartItem[];
  shipping: number;
  total: number;
  client: TInitialFormValues;
};

export const formatOrder = (
  data: TInitialFormValues,
  state: TState
): TFormatOrder => ({
  client: data,
  ...state,
  grandTotal: state.total + state.shipping,
});
