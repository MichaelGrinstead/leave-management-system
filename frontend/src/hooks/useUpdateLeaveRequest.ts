import { useMutation } from "@tanstack/react-query";
import { LeaveRequestUpdate } from "../types";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/leave-requests/`;

interface updateLeaveRequestProps {
  leaveRequestUpdate: LeaveRequestUpdate;
  id: string | undefined;
}

export const useUpdateLeaveRequest = () => {
  console.log("hook updating");
  async function update({ leaveRequestUpdate, id }: updateLeaveRequestProps) {
    const response = await fetch(`${route}${id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...leaveRequestUpdate,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(await response.json());
  }

  const {
    mutateAsync: updateLeaveRequest,
    isPending: isUpdateLeaveRequestPending,
    isSuccess: isUpdateLeaveRequestSuccess,
    error: errorUpdatingLeaveRequest,
  } = useMutation({
    mutationFn: update,
  });

  return {
    updateLeaveRequest,
    isUpdateLeaveRequestPending,
    isUpdateLeaveRequestSuccess,
    errorUpdatingLeaveRequest,
  };
};
