import { useQuery } from "@tanstack/react-query";
import { User } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/users`;

export const useGetUsers = (): {
  usersData: User[];
  isGetUsersLoading: boolean;
  errorGettingUsers: Error | null;
} => {
  const {
    data: usersData,
    isLoading: isGetUsersLoading,
    error: errorGettingUsers,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await fetch(route, {
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
  });

  return {
    usersData: usersData || [],
    isGetUsersLoading,
    errorGettingUsers,
  };
};
