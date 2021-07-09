import { useLazyQuery } from '@apollo/client';
import formatInitialFormValues, {
  TInitialFormValues,
} from 'lib/formatInitialFormValues';
import { CURRENT_USER, USER_INFO } from 'lib/queries';
import { parseCookies } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { CurrentUser } from 'types/CurrentUser';
import { UserInfo } from 'types/UserInfo';

type TAuthContext = {
  user: CurrentUser | null;
  userInfo: TInitialFormValues | null;
  getUser: () => void;
  logoutUser: () => void;
  loading: boolean;
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
    onError() {
      setUser(null);
    },
    onCompleted() {
      setUser(data);
    },
  });

  const [getUserInfo] = useLazyQuery<UserInfo>(USER_INFO, {
    onError() {
      setUserInfo(null);
    },
    onCompleted(userInfoData) {
      if (!data?.me?.email) {
        return;
      }
      setUserInfo(formatInitialFormValues(data.me.email, userInfoData));
    },
  });

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
      value={{ user, userInfo, loading, getUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
