/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllPizzas
// ====================================================

export interface AllPizzas_pizzas {
  __typename: "Pizza";
  id: string;
  title: string;
  price: number;
  slug: string | null;
  toppings: string;
}

export interface AllPizzas {
  pizzas: (AllPizzas_pizzas | null)[] | null;
}
