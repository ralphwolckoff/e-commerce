import { Button } from "@/ui/design/button/button";
import { RiShoppingCartLine } from "react-icons/ri";
import { Typography } from "@/ui/design/typography/Typography";
import { ActiveLink } from "./active-link";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { AccountAvatarNavigationLink } from "./account-avatar-navigation-link";
import Modal from "@/common/Modal";
import UserInfoModalContent from "@/common/user/user-info-modal-content";
import { ShopIcon } from "../icons";
import { Role } from "@/common/role.enum";
import { useCartStore } from "@/store/cartStore";
import CartSidebarModal from "@/components/CartSidebarModal";

export function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const { items, totalPrice } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenUserInfoModal = () => {
    setIsUserInfoModalOpen(true);
  };

  const handleCloseUserInfoModal = () => {
    setIsUserInfoModalOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/FAQ" },
    { name: "Contact", href: "/contact" },
  ];

  const authenticationSystem = (
    <div className="flex items-center gap-2">
      <Button baseUrl="/connexion" size="small">
        Connexion
      </Button>
      <Button baseUrl="/connexion/inscription" size="small" variant="secondary">
        Rejoindre
      </Button>
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 mx-10">
          <div className=" flex items-center z-10 justify-center rounded-full bg-primary text-white h-10 w-10">
            <RiShoppingCartLine size={26} />
          </div>
          <Typography
            variant="caption2"
            component="h5"
            className="text-primary"
          >
            ONLINE SHOP
          </Typography>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <ActiveLink href={link.href}>{link.name}</ActiveLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex gap-3 lg:flex">
          {!isAuthenticated ? (
            authenticationSystem
          ) : (
            <div className="relative flex">
              <button
                onClick={handleOpenUserInfoModal}
                className="flex items-center cursor-pointer"
              >
                <AccountAvatarNavigationLink />
              </button>
              <div className="absolute right-0 z-20 overflow-hidden">
                <Modal
                  isOpen={isUserInfoModalOpen}
                  onClose={handleCloseUserInfoModal}
                  title="Personal Information"
                  size="xm"
                  className="top-20 right-60"
                >
                  <UserInfoModalContent />
                </Modal>
              </div>
              {user?.role === Role.CLIENT && (
                <button
                  onClick={onOpenModal}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span className="inline-block relative">
                    <ShopIcon />
                    <span className="flex items-center justify-center font-medium text-caption4 absolute -right-2 -top-2.5 bg-primary w-4.5 h-4.5 rounded-full text-white">
                      {items.length || 0}
                    </span>
                  </span>

                  <div>
                    <Typography
                      variant="caption4"
                      component="span"
                      theme="gray"
                    >
                      Cart
                    </Typography>
                    <span className="block text-caption4 text-secondary ">
                      $ {totalPrice || 0}
                    </span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <CartSidebarModal isOpen={isOpen} onClose={onCloseModal} />
    </header>
  );
}
