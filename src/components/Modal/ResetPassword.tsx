import { auth } from "@/firebase/firebase";
import { emailRegex } from "@/utils/formValidation";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../Form/Button";
import Input from "../Form/Input";

type Props = {};

type FormState = {
  email: string;
};

const ResetPassword = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormState>({
    mode: "onBlur",
  });

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleReset: SubmitHandler<FormState> = async (data) => {
    try {
      const success = await sendPasswordResetEmail(data.email);
      if (success) {
        toast.success("Reset password email sent!", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          pauseOnFocusLoss: true,
        });
      }
    } catch (error) {
      toast.error("Failed to send reset password email.", {
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
        action=""
        className="space-y-4"
        onSubmit={handleSubmit(handleReset)}
      >
        <h2 className="mb-4 text-xl font-medium text-gray-900">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500">
          Enter your email below, and we'll send you a reset password email
          shortly.
        </p>
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
        ></Input>
        <Button
          isValid={isValid && !sending}
          isLoading={sending}
          type="submit"
          text="Reset Password"
        ></Button>
      </form>
    </>
  );
};

export default ResetPassword;
