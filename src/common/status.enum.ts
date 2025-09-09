export enum Statut {
  PLACED = "Placed",
  ACCEPTED = "Accepted",
  INPROGRESS = "In Progress",
  ONTHEWAY = "On The Way",
  DELIVERED = "Delivered",
}

export type Status =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

export type CommandStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED_BY_SELLER"
  | "DELIVERED_TO_CUSTOMER"
  | "RETURNED"
  | "CANCELED";
