import { useMutation } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/status/`;

export const useUpdateStatus = () => {
  async function add({ status, id }: { status: string; id: number }) {
    const response = await fetch(`${route}${id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(await response.json());
  }

  const {
    mutateAsync: updateStatus,
    isPending: isUpdateStatusPending,
    isSuccess: isUpdateStatusSuccess,
    error: errorUpdatingStatus,
  } = useMutation({
    mutationFn: add,
  });

  console.log("error", errorUpdatingStatus);

  return {
    updateStatus,
    isUpdateStatusPending,
    isUpdateStatusSuccess,
    errorUpdatingStatus,
  };
};
