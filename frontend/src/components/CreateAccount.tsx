import { useAddNewUser } from "../hooks/useAddNewUser";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

export default function CreateAccount() {
  const methods = useForm();
  const { register, handleSubmit, getValues } = methods;
  const {
    addNewUser,
    isAddNewUserPending,
    isAddNewUserSuccess,
    errorAddingNewUser,
  } = useAddNewUser();

  console.log({
    isAddNewUserPending,
    isAddNewUserSuccess,
    errorAddingNewUser,
  });

  const handleCreateAccount = () => {
    const { name, email, password } = getValues();
    addNewUser({ name, email, password });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCreateAccount)}>
          <div className="flex flex-col justify-center items-center gap-6 border bg-white w-[450px] h-[450px] mt-40 shadow-custom p-4">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <Input {...register("name")} placeholder="Name" />
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className="w-60 mt-4">
              Create
            </Button>
            <div className="flex flex-col items-center gap-2">
              <h6>Already have an account?</h6>
              <Link className="font-semibold hover:underline" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
