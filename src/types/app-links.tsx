import { LinkType } from "@/lib/link-type";
import { IconType } from "react-icons";

export interface Applinks {
  label: string;
  baseUrl: string;
  type: LinkType;
  icon?: IconType;
}
export interface footerLinks {
  label: string;
  links: Applinks[];
}
