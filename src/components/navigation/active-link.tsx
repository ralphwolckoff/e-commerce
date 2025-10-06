import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface Props {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const ActiveLink = ({ href, children, className, onClick }: Props) => {
  const router = useRouter();

  const isActive = useMemo(() => {
    return router.pathname === href;
  }, [router.pathname, href]);

  return (
    <Link href={href} className={clsx(isActive && "text-primary-900 font-bold", className)} onClick={onClick}>
      {children}
    </Link>
  );
};
