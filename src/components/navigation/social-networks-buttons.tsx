import { v4 as uuidv4 } from "uuid";
import { RiFacebookFill } from "react-icons/ri";
import clsx from "clsx";
import { Button } from "@/ui/design/button/button";
import { footerSocialNetwordLinks } from "./applinks";

interface Props {
  theme?: "gray" | "accent" | "secondary";
  className?: string;
}

export const SocialNetwokbuttons = ({ className, theme = "accent" }: Props) => {
  const IcoList = footerSocialNetwordLinks.map((socialNetwork) => {
    return (
      <div key={uuidv4()}>
        <Button
          variant="ico"
          iconTheme={theme}
          icon={{
            icon: socialNetwork.icon ? socialNetwork.icon : RiFacebookFill,
          }}
          baseUrl={socialNetwork.baseUrl}
          linkType={socialNetwork.type}
        />
      </div>
    );
  });

  return (
    <div className={clsx(className)}>{IcoList}</div>
  );
};
