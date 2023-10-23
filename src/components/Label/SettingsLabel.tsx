import { ChangeEvent, ComponentProps } from "react";

type Props = {
  description: string;
  label: string;
  id: string;
  inputClassName?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentProps<"input">;

const SettingsLabel = ({
  description,
  label,
  id,
  onChange,
  type,
  inputClassName,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="flex flex-col whitespace-nowrap text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-xs">{description}</span>
      </label>
      <input
        id={id}
        type={type}
        onChange={onChange}
        className={inputClassName}
      ></input>
    </div>
  );
};

export default SettingsLabel;
