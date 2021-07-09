/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { updateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user_personal {
  __typename: "ComponentDetailsPersonalInfo";
  name: string | null;
  phone: string | null;
  address: string | null;
  code: string | null;
  city: string | null;
}

export interface UpdateUser_updateUser_user {
  __typename: "UsersPermissionsUser";
  id: string;
  email: string;
  personal: UpdateUser_updateUser_user_personal | null;
}

export interface UpdateUser_updateUser {
  __typename: "updateUserPayload";
  user: UpdateUser_updateUser_user | null;
}

export interface UpdateUser {
  /**
   * Update an existing user
   */
  updateUser: UpdateUser_updateUser | null;
}

export interface UpdateUserVariables {
  input?: updateUserInput | null;
}
