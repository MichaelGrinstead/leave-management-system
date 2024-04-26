import { useQuery } from "@tanstack/react-query";
import { LeaveRequestServer } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/leave-requests`;

export const useGetLeaveRequestsAll = (): {
  leaveRequestsAll: LeaveRequestServer[];
  isGetLeaveRequestsAllLoading: boolean;
  errorGettingLeaveRequestsAll: Error | null;
  refetchLeaveRequestsAll: () => void;
} => {
  const {
    data: leaveRequestsAll,
    isLoading: isGetLeaveRequestsAllLoading,
    error: errorGettingLeaveRequestsAll,
    refetch: refetchLeaveRequestsAll,
  } = useQuery({
    queryKey: ["leaveRequestsAll"],
    queryFn: async () => {
      const response = await fetch(route, {
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
    leaveRequestsAll: leaveRequestsAll || [],
    isGetLeaveRequestsAllLoading,
    errorGettingLeaveRequestsAll,
    refetchLeaveRequestsAll,
  };
};
