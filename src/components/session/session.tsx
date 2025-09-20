"use client";

import { Role } from "@/common/role.enum";
import { useAuth } from "@/context/AuthContext";
import { GUEST, REGISTERED } from "@/lib/session-status";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type SessionStatusType = "registered" | "guest";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Session = ({ children, sessionStatus }: Props) => {
  const { authUser, authUserIsLoading } = useAuth();
  const {user} = useAuthStore()
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (authUserIsLoading || redirecting) {
      return;
    }

    const currentPath = router.asPath;
    const isClientPage = currentPath.startsWith("/my-account");
    const isSellerPage = currentPath.startsWith("/mon-espace");
    const isAdminPage = currentPath.startsWith("/admin");
    const isAuthPage =
      currentPath === "/connexion" ||
      currentPath.startsWith("/connexion/inscription") ||
      currentPath.startsWith("/connexion/forget-password");
    const isOnboardingPage = currentPath === "/onboarding";

    if (!user) {
      if (isClientPage || isSellerPage || isAdminPage) {
        setRedirecting(true);
        router.push("/connexion");
        return;
      }

      if (sessionStatus === GUEST && !isAuthPage) {
        return;
      }
    }

    if (authUser) {
      if (isAuthPage) {
        setRedirecting(true);
        router.push("/");
        return;
      }

      if (authUser.role === Role.CLIENT) {
        if (isSellerPage || isAdminPage) {
          setRedirecting(true);
          router.push("/my-account");
          return;
        }
      }

      if (authUser.role === Role.VENDOR) {
        const onboardingIsCompleted = authUser.onboardingIsCompleted;

        if (!onboardingIsCompleted && !isOnboardingPage) {
          setRedirecting(true);
          router.push("/onboarding");
          return;
        }

        if (onboardingIsCompleted && isOnboardingPage) {
          setRedirecting(true);
          router.push("/mon-espace");
          return;
        }

        if (isClientPage || isAdminPage) {
          setRedirecting(true);
          router.push("/mon-espace");
          return;
        }
      }

      if (authUser.role === Role.ADMIN) {
        if (isClientPage || isSellerPage) {
          setRedirecting(true);
          router.push("/admin/dashboard");
          return;
        }
      }
    }

    if (sessionStatus === GUEST && user) {
      setRedirecting(true);
      router.push("/");
      return;
    }

    if (sessionStatus === REGISTERED && !user) {
      setRedirecting(true);
      router.push("/connexion");
      return;
    }
  }, [authUser, authUserIsLoading, sessionStatus, router, redirecting]);

  if (authUserIsLoading || redirecting) {
    return null; 
  }

  return <>{children}</>;
};
