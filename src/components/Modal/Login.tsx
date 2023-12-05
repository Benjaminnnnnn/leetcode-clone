import {
  authModalClose,
  forgotPassword,
  signup,
} from "@/redux/features/auth/authSlice";
import { emailRegex } from "@/utils/formValidation";
import { SubmitHandler, useForm } from "react-hook-form";

import { auth } from "@/firebase/firebase";
import { useAppDispatch } from "@/redux/hooks";
import { toastConfig } from "@/utils/react-toastify/toast";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Button from "../Form/FormButton";
import Input from "../Form/FormInput";

type Props = {};
type FormState = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormState>({
    mode: "onBlur",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin: SubmitHandler<FormState> = async (data) => {
    try {
      const loggedUser = await signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      if (loggedUser) {
        // toast.success("Logged in successfully. Redirecting...", toastConfig);
        // router.push("/");
        dispatch(authModalClose());
      } else {
        toast.error("Unable to log in.", toastConfig);
      }
    } catch (error) {
      toast.error(error as string, toastConfig);
    }
  };

  return (
    <>
      <form
        action="submit"
        className="space-y-6"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h2 className="mb-4 text-xl font-medium text-gray-900">
          Sign in to LeetCode
        </h2>
        <Input
          id={"email"}
          label={"Your Email"}
          register={register}
          name={"email"}
          validationErrors={errors}
          rules={{
            required: "Please enter an email",
            pattern: {
              value: emailRegex,
              message: "Please enter a valid email",
            },
          }}
          onSubmitError={{
            value: !!error,
          }}
          placeholder="example@domain.com"
        ></Input>

        <Input
          id={"password"}
          label={"Password"}
          register={register}
          name={"password"}
          type="password"
          validationErrors={errors}
          placeholder="••••••••"
          onSubmitError={{
            value: !!error,
            message: "Either incorrect email or password",
          }}
        ></Input>
        <div className="flex justify-between">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-600"
            >
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="text-sm text-gray-600 hover:underline"
            onClick={() => dispatch(forgotPassword())}
          >
            Forgot password?
          </button>
        </div>

        <Button
          isValid={isValid && !loading}
          isLoading={loading}
          type="submit"
          text="Login to your account"
        ></Button>
      </form>

      <div className="mt-4 flex w-full flex-col">
        <p className="text-sm font-light text-gray-500">
          Don&apos;t have an account yet?{" "}
          <button
            className="font-medium text-teal-600 hover:underline"
            onClick={() => dispatch(signup())}
          >
            Create an Account
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;
