import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useForm, FormProvider } from "react-hook-form";

export default function Login() {
  const methods = useForm();
  const { register, handleSubmit } = methods;

  const handleSignIn = () => {};
  return (
    <div className="flex flex-col items-center justify-center">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="flex flex-col justify-center items-center gap-6 border bg-white w-[450px] h-[400px] mt-40 shadow-custom p-4">
            <h1 className="text-3xl font-bold"> Log in</h1>
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className="w-60 mt-4">
              Login
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
