import { gql, useQuery } from '@apollo/client';

const LOGIN = gql`
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

export const useAuth = () => {
  const { data } = useQuery(LOGIN, {
    variables: {
      input: {
        identifier: 'klipos@pixwork.pl',
        password: 'asdasdasd',
        provider: 'local',
      },
    },
  });

  if (data) return { data };
};
