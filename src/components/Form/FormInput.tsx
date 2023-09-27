import { puntuationRegex } from "@/utils/formValidation";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

interface LabelProps extends React.ComponentProps<"label"> {}
interface ButtonProps extends React.ComponentProps<"input"> {}

type InputProps<T extends FieldValues> = {
  label: string;
  id: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  validationErrors?: FieldErrors<T>;
  rules?: RegisterOptions;
  onSubmitSuccess?: {
    value: boolean;
    message: string;
  };
  onSubmitError?: {
    value: boolean;
    message?: string;
  };
} & LabelProps &
  Omit<ButtonProps, "name">;

const Input = <T extends FieldValues>({
  type,
  id,
  placeholder,
  register,
  label,
  name,
  validationErrors,
  rules,
  onSubmitSuccess,
  onSubmitError,
}: InputProps<T>) => {
  const error = validationErrors?.[name] || "";

  const inputStyles =
    error || onSubmitError?.value
      ? "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
      : `${
          onSubmitSuccess?.value
            ? "bg-green-50 border-green-500 text-green-900"
            : "border-gray-300 bg-gray-50"
        } focus:border-blue-500 focus:ring-blue-500`;

  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-2 block text-sm font-medium ${
          error || (onSubmitError?.value && "text-red-700")
        } ${onSubmitSuccess?.value && "text-green-700"}`}
      >
        {label}
      </label>
      <input
        {...register(name, rules)}
        type={type}
        id={id}
        name={id}
        className={`block w-full rounded-lg border p-2.5 text-sm ${inputStyles}`}
        placeholder={placeholder}
        aria-invalid={!!error}
      />

      {onSubmitSuccess?.value && (
        <p className="mt-2 text-sm text-green-600">{onSubmitSuccess.message}</p>
      )}

      {onSubmitError?.value && onSubmitError.message && (
        <p className="mt-2 text-sm text-red-600">{onSubmitError.message}</p>
      )}

      {!!error && (
        <>
          {error.message
            ?.toString()
            .split(puntuationRegex)
            .filter((message) => message.length)
            .map((message) => (
              <div
                className="mt-2 flex items-start text-sm text-red-600"
                key={message}
              >
                <p className="inline-flex w-full items-center gap-1">
                  <AiOutlineClose className="text-lg"></AiOutlineClose>{" "}
                  <span className="truncate" role="alert">
                    {message}
                  </span>
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Input;
