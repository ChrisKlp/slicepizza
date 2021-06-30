/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FooterBanner
// ====================================================

export interface FooterBanner_footerBanner_image {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
}

export interface FooterBanner_footerBanner {
  __typename: "FooterBanner";
  title: string | null;
  image: FooterBanner_footerBanner_image | null;
}

export interface FooterBanner {
  footerBanner: FooterBanner_footerBanner | null;
}
