import { useMutation } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/leave-requests/`;

export const useDeleteLeaveRequest = () => {
  async function deleteRequest(id: number) {
    const response = await fetch(`${route}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(await response.json());
  }

  const {
    mutateAsync: deleteLeaveRequest,
    isPending: isDeleteLeaveRequestPending,
    isSuccess: isDeleteLeaveRequestSuccess,
    error: errorDeletingLeaveRequest,
  } = useMutation({
    mutationFn: deleteRequest,
  });

  return {
    deleteLeaveRequest,
    isDeleteLeaveRequestPending,
    isDeleteLeaveRequestSuccess,
    errorDeletingLeaveRequest,
  };
};
