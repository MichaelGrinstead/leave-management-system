import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/login`;

interface User {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setToken, setUserId, setIsLoggedIn } = useContext(AuthContext);

  async function login({ email, password }: User) {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const { token, user_id } = await response.json();
    if (token && user_id) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);
      setToken(token);
      setUserId(user_id);
      setIsLoggedIn(true);
    } else {
      throw new Error("No token found in response");
    }
  }

  const {
    mutateAsync: loginUser,
    isPending: isLoginUserPending,
    isSuccess: isLoginUserSuccess,
    error: errorLoggingInNewUser,
  } = useMutation({
    mutationFn: login,
  });

  return {
    loginUser,
    isLoginUserPending,
    isLoginUserSuccess,
    errorLoggingInNewUser,
  };
};
