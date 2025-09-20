import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import Sidebar from "../sidebar/Sidebar";
import PageHeader from "@/common/PageHeader";
import ServiceFeatures from "@/common/features/ServiceFeatures";
import { Session } from "../session/session";
import { REGISTERED } from "@/lib/session-status";
import Header from "@/common/user/user-header";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/common/role.enum";

interface Props {
  children: React.ReactNode;
  isDisplayBreadcrumbs?: boolean;
  withSidebar?: boolean;
  pageTitle: string;
}

export const UserLayout = ({
  children,
  isDisplayBreadcrumbs = false,
  withSidebar,
  pageTitle,
}: Props) => {
  let view: React.ReactElement = <></>;
  if (withSidebar) {
    view = (
      <div className="px-5 py-20">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3 md:col-span-4 sm:col-span-4">
            <Sidebar />
          </div>
          <div className="col-span-9 md:col-span-8 sm:col-span-8">
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    view = <>{children}</>;
  }
  const { authUser } = useAuth();
  return (
    <Session sessionStatus={REGISTERED}>
      {authUser?.role === Role.VENDOR && <PageHeader />}
      <Header title={pageTitle} />
      {isDisplayBreadcrumbs && <Breadcrumbs />}
      {view}
      <ServiceFeatures />
    </Session>
  );
};
