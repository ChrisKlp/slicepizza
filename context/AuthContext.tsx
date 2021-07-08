import { useLazyQuery } from '@apollo/client';
import { CURRENT_USER } from 'lib/queries';
import {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from 'react';
import { CurrentUser } from 'types/CurrentUser';
import { parseCookies } from 'nookies';

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

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>();
  const { jwt } = parseCookies();

  const [getUserQuery] = useLazyQuery<CurrentUser>(CURRENT_USER, {
    onError() {
      setUser(null);
    },
    onCompleted(data) {
      setUser(data);
    },
  });

  const logoutUser = () => setUser(null);

  const getUser = useCallback(
    (token: string) => {
      getUserQuery({
        context: {
          headers: { authorization: `Bearer ${token}` },
        },
      });
    },
    [getUserQuery]
  );

  useEffect(() => {
    if (!jwt) {
      return;
    }

    getUser(jwt);
  }, [getUser, jwt]);

  return (
    <AuthContext.Provider
      value={{ user, logoutUser, getUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
