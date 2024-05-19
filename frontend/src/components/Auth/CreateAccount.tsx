import { useAddNewUser } from "../../hooks/useAddNewUser";
import { useLogin } from "../../hooks/useLogin";
import { Button } from "../Ui/Button";
import { Input } from "../Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../Ui/LoadingSpinner";
import { useEffect } from "react";
import PasswordInput from "../Ui/PasswordInput";

export default function CreateAccount() {
  const navigate = useNavigate();
  const methods = useForm();
  const { register, handleSubmit, getValues } = methods;
  const { addNewUser, isAddNewUserPending, isAddNewUserSuccess } =
    useAddNewUser();

  const { loginUser, isLoginUserPending, isLoginUserSuccess } = useLogin();

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
        <form
          className="flex flex-col justify-center items-center gap-6 border bg-white w-[450px] h-[450px] mt-40 shadow-custom p-4"
          onSubmit={handleSubmit(handleCreateAccount)}
          role="form"
        >
          <h1 className="text-3xl font-bold text-darkBlue">Create Account</h1>
          <Input {...register("name")} placeholder="Name" />
          <Input {...register("email")} type="email" placeholder="Email" />
          <PasswordInput {...register("password")} placeholder="Password" />
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
        </form>
      </FormProvider>
    </div>
  );
}
