/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrder
// ====================================================

export interface CreateOrder_createOrder_order_pizzaOrder_pizza_image {
  __typename: "UploadFile";
  formats: any | null;
}

export interface CreateOrder_createOrder_order_pizzaOrder_pizza {
  __typename: "Pizza";
  id: string;
  title: string;
  toppings: string;
  price: number;
  image: CreateOrder_createOrder_order_pizzaOrder_pizza_image | null;
}

export interface CreateOrder_createOrder_order_pizzaOrder {
  __typename: "ComponentDetailsPizzaOrder";
  id: string;
  quantity: number | null;
  pizza: CreateOrder_createOrder_order_pizzaOrder_pizza | null;
}

export interface CreateOrder_createOrder_order {
  __typename: "Order";
  total: number | null;
  shipping: number | null;
  grandTotal: number | null;
  pizzaOrder: (CreateOrder_createOrder_order_pizzaOrder | null)[] | null;
}

export interface CreateOrder_createOrder {
  __typename: "createOrderPayload";
  order: CreateOrder_createOrder_order | null;
}

export interface CreateOrder {
  createOrder: CreateOrder_createOrder | null;
}

export interface CreateOrderVariables {
  input?: createOrderInput | null;
}
