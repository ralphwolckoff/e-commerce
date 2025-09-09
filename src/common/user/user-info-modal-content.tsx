"use client";

import Image from "next/image";
import { Button } from "@/ui/design/button/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Role } from "../role.enum";
import { useAuth } from "@/context/AuthContext";
import { LogoutIcon2 } from "@/components/icons";

export default function UserInfoModalContent() {
  const { user, profile } = useAuthStore();
  const { logout} = useAuth()
  const router = useRouter();

 

  const handleLogout = async () => {
    try {
      useAuthStore.getState().logout
      logout();

      toast.success("Déconnexion réussie !");
      router.push("/");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion:");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="relative w-24 h-24 rounded-full  overflow-hidden border-2 border-gray-200">
          <Image
            src={profile?.photoUrl || "/images/profile-placeholder.jpg"}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="">
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium mb-1"
          >
            First Name : {profile?.firstName}
          </label>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-medium mb-1"
          >
            Last Name : {profile?.lastName}
          </label>
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email : {user?.email}
          </label>
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-1"
          >
            Phone :{profile?.phoneNumber}
          </label>
        </div>
      </div>

      <div className="md:col-span-2 mt-4 flex justify-end space-x-3">
        <Button
          size="small"
          variant="secondary"
          action={handleLogout}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-300"
        >
          <div className="flex items-center space-x-2">
            <LogoutIcon2 /> <span>Logout</span>
          </div>
        </Button>

        <Button
          size="small"
          baseUrl={
            user?.role === Role.CLIENT
              ? "/client/my-account"
              : "/seller/my-account"
          }
          className="bg-green-700 text-white px-8 py-2 rounded-md font-semibold hover:bg-green-800 transition duration-300 shadow-md"
        >
          Mon Espace
        </Button>
      </div>
    </div>
  );
}
