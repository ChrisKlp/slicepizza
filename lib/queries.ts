import { gql } from '@apollo/client';

export const HERO = gql`
  query Hero {
    hero {
      title
      description
      pizza {
        id
        image {
          formats
        }
        price
        title
        toppings
      }
      image {
        formats
        url
      }
    }
  }
`;

export const FOOTER_BANNER = gql`
  query FooterBanner {
    footerBanner {
      title
      image {
        formats
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
      image {
        formats
        url
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    me {
      id
      email
    }
  }
`;

export const USER_INFO = gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      id
      personal {
        name
        phone
        address
        code
        city
      }
      orders(sort: "createdAt:desc") {
        id
        createdAt
        total
        shipping
        grandTotal
        pizzaOrder {
          ... on ComponentDetailsPizzaOrder {
            id
            quantity
            pizza {
              id
              title
              toppings
              price
              image {
                formats
              }
            }
          }
        }
      }
    }
  }
`;
