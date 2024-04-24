import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Ui/Button";
import { Input } from "./Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { LoadingSpinner } from "./Ui/LoadingSpinner";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const methods = useForm();
  const { register, handleSubmit, getValues } = methods;
  const {
    loginUser,
    isLoginUserPending,
    isLoginUserSuccess,
    errorLoggingInNewUser,
  } = useLogin();

  const handleLogin = () => {
    const { email, password } = getValues();
    loginUser({ email, password });
  };

  useEffect(() => {
    if (isLoginUserSuccess) {
      navigate("/");
    }
  }, [isLoginUserSuccess]);
  return (
    <div className="flex flex-col items-center justify-center">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col justify-center items-center gap-6 border bg-white w-[450px] h-[400px] mt-40 shadow-custom p-4">
            <h1 className="text-3xl text-darkBlue font-bold">Login</h1>
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className="w-60 mt-4">
              {isLoginUserPending ? <LoadingSpinner /> : "Login"}
            </Button>
            <div className="flex flex-col items-center gap-2">
              <h6>Don't have an account?</h6>
              <Link
                className="font-semibold hover:underline"
                to="/create-account"
              >
                Create
              </Link>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
