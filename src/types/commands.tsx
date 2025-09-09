import { Status } from "@/common/status.enum";
import { Store } from "./store";
import { Product } from "./products";
import { Address } from "./address";
import { User } from "./user";
import { Categorie } from "./category";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  priceAtOrder:number
  quantity:number
  createdAt: Date;
  updatedAt: Date;
  order?: Order;
  product?: Product;
}

export interface OrderItemPayload
{
  productId:string
  quantity: number
}

export interface OrderPayload{
  userId: string
  addressId: string
  items: OrderItemPayload[]
}

export interface Order {
  id: string;
  orderNumber: string
  status: Status
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  storeId: string;
  addressId: string;
  user: User;
  address: Address;
  store: Store
  category:Categorie
  items: OrderItem[]
  product: Product
}
