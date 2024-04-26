import { useQuery } from "@tanstack/react-query";
import { LeaveRequestServer } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/leave-requests/`;

export const useGetLeaveRequest = (
  id: string | undefined | null
): {
  leaveRequest: LeaveRequestServer;
  isGetLeaveRequestLoading: boolean;
  isGetLeaveRequestSuccess: boolean;
  errorGettingLeaveRequest: Error | null;
  refetchLeaveRequest: () => void;
} => {
  const {
    data: leaveRequest,
    isLoading: isGetLeaveRequestLoading,
    isSuccess: isGetLeaveRequestSuccess,
    error: errorGettingLeaveRequest,
    refetch: refetchLeaveRequest,
  } = useQuery({
    queryKey: ["leaveRequest", id],
    queryFn: async () => {
      const response = await fetch(`${route}${id}`, {
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
    leaveRequest: leaveRequest || {},
    isGetLeaveRequestLoading,
    isGetLeaveRequestSuccess,
    errorGettingLeaveRequest,
    refetchLeaveRequest,
  };
};
