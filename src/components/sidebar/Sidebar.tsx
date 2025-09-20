"use client";

import { Role } from "@/common/role.enum";
import { useAuth } from "@/context/AuthContext";
import { useAuthStore } from "@/store/authStore";
import { Typography } from "@/ui/design/typography/Typography";
import clsx from "clsx";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  RiUser3Line,
  RiCoupon5Line,
  RiShoppingBagLine,
  RiDashboardLine,
} from "react-icons/ri";
import { LogoutIcon2, TagsIcon } from "../icons";
import { Avatar } from "@/ui/design/avatar/avatar";
import { FaMoneyBill, FaShoppingBasket } from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { user, profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Mettre à jour l'état actif en fonction du pathname
    if (pathname.includes("/commands")) {
      setActiveTab("commands");
    } else if (pathname.includes("/cart")) {
      setActiveTab("cart");
    } else if (pathname.includes("/product")) {
      setActiveTab("product");
    } else if (pathname.includes("/info-personnel")) {
      setActiveTab("info-personnelle");
    } else if (pathname.includes("/checkout")) {
      setActiveTab("payment-method");
    } else if (pathname.includes("/categories")) {
      setActiveTab("categories");
    } else {
      setActiveTab("dashboard");
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      logout()
      toast.success("Déconnexion réussie !");
      router.back();
    } catch (error) {
      toast.error("Erreur lors de la déconnexion.");
    }
  };

  const navItems = [
    {
      name: "Acceuil",
      tab: "dashboard",
      href:
        user?.role === Role.CLIENT
          ? "/my-account"
          : "/mon-espace",
      icon: <RiDashboardLine />,
    },

    user?.role === Role.CLIENT
      ? {
          name: "Mon Panier",
          tab: "cart",
          href: "/cart",
          icon: <FaShoppingBasket />,
        }
      : {
          name: "Mes Produits",
          tab: "product",
          href: "/mon-espace/product",
          icon: <RiCoupon5Line />,
        },
    user?.role === Role.CLIENT
      ? {
          name: "Paiement",
          tab: "payment-method",
          href: "/checkout",
          icon: <FaMoneyBill />,
        }
      : {
          name: "Categories",
          tab: "categories",
          href: "/mon-espace/categories",
          icon: <TagsIcon />,
        },
    {
      name: "Mes Commandes",
      tab: "commands",
      href:
        user?.role === Role.VENDOR
          ? "/mon-espace/commands"
          : "/my-account/commands",
      icon: <RiShoppingBagLine />,
    },

    {
      name: "Info Personnelle",
      tab: "info-personnelle",
      href:
        user?.role === Role.CLIENT
          ? "/my-account/info-personnelle"
          : "/mon-espace/info-personnel",
      icon: <RiUser3Line />,
    },
    {
      name: "Déconnexion",
      tab: "logout",
      href: "#",
      onclick: handleLogout,
      icon: <LogoutIcon2 />,
    },
  ];

  return (
    <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-md">
      <div className="flex xl:flex-col">
        {/* Section Profil */}
        <div className="hidden lg:flex flex-wrap items-center gap-5 py-6 px-4 sm:px-7.5 xl:px-9 border-r xl:border-r-0 xl:border-b border-gray-300">
          <Avatar
            size="large"
            src={profile?.photoUrl || "/images/users/user-04.jpg"}
            alt="User Avatar"
          />

          <div>
            <Typography
              variant="caption3"
              component="p"
              className="font-medium text-dark mb-0.5"
            >
              {profile?.firstName}
            </Typography>
            <Typography
              variant="caption4"
              component="p"
              className="text-sm text-gray-500"
            >
              {profile?.createdAt && (
                <>
                  Enline depuis le{" "}
                  {format(new Date(profile?.createdAt), "dd MMMM yyyy")}
                </>
              )}
            </Typography>
          </div>
        </div>
        {/* Navigation */}
        <div className="p-4 sm:p-7.5 xl:p-9">
          <nav>
            <ul className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name} className="w-full">
                  <button
                    onClick={() => {
                      if (item.onclick) {
                        item.onclick();
                      } else {
                        setActiveTab(item.tab);
                        router.push(item.href);
                      }
                    }}
                    className={clsx(item.name==="Suivre" && "hidden",item.name==="Moyens" && "hidden" ,
                      "flex items-center w-full rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200",
                      {
                        "bg-primary text-white shadow-md":
                          activeTab === item.tab,
                        "text-gray-700 hover:bg-primary hover:text-white hover:shadow-md":
                          activeTab !== item.tab,
                      }
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
