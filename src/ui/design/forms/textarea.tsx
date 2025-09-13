import clsx from "clsx";
import { Typography } from "../typography/Typography";

interface Props {
  isLoading: boolean;
  placeholder: string;
  row?: number;
  register: any;
  errors: any;
  errorMsg?: string;
  id: string;
  required?: boolean; 
  isAutoCompleted?: boolean;
  label?: string;
}

export const Textarea = ({
  isLoading,
  placeholder,
  row= 5,
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
        <Typography
          variant="caption3"
          component="div"
          theme={errors[id] ? "danger" : "gray"}
        >
          {label}
        </Typography>
      )}
      <textarea
        rows={row}
        placeholder={placeholder}
        className={clsx(
          isLoading
            ? "bg-gray-300 focus:ring-gray-300 cursor-not-allowed"
            : "bg-white/10",
          errors[id]
            ? "placeholder-alert-danger text-alert-danger "
            : "placeholder-gray-600",
          "w-full p-4 font-light border focus:outline-none focus:ring-1 focus:ring-primary border-gray-400 rounded-lg"
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