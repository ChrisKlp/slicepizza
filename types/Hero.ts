/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Hero
// ====================================================

export interface Hero_hero_image {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
}

export interface Hero_hero {
  __typename: "Hero";
  title: string | null;
  description: string | null;
  image: Hero_hero_image | null;
}

export interface Hero {
  hero: Hero_hero | null;
}
