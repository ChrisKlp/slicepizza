/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { updateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user {
  __typename: "UsersPermissionsUser";
  id: string;
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
