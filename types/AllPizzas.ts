/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllPizzas
// ====================================================

export interface AllPizzas_pizzas_image {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
}

export interface AllPizzas_pizzas {
  __typename: "Pizza";
  id: string;
  title: string;
  price: number;
  slug: string | null;
  toppings: string;
  image: AllPizzas_pizzas_image | null;
}

export interface AllPizzas {
  pizzas: (AllPizzas_pizzas | null)[] | null;
}
