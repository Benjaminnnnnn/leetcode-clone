import { authModalClose } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { SyntheticEvent, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";

type Props = {};

const AuthModal = ({}: Props) => {
  const handlePropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.auth.type);

  let formContent;
  if (type === "login") {
    formContent = <Login></Login>;
  } else if (type === "signup") {
    formContent = <SignUp></SignUp>;
  } else {
    formContent = <ResetPassword></ResetPassword>;
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(authModalClose());
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <div
        className="z-100 fixed inset-0 bg-black/50"
        onClick={() => dispatch(authModalClose())}
        role="authentication form"
      >
        <div
          className="absolute left-1/2 top-1/2 flex w-full max-w-[450px] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-lg bg-white px-6 py-6 lg:px-8 lg:py-8"
          onClick={handlePropagation}
        >
          <button
            className="mb-2 self-end"
            onClick={() => dispatch(authModalClose())}
          >
            <AiOutlineClose className="text-2xl text-gray-300"></AiOutlineClose>
          </button>

          {formContent}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
