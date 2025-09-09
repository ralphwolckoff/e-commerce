import clsx from "clsx";
import { Typography } from "../typography/Typography";
import { Role } from "@/common/role.enum";

interface Props {
    children:React.ReactNode;
  isLoading: boolean;
  register: any;
  errors: any;
  errorMsg?: string;
  id: string;
  required?: boolean;
  label?: string;
}

export const Select = ({
children,
  isLoading,
  register,
  errors,
  errorMsg = "Tu dois enregister ce champ",
  id,
  required = true,
  label,
}: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <Typography
          variant="caption3"
          component="div"
          theme={errors[id] ? "danger" : "gray-600"}
        >
          {label}
        </Typography>
      )}
      <select
        className={clsx(
          isLoading && "cursor-not-allowed",
          errors[id]
            ? "placeholder-alert-danger text-alert-danger "
            : "placeholder-gray-600",
          "w-full p-4 font-light border border-gray-400 rounded-[20px] focus:outline-none focus:ring-1 focus:ring-primary "
        )}
        disabled={isLoading}
        {...register(id , {
          required: {
            value: required ,
            message: errorMsg,
          },
        })}
      >{children}</select>
      {errors[id] && (
        <Typography variant="caption4" component="div" theme="danger">
          {errors[id]?.message}
        </Typography>
      )}
    </div>
  );
};
