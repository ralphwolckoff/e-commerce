import { Categorie } from "./category";
import { Order } from "./commands";
import { Product } from "./products";
import { User } from "./user";


export interface StoreWithProducts extends Store {
  products: Product[];
}


export interface Store {
  id: string;
  name: string;
  description: string;
  logo?: string;
  address?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  categories?: Categorie[];
  products?: Product[];
  orders?: Order[];
}

export interface Billboard {
  id: string;
  storeId: string;
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  store?: Store;
  categories?: Categorie[];
}

