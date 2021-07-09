/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_me {
  __typename: "UsersPermissionsMe";
  id: string;
  email: string;
}

export interface CurrentUser {
  me: CurrentUser_me | null;
}
