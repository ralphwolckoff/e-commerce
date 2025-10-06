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
import { IoClose, IoMenu } from "react-icons/io5"; // Icônes pour le menu mobile

export function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const { items, totalPrice } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  // NOUVEAU : État pour le menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // NOUVEAU : Fonction pour basculer le menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    <header className="bg-white shadow-md sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-1">
          <div className="flex items-center z-10 justify-center rounded-full bg-primary text-white h-10 w-10">
            <RiShoppingCartLine size={26} />
          </div>
          <Typography
            variant="caption2"
            component="h5"
            className="text-primary font-bold tracking-wider"
          >
            ONLINE SHOP
          </Typography>
        </div>

        {/* -------------------- DESKTOP NAVIGATION -------------------- */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <ActiveLink href={link.href}>{link.name}</ActiveLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* -------------------- ACTION BUTTONS & MOBILE TOGGLE -------------------- */}
        <div className="flex items-center gap-3">
          {/* Desktop/Tablet Action Buttons */}
          <div className="hidden md:flex gap-3 lg:flex items-center">
            {!isAuthenticated ? (
              authenticationSystem
            ) : (
              <div className="relative flex items-center gap-3">
                <button
                  onClick={handleOpenUserInfoModal}
                  className="flex items-center cursor-pointer"
                >
                  <AccountAvatarNavigationLink />
                </button>
                {/* Modal for User Info (positioning fixed for now) */}
                <div className="absolute right-0 top-12 z-20 hidden">
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
                      <span className="flex items-center justify-center font-medium text-xs absolute -right-2 -top-2.5 bg-primary w-5 h-5 rounded-full text-white">
                        {items.length || 0}
                      </span>
                    </span>

                    <div className="hidden lg:block">
                      {" "}
                      {/* Hide text on smaller screen widths */}
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors duration-200"
          >
            {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* -------------------- MOBILE FLYOUT MENU -------------------- */}
      <div
        className={`md:hidden absolute top-full right-0 bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen max-w-xl border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <ActiveLink
              key={link.name}
              href={link.href}
              className="block py-2 text-base hover:bg-gray-50 rounded-lg"
              onClick={toggleMobileMenu} // Fermer après la sélection
            >
              {link.name}
            </ActiveLink>
          ))}

          {/* Mobile Auth/Account Section */}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            {!isAuthenticated ? (
              authenticationSystem
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <AccountAvatarNavigationLink />
                  <Typography
                    component="span"
                    variant="caption1"
                    className="font-semibold"
                  >
                    {user?.email}
                  </Typography>
                </div>
                {user?.role === Role.CLIENT && (
                  <Button
                    action={() => {
                      onOpenModal();
                      toggleMobileMenu();
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    <RiShoppingCartLine className="mr-2" size={18} /> Voir mon
                    Panier ({items.length})
                  </Button>
                )}
                <Button
                  action={handleOpenUserInfoModal}
                  variant="primary"
                  className="w-full"
                >
                  Mon Compte
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <CartSidebarModal isOpen={isOpen} onClose={onCloseModal} />

      {/* User Info Modal positioned correctly for desktop */}
      <Modal
        isOpen={isUserInfoModalOpen}
        onClose={handleCloseUserInfoModal}
        title="Personal Information"
        size="xm"
        // Utilisation de classes responsives pour le centrer ou le positionner
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full p-4"
      >
        <UserInfoModalContent />
      </Modal>
    </header>
  );
}
