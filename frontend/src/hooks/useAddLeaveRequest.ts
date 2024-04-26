import { useMutation } from "@tanstack/react-query";
import { LeaveRequestUpdate } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/leave-requests`;

export const useAddLeaveRequest = () => {
  async function add({
    userId,
    type,
    startDate,
    endDate,
    reason,
  }: LeaveRequestUpdate) {
    console.log("user id hook", userId);
    const response = await fetch(route, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: Number(userId),
        type,
        start_date: startDate,
        end_date: endDate,
        reason,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(await response.json());
  }

  const {
    mutateAsync: addLeaveRequest,
    isPending: isAddLeaveRequestPending,
    isSuccess: isAddLeaveRequestSuccess,
    error: errorAddingLeaveRequest,
  } = useMutation({
    mutationFn: add,
  });

  console.log("error", errorAddingLeaveRequest);

  return {
    addLeaveRequest,
    isAddLeaveRequestPending,
    isAddLeaveRequestSuccess,
    errorAddingLeaveRequest,
  };
};
