import { useQuery } from '@apollo/client';
import { CurrentUser } from 'types/CurrentUser';
import { CURRENT_USER } from './queries';

const useUser = () => {
  const { data: user } = useQuery<CurrentUser>(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  return { user };
};

export default useUser;
