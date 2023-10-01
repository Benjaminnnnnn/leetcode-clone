import React from "react";
import Spinner from "../Loader/Spinner";

type Props = {
  text: string;
  isValid: boolean;
  isLoading?: boolean;
} & React.ComponentProps<"button">;

const Button = ({ text, type, isValid, isLoading, onClick }: Props) => {
  return (
    <button
      type={type}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-800 active:bg-teal-800 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-50"
      disabled={!isValid}
      onClick={onClick}
    >
      {isLoading && <Spinner></Spinner>}
      {text}
    </button>
  );
};

export default Button;
