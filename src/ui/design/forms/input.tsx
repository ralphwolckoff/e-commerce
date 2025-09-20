import clsx from "clsx";
import { Typography } from "../typography/Typography";

interface Props {
  isLoading: boolean;
  className?:string
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "file";
  register: any;
  errors?: any;
  errorMsg?: string;
  id: string;
  required?: boolean;
  defaultValue?:string
  isAutoCompleted?: boolean;
  label?: string
}

export const Input = ({
  isLoading,
  placeholder,
  className,
  defaultValue,
  type = "text",
  register,
  errors,
  errorMsg = "Tu dois enregister ce champ",
  id,
  required = true,
  isAutoCompleted = false,
  label,
}: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <Typography variant="caption3" component="div" theme={errors[id]? "danger": "gray"}>
          {label}
        </Typography>
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx(
          isLoading && "cursor-not-allowed",
          errors[id]
            ? "placeholder-alert-danger text-alert-danger "
            : "placeholder-gray-600",
          "w-full p-4 font-light border border-gray-400 rounded-[20px] focus:outline-none focus:ring-1 focus:ring-primary ",
          className
        )}
        disabled={isLoading}
        {...register(id, {
          required: {
            value: required,
            message: errorMsg,
          },
        })}
        autoComplete={isAutoCompleted ? "on" : "off"}
      />
      {errors[id] && (
        <Typography variant="caption4" component="div" theme="danger">
          {errors[id]?.message}
        </Typography>
      )}
    </div>
  );
};
