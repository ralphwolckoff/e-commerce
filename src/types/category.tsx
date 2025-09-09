import { Product } from "./products";
import { Store, Billboard } from "./store";

export interface Category {
  id: string;
  name: string;
}


export interface Categorie {
  id: string;
  storeId: string;
  billboardId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  store?: Store;
  billboard?: Billboard;
  products?: Product[];
}