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

export interface UserInfo_user {
  __typename: "UsersPermissionsUser";
  id: string;
  personal: UserInfo_user_personal | null;
}

export interface UserInfo {
  user: UserInfo_user | null;
}

export interface UserInfoVariables {
  id: string;
}
