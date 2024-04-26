import { useQuery } from "@tanstack/react-query";
import { LeaveRequestServer } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/user/leave-requests/`;

export const useGetLeaveRequestsUser = (
  userId: string | null
): {
  leaveRequestsUser: LeaveRequestServer[];
  isGetLeaveRequestsUserLoading: boolean;
  errorGettingLeaveRequestsUser: Error | null;
  refetchLeaveRequestsUser: () => void;
} => {
  const {
    data: leaveRequestsUser,
    isLoading: isGetLeaveRequestsUserLoading,
    error: errorGettingLeaveRequestsUser,
    refetch: refetchLeaveRequestsUser,
  } = useQuery({
    queryKey: ["leaveRequests", userId],
    queryFn: async () => {
      const response = await fetch(`${route}${userId}`, {
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
    leaveRequestsUser: leaveRequestsUser || [],
    isGetLeaveRequestsUserLoading,
    errorGettingLeaveRequestsUser,
    refetchLeaveRequestsUser,
  };
};
