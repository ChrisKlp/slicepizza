/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Logo
// ====================================================

export interface Logo_logo_image {
  __typename: "UploadFile";
  url: string;
}

export interface Logo_logo {
  __typename: "Logo";
  title: string | null;
  image: Logo_logo_image | null;
}

export interface Logo {
  logo: Logo_logo | null;
}
