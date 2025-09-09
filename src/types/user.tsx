import { Role } from "@/common/role.enum";
import { Order } from "./commands";
import { Store } from "./store";
import { Address } from "./address";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  bio: string | null;
  phoneNumber: number | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  role: Role;
  onboardingIsCompleted:boolean;
  createdAt: Date;
  updatedAt: Date;
  orders?: Order[];
  store?: Store;
  address?:Address
  profile?: Profile;
}

export interface CreateUserDto {
  email: string;
  password: string;
  role: Role;
  profile: Profile;
}

export interface UpdateProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  bio?: string;
  photoUrl?: string | null;
}