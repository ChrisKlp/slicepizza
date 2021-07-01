/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Hero
// ====================================================

export interface Hero_hero_pizza_image {
  __typename: "UploadFile";
  formats: any | null;
}

export interface Hero_hero_pizza {
  __typename: "Pizza";
  id: string;
  image: Hero_hero_pizza_image | null;
  price: number;
  title: string;
  toppings: string;
}

export interface Hero_hero_image {
  __typename: "UploadFile";
  formats: any | null;
  url: string;
}

export interface Hero_hero {
  __typename: "Hero";
  title: string | null;
  description: string | null;
  pizza: Hero_hero_pizza | null;
  image: Hero_hero_image | null;
}

export interface Hero {
  hero: Hero_hero | null;
}
