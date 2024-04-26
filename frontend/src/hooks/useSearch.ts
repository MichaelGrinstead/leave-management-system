import { useQuery } from "@tanstack/react-query";
import { LeaveRequestServer } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/leave-requests/search?query=`;

export const useSearch = (
  searchTerm: string | null
): {
  leaveRequests: LeaveRequestServer[];
  isSearchLoading: boolean;
  errorSearching: Error | null;
} => {
  const {
    data: leaveRequests,
    isLoading: isSearchLoading,
    error: errorSearching,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const response = await fetch(`${route}${searchTerm}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    leaveRequests: leaveRequests || [],
    isSearchLoading,
    errorSearching,
  };
};
