import { User } from "./user";

export type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
};

export type CreateAddressDto = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};