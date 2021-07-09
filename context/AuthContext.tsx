import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import formatInitialFormValues, {
  TInitialFormValues,
} from 'lib/formatInitialFormValues';
import { UPDATE_USER } from 'lib/mutations';
import { CURRENT_USER, USER_INFO } from 'lib/queries';
import { parseCookies } from 'nookies';
import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CurrentUser } from 'types/CurrentUser';
import { UpdateUser } from 'types/UpdateUser';
import { UserInfo } from 'types/UserInfo';

type TAuthContext = {
  user: CurrentUser | null;
  userInfo: TInitialFormValues | null;
  getUser: () => void;
  logoutUser: () => void;
  loading: boolean;
  updateUser: (id: string, inputs: TInitialFormValues) => void;
  updateUserError: ApolloError | undefined;
  updateUserLoading: boolean;
};

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext) as TAuthContext;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>();
  const [userInfo, setUserInfo] = useState<TInitialFormValues | null>();
  const { jwt } = parseCookies();

  const [getUser, { loading, data }] = useLazyQuery<CurrentUser>(CURRENT_USER, {
    fetchPolicy: 'network-only',
    onError() {
      setUser(null);
    },
    onCompleted() {
      setUser(data);
    },
  });

  const [getUserInfo] = useLazyQuery<UserInfo>(USER_INFO, {
    fetchPolicy: 'network-only',
    onError() {
      setUserInfo(null);
    },
    onCompleted(userInfoData) {
      if (!data?.me?.email) {
        return;
      }
      setUserInfo(
        formatInitialFormValues(data.me.email, userInfoData.user?.personal)
      );
    },
  });

  useEffect(() => {
    if (!jwt) {
      return;
    }
    getUser();
  }, [getUser, jwt]);

  useEffect(() => {
    if (!data?.me?.id) {
      return;
    }
    getUserInfo({
      variables: {
        id: data.me.id,
      },
    });
  }, [data, getUserInfo]);

  const [
    updateUserInfo,
    { error: updateUserError, loading: updateUserLoading },
  ] = useMutation<UpdateUser>(UPDATE_USER, {
    fetchPolicy: 'no-cache',
    onError(err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    },
    onCompleted() {
      getUser();
    },
  });

  const updateUser = useCallback(
    (id: string, inputs: TInitialFormValues) => {
      const { email, name, phone, address, code, city } = inputs;

      updateUserInfo({
        variables: {
          input: {
            where: {
              id,
            },
            data: {
              email,
              username: name?.split(' ')[0],
              personal: {
                name,
                phone,
                address,
                code,
                city,
              },
            },
          },
        },
      });
    },
    [updateUserInfo]
  );

  const logoutUser = () => {
    setUser(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loading,
        getUser,
        logoutUser,
        updateUser,
        updateUserError,
        updateUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
