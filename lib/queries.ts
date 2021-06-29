import { gql } from '@apollo/client';

export const LOGO = gql`
  query Logo {
    logo {
      title
      image {
        url
      }
    }
  }
`;

export const ALL_PIZZAS = gql`
  query AllPizzas {
    pizzas {
      id
      title
      price
      slug
      toppings
    }
  }
`;
