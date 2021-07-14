import { TState } from 'context/CartContext';
import { CurrentUser } from 'types/CurrentUser';
import { TInitialFormValues } from './formatInitialFormValues';

export type TPizzaOrder = {
  __typename: string;
  __component: string;
  quantity: number;
  pizza: string;
}[];

export type TFormatOrder = {
  pizzaOrder: TPizzaOrder;
  shipping: number;
  total: number;
  grandTotal: number;
  client?: TInitialFormValues;
  user?: string;
};

export const formatOrder = (
  data: TInitialFormValues,
  state: TState,
  user?: CurrentUser | null
): TFormatOrder => {
  const pizzaOrder = state.items.map((item) => ({
    __typename: 'ComponentDetailsPizzaOrder',
    __component: 'details.pizza-order',
    quantity: item.quantity,
    pizza: item.id,
  }));

  const grandTotal = state.total + state.shipping;

  if (user?.me?.id) {
    return {
      total: state.total,
      shipping: state.shipping,
      grandTotal,
      user: user.me.id,
      pizzaOrder,
    };
  }

  return {
    total: state.total,
    shipping: state.shipping,
    grandTotal,
    client: data,
    pizzaOrder,
  };
};
