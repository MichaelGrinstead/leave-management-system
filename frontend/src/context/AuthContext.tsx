import { ReactNode, createContext, useState } from "react";

interface AuthContextProps {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  userId: null,
  setUserId: () => null,
  token: null,
  setToken: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
