import clsx from "clsx";
import Image from "next/image";
import { Spinner } from "../spinner/spinner";

interface Props {
  size?: "small" | "medium" | "large" | "extra-large";
  src: string;
  alt: string;
  isLoading?: boolean;
}

export const Avatar = ({ size = "medium", src, alt, isLoading }: Props) => {
  let sizeAvatar: string;
  switch (size) {
    case "small":
      sizeAvatar = "w-[24px] h-[24px]";
      break;
    case "medium":
      sizeAvatar = "w-[34px] h-[34px]";
      break;
    case "large":
      sizeAvatar = "w-[50px] h-[50px]";
      break;
    case "extra-large":
      sizeAvatar = "w-[130px] h-[130px]";
      break;
  }
  return (
    <div
      className={clsx(
        sizeAvatar,
        isLoading && "flex items-center justify-center",
        "relative bg-gray-300 rounded-full  overflow-hidden"
      )}
    >
      <div
        className={clsx(
          isLoading ? "opacity-40" : "opacity-0",
          "absolute z-10 w-full h-full bg-white animate"
        )}
      />
      <Image
        fill
        src={src ? src : "/assets/imgs/media.png"}
        alt={alt}
        className={clsx(
          isLoading && "blur-[2px]",
          "object-cover object-center rounded-full"
        )}
      />
      {isLoading && <Spinner className="relative z-20" />}
    </div>
  );
};
