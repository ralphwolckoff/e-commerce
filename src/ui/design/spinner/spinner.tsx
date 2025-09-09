import clsx from "clsx";

interface Props {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "white";
  className?: string;
}

export const Spinner = ({ size = "medium", variant = "primary", className }: Props) => {
  let variantStyle: string, sizeStyle: string;

  switch (size) {
    case "small":
      sizeStyle = "w-6 h-6";
      break;
    case "medium":
      sizeStyle = "w-9 h-9";
      break;
    case "large":
      sizeStyle = "w-12 h-12";
      break;
  }
  switch (variant) {
    case "primary":
      variantStyle = "text-primary";
      break;
    case "white":
      variantStyle = "text-white";
      break;
  }

  return (
    <div
      className={clsx(
        sizeStyle,
        variantStyle,
        "animate-spin rounded-full border-4 border-solid border-gray-500 border-t-transparent"
      )}
    ></div>
  );
};
