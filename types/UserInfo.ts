/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserInfo
// ====================================================

export interface UserInfo_user_personal {
  __typename: "ComponentDetailsPersonalInfo";
  name: string | null;
  phone: string | null;
  address: string | null;
  code: string | null;
  city: string | null;
}

export interface UserInfo_user_orders_pizzaOrder_pizza_image {
  __typename: "UploadFile";
  formats: any | null;
}

export interface UserInfo_user_orders_pizzaOrder_pizza {
  __typename: "Pizza";
  id: string;
  title: string;
  toppings: string;
  price: number;
  image: UserInfo_user_orders_pizzaOrder_pizza_image | null;
}

export interface UserInfo_user_orders_pizzaOrder {
  __typename: "ComponentDetailsPizzaOrder";
  id: string;
  quantity: number | null;
  pizza: UserInfo_user_orders_pizzaOrder_pizza | null;
}

export interface UserInfo_user_orders {
  __typename: "Order";
  id: string;
  createdAt: any;
  total: number | null;
  shipping: number | null;
  grandTotal: number | null;
  pizzaOrder: (UserInfo_user_orders_pizzaOrder | null)[] | null;
}

export interface UserInfo_user {
  __typename: "UsersPermissionsUser";
  id: string;
  personal: UserInfo_user_personal | null;
  orders: (UserInfo_user_orders | null)[] | null;
}

export interface UserInfo {
  user: UserInfo_user | null;
}

export interface UserInfoVariables {
  id: string;
}
