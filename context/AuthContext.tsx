import { useLazyQuery } from '@apollo/client';
import { CURRENT_USER } from 'lib/queries';
import { useContext, createContext, useState } from 'react';
import { CurrentUser } from 'types/CurrentUser';

type TAuthContext = {
  user: CurrentUser | null;
  logoutUser: () => void;
  getUser: (token: string) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext) as TAuthContext;
};

type AuthProviderProps = {
  currentUser: CurrentUser | null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  currentUser,
}) => {
  const [user, setUser] = useState<CurrentUser | null>(currentUser);

  const [getUserQuery] = useLazyQuery<CurrentUser>(CURRENT_USER, {
    onError() {
      setUser(null);
    },
    onCompleted(data) {
      setUser(data);
    },
  });

  const logoutUser = () => setUser(null);

  const getUser = (token: string) => {
    getUserQuery({
      context: {
        headers: { authorization: `Bearer ${token}` },
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, logoutUser, getUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
