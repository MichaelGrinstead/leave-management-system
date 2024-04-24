import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/users/`;

export const useGetUser = (
  id: number | null
): {
  userData: User;
  isGetUserLoading: boolean;
  errorGettingUser: Error | null;
} => {
  const {
    data: userData,
    isLoading: isGetUserLoading,
    error: errorGettingUser,
  } = useQuery({
    queryKey: ["userData", id],
    queryFn: async () => {
      const response = await fetch(`${route}${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    },
    enabled: !!id,
  });

  return useMemo(() => {
    return {
      userData: {
        id: userData?.id || "",
        email: userData?.email || "",
        name: userData?.name || "",
        role: userData?.role || "",
      },
      isGetUserLoading,
      errorGettingUser,
    };
  }, [userData]);
};
