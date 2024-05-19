import { AuthContext } from "../../context/AuthContext";

export const mockAuthContextWithAdmin = {
  userId: "1",
  setUserId: vi.fn(),
  token: "token",
  setToken: vi.fn(),
  isLoggedIn: true,
  setIsLoggedIn: vi.fn(),
  isAdmin: true,
  setIsAdmin: vi.fn(),
};

export const mockAuthContextWithoutAdmin = {
  userId: "1",
  setUserId: vi.fn(),
  token: "token",
  setToken: vi.fn(),
  isLoggedIn: true,
  setIsLoggedIn: vi.fn(),
  isAdmin: false,
  setIsAdmin: vi.fn(),
};

interface AuthContextProps {
  children: React.ReactNode;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MockAuthProvider = ({
  children,
  userId,
  setUserId,
  token,
  setToken,
  isLoggedIn,
  setIsLoggedIn,
  isAdmin,
  setIsAdmin,
}: AuthContextProps) => {
  const authContextValue = {
    userId: userId,
    setUserId: setUserId,
    token: token,
    setToken: setToken,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    isAdmin: isAdmin,
    setIsAdmin: setIsAdmin,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
