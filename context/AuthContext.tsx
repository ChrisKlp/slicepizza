import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import formatInitialFormValues, {
  TInitialFormValues,
} from 'lib/formatInitialFormValues';
import { UPDATE_USER } from 'lib/mutations';
import { CURRENT_USER, USER_INFO } from 'lib/queries';
import toasts from 'lib/toasts';
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
import { UserInfo, UserInfo_user_orders } from 'types/UserInfo';

type TAuthContext = {
  user: CurrentUser | null;
  userInfo: TInitialFormValues | null;
  userOrders: (UserInfo_user_orders | null)[] | null;
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
  const [userOrders, setUserOrders] = useState<
    (UserInfo_user_orders | null)[] | null
  >();
  const { jwt } = parseCookies();
  const toast = useToast();

  const [getUserQuery, { loading, data }] = useLazyQuery<CurrentUser>(
    CURRENT_USER,
    {
      fetchPolicy: 'network-only',
      onError() {
        setUser(null);
      },
      onCompleted() {
        setUser(data);
      },
    }
  );

  const getUser = useCallback(() => {
    if (!jwt) return;
    getUserQuery();
  }, [getUserQuery, jwt]);

  const [getUserInfo] = useLazyQuery<UserInfo>(USER_INFO, {
    fetchPolicy: 'network-only',
    onError() {
      setUserInfo(null);
      setUserOrders(null);
    },
    onCompleted(userInfoData) {
      if (!data?.me?.email) {
        return;
      }
      setUserInfo(
        formatInitialFormValues(data.me.email, userInfoData.user?.personal)
      );
      setUserOrders(userInfoData.user?.orders);
    },
  });

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
      toast(toasts.userInfoUpdated);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        userOrders,
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
