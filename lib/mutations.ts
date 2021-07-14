import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: updateUserInput) {
    updateUser(input: $input) {
      user {
        id
        email
        personal {
          name
          phone
          address
          code
          city
        }
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: createOrderInput) {
    createOrder(input: $input) {
      order {
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
