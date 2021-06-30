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
