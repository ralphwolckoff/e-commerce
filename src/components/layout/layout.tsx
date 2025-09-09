import { Container } from "../container/container";
import Footer from "../navigation/footer";
import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import Sidebar from "../dashboard/Sidebar";
import { Header } from "../navigation/header";
import { Session } from "../session/session";

interface Props {
  children: React.ReactNode;
  isDisplayBreadcrumbs?: boolean;
  withSidebar?: boolean;
}

export const Layout = ({
  children,
  isDisplayBreadcrumbs = false,
  withSidebar,
}: Props) => {
  let view: React.ReactElement = <></>;
  if (withSidebar) {
    view = (
      <Container className="mb-14">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-3">
            <Sidebar />
          </div>
          <div className="col-span-9 ">{children}</div>
        </div>
      </Container>
    );
  } else {
    view = <>{children}</>;
  }
  return (
    <Session>
      <Header />
      {isDisplayBreadcrumbs && <Breadcrumbs />}
      {view}
      <Footer />
    </Session>
  );
};
