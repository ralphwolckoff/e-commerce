import {
  EditIcon,
} from "@/components/icons";
import { useAuthStore } from "@/store/authStore";
import { Typography } from "@/ui/design/typography/Typography";

interface ProfileSectionProps {
  onEdit: () => void;
}

export const ProfileSection = ({ onEdit }: ProfileSectionProps) => {
  const { profile } = useAuthStore();
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Profil</h2>
          <button
            onClick={onEdit}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
          >
            <EditIcon className="w-4 h-4" />
            <span className="text-sm">Modifier</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={profile?.photoUrl || "/assets/imgs/character-1.png"}
            alt="Photo de profil"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          <div className="flex-1 text-center md:text-left">
            <Typography variant="h3" component="h3" theme="gray">
              {profile?.firstName}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
