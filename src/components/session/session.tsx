"use client";

import { Role } from "@/common/role.enum";
import { useAuth } from "@/context/AuthContext";
import { GUEST, REGISTERED } from "@/lib/session-status";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type SessionStatusType = "registered" | "guest";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Session = ({ children, sessionStatus }: Props) => {
  const { authUser, authUserIsLoading } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (authUserIsLoading || redirecting) {
      return;
    }

    const currentPath = router.asPath;
    const isClientPage = currentPath.startsWith("/client");
    const isSellerPage = currentPath.startsWith("/seller");
    const isAdminPage = currentPath.startsWith("/admin");
    const isAuthPage =
      currentPath === "/connexion" ||
      currentPath.startsWith("/connexion/inscription") ||
      currentPath.startsWith("/connexion/forget-password");
    const isOnboardingPage = currentPath === "/onboarding";

    if (!authUser) {
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
          router.push("/client/my-account");
          return;
        }
      }

      if (authUser.role === Role.VENDOR) {
        const onboardingIsCompleted = authUser.onboardingIsCompleted;
        console.log({ onboardingIsCompleted });

        if (!onboardingIsCompleted && !isOnboardingPage) {
          setRedirecting(true);
          router.push("/onboarding");
          return;
        }

        if (onboardingIsCompleted && isOnboardingPage) {
          setRedirecting(true);
          router.push("/seller/my-account");
          return;
        }

        if (isClientPage || isAdminPage) {
          setRedirecting(true);
          router.push("/seller/my-account");
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

    if (sessionStatus === GUEST && authUser) {
      setRedirecting(true);
      router.push("/");
      return;
    }

    if (sessionStatus === REGISTERED && !authUser) {
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
