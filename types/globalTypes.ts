/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ComponentDetailsClientInput {
  name?: string | null;
  email?: string | null;
  address?: string | null;
  code?: string | null;
  city?: string | null;
  phone?: string | null;
}

export interface InputID {
  id: string;
}

export interface OrderInput {
  total?: number | null;
  shipping?: number | null;
  grandTotal?: number | null;
  pizzaOrder?: any[] | null;
  client?: ComponentDetailsClientInput | null;
  user?: string | null;
  published_at?: any | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface UsersPermissionsLoginInput {
  identifier: string;
  password: string;
  provider?: string | null;
}

export interface UsersPermissionsRegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface createOrderInput {
  data?: OrderInput | null;
}

export interface editComponentDetailsPersonalInfoInput {
  id?: string | null;
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  code?: string | null;
  city?: string | null;
}

export interface editUserInput {
  username?: string | null;
  email?: string | null;
  provider?: string | null;
  password?: string | null;
  resetPasswordToken?: string | null;
  confirmationToken?: string | null;
  confirmed?: boolean | null;
  blocked?: boolean | null;
  role?: string | null;
  personal?: editComponentDetailsPersonalInfoInput | null;
  orders?: (string | null)[] | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface updateUserInput {
  where?: InputID | null;
  data?: editUserInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
