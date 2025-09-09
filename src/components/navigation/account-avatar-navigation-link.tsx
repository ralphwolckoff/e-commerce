import { useAuthStore } from "@/store/authStore";
import { Avatar } from "@/ui/design/avatar/avatar";
import { Typography } from "@/ui/design/typography/Typography";


export const AccountAvatarNavigationLink = () => {
  const { profile } = useAuthStore();
  

  

  return (
    <div className="flex items-center gap-4 pr-5">
      <Avatar
        size="large"
        src={profile?.photoUrl || "/assets/imgs/character-1.png"}
        alt={
          profile?.firstName
            ? `avatar de ${profile?.firstName}`
            : "avatar de l'utilisateur"
        }
      />
      <div className="max-w-[150px] ">
        <Typography variant="caption3" weight="medium" className="truncate">
          {profile?.firstName ? profile?.firstName : "Utilisateur sans nom"}
        </Typography>
        <Typography variant="caption4" weight="medium" theme="gray">
          mon-espace
        </Typography>
      </div>
    </div>
  );
};
