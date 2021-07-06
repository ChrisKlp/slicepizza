/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersPermissionsRegisterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_user {
  __typename: "UsersPermissionsMe";
  id: string;
  username: string;
  email: string;
}

export interface Register_register {
  __typename: "UsersPermissionsLoginPayload";
  jwt: string | null;
  user: Register_register_user;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  input: UsersPermissionsRegisterInput;
}
