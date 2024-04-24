import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/logout`;

export const useLogout = () => {
  const { setToken, setUserId, setIsLoggedIn } = useContext(AuthContext);

  async function logout() {
    console.log("logging out");
    const response = await fetch(route, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      localStorage.removeItem("token");
      setToken(null);
      localStorage.removeItem("user_id");
      setUserId(null);
      setIsLoggedIn(false);
    }
  }

  const {
    mutateAsync: logoutUser,
    isPending: isLogoutUserPending,
    isSuccess: isLogoutUserSuccess,
    error: errorLoggingOutUser,
  } = useMutation({
    mutationFn: logout,
  });

  return {
    logoutUser,
    isLogoutUserPending,
    isLogoutUserSuccess,
    errorLoggingOutUser,
  };
};
