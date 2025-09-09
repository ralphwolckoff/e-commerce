"use client"; 

import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";

interface ProfileImageDisplayProps {
  imageUrl?: string | null; 
  altText?: string;
  onEditClick?: () => void; 
  size?: "sm" | "md" | "lg" | "xl";
}

export default function ProfileImageDisplay({
  imageUrl,
  altText = "User Profile",
  onEditClick,
  size = "md",
}: ProfileImageDisplayProps) {
  const imageSrc = imageUrl || "/assets/imgs/character-3.png"; 

  const sizeClasses = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-base", 
    lg: "w-32 h-32 text-lg",
    xl: "w-48 h-48 text-xl",
  };

  const currentSizeClass = sizeClasses[size];

  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0 ${currentSizeClass}`}
    >
      <Image
        src={imageSrc}
        alt={altText}
        layout="fill"
        objectFit="cover"
        className="rounded-full" 
        // onError={(e) => {
        //   e.currentTarget.src = "/images/profile-placeholder.jpg";
        //   e.currentTarget.srcset = "/images/profile-placeholder.jpg"; 
        // }}
      />
      {onEditClick && (
        <button
          onClick={onEditClick}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200"
          aria-label="Edit Profile Picture"
          title="Change Profile Picture"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
