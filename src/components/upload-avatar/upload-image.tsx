import { Avatar } from "@/ui/design/avatar/avatar";
import clsx from "clsx";
import { RiCamera2Fill } from "react-icons/ri";

interface Props {
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgPreview: string | ArrayBuffer | null;
  isLoading: boolean;
}

export const UploadImage = ({ handleImageSelect, imgPreview, isLoading }: Props) => {
  return (
    <div className="flex items-center gap-5">
      <label
        className={clsx(
            isLoading? "cursor-not-allowed": "cursor-pointer",
          "inline-block bg-primary hover:bg-primary-400 text-white rounded px-[18px] py-[15px] text-caption2 font-medium  animate"
        )}
      >
        <div className="flex items-center gap-2">
          <RiCamera2Fill />
          <span>Ajouter un fichier</span>
        </div>
        <input type="file" className="hidden" onChange={handleImageSelect} />
      </label>
      <Avatar
        size="extra-large"
        isLoading={isLoading}
        src={
          imgPreview
            ? typeof imgPreview === "string"
              ? imgPreview
              : String(imgPreview)
            : "/assets/svg/Camera.svg"
        }
        alt="avatar"
      />
    </div>
  );
};
