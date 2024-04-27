import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { useGetUser } from "../hooks/useGetUser";

interface AuthContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  userId: null,
  setUserId: () => null,
  token: null,
  setToken: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => false,
  isAdmin: false,
  setIsAdmin: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("user_id")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const { userData } = useGetUser(userId);

  useEffect(() => {
    if (userData.role === "admin") {
      setIsAdmin(true);
    }
  }, [userData]);

  const localToken = localStorage.getItem("token");
  const localUserId = localStorage.getItem("user_id");

  useEffect(() => {
    if (localToken && localUserId) {
      setToken(localToken);
      setUserId(localUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const value = useMemo(
    () => ({
      userId,
      setUserId,
      token,
      setToken,
      isLoggedIn,
      setIsLoggedIn,
      isAdmin,
      setIsAdmin,
    }),
    [userId, token, isLoggedIn, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
