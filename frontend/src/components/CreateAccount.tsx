import { useAddNewUser } from "../hooks/useAddNewUser";
import { useLogin } from "../hooks/useLogin";
import { Button } from "./Ui/Button";
import { Input } from "./Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./Ui/LoadingSpinner";
import { useEffect } from "react";

export default function CreateAccount() {
  const navigate = useNavigate();
  const methods = useForm();
  const { register, handleSubmit, getValues } = methods;
  const {
    addNewUser,
    isAddNewUserPending,
    isAddNewUserSuccess,
    errorAddingNewUser,
  } = useAddNewUser();

  const {
    loginUser,
    isLoginUserPending,
    isLoginUserSuccess,
    errorLoggingInNewUser,
  } = useLogin();

  console.log("add user", {
    isAddNewUserPending,
    isAddNewUserSuccess,
    errorAddingNewUser,
  });

  console.log("login user", {
    isLoginUserPending,
    isLoginUserSuccess,
    errorLoggingInNewUser,
  });

  useEffect(() => {
    if (isAddNewUserSuccess && isLoginUserSuccess) {
      navigate("/");
    }
  }, [isAddNewUserSuccess, isLoginUserSuccess]);

  const handleCreateAccount = () => {
    const { name, email, password } = getValues();
    addNewUser({ name, email, password });
    loginUser({ email, password });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCreateAccount)}>
          <div className="flex flex-col justify-center items-center gap-6 border bg-white w-[450px] h-[450px] mt-40 shadow-custom p-4">
            <h1 className="text-3xl font-bold text-darkBlue">Create Account</h1>
            <Input {...register("name")} placeholder="Name" />
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className="w-60 mt-4">
              {isAddNewUserPending || isLoginUserPending ? (
                <LoadingSpinner />
              ) : (
                "Create"
              )}
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
