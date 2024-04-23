import { useMutation } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/users`;

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export const useAddNewUser = () => {
  async function add({ name, email, password }: NewUser) {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(await response.json());
  }

  const {
    mutateAsync: addNewUser,
    isPending: isAddNewUserPending,
    isSuccess: isAddNewUserSuccess,
    error: errorAddingNewUser,
  } = useMutation({
    mutationFn: add,
  });

  console.log("error", errorAddingNewUser);

  return {
    addNewUser,
    isAddNewUserPending,
    isAddNewUserSuccess,
    errorAddingNewUser,
  };
};
