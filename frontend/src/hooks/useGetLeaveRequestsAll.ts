import { useQuery } from "@tanstack/react-query";
import { LeaveRequestServer } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/leave-requests`;

export const useGetLeaveRequestsAll = (): {
  leaveRequests: LeaveRequestServer[];
  isGetLeaveRequestsLoading: boolean;
  errorGettingLeaveRequests: Error | null;
  refetchLeaveRequests: () => void;
} => {
  const {
    data: leaveRequests,
    isLoading: isGetLeaveRequestsLoading,
    error: errorGettingLeaveRequests,
    refetch: refetchLeaveRequests,
  } = useQuery({
    queryKey: ["leaveRequests"],
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
    leaveRequests: leaveRequests || [],
    isGetLeaveRequestsLoading,
    errorGettingLeaveRequests,
    refetchLeaveRequests,
  };
};
