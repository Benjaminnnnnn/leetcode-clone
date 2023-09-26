import { auth } from "@/firebase/firebase";
import { authModalClose, login } from "@/redux/features/auth/authSlice";
import { emailRegex, passwordRegex } from "@/utils/formValidation";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../Form/Button";
import Input from "../Form/Input";

type Props = {};

interface FormState extends FieldValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const SignUp = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormState>({
    mode: "onTouched",
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp: SubmitHandler<FormState> = async (data) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      if (newUser) {
        router.push("/");
        dispatch(authModalClose());
      } else {
        toast.error("User already exists!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          pauseOnFocusLoss: true,
        });
      }
    } catch (error) {
      toast.error(error as string, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        pauseOnFocusLoss: true,
      });
    }
  };

  return (
    <>
      <form
        action="submit"
        className="space-y-6"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <h2 className="mb-4 text-xl font-medium text-gray-900">
          Sign up to LeetCode
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
          placeholder="example@domain.com"
          onSubmitError={{
            value: !!error,
            message: "Email already exists",
          }}
        ></Input>
        <Input
          id={"name"}
          label={"User Name"}
          register={register}
          name={"name"}
          validationErrors={errors}
          rules={{
            required: "Please enter your user name",
          }}
        ></Input>
        <Input
          id={"password"}
          label={"Password"}
          register={register}
          name={"password"}
          validationErrors={errors}
          type="password"
          placeholder="••••••••"
          rules={{
            minLength: {
              value: 8,
              message: "Must contain at least 8 characters.",
            },
            pattern: {
              value: passwordRegex,
              message:
                "Include both uppercase and lower case characters. At least one number and one special character.",
            },
          }}
        ></Input>
        <Input
          id={"confirmPassword"}
          label={"Confirm Password"}
          register={register}
          type="password"
          name={"confirmPassword"}
          validationErrors={errors}
          placeholder="••••••••"
          rules={{
            validate: {
              passwordMatch: (v) =>
                getValues("password") === v || "Password does not match",
            },
          }}
        ></Input>
        <Button
          isValid={isValid && !loading}
          isLoading={loading}
          type="submit"
          text="Sign up an account"
        ></Button>
      </form>
      <div className="mt-4 flex w-full flex-col">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            className="font-medium text-teal-600 hover:underline"
            onClick={() => dispatch(login())}
          >
            Login Instead
          </button>
        </p>
      </div>
    </>
  );
};

export default SignUp;
