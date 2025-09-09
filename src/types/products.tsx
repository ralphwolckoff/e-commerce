// src/types/products.ts

import { Category } from "./category";
import { OrderItem } from "./commands";
import { Store } from "./store";
import { Decimal } from "@prisma/client/runtime/library";


export interface Images {
  id: string;
  url: string;
  alt?: string;
  productId: string;
}

export type ProductCreationPayload = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  images?: ImageCreationPayload[];
  storeId: string;
};

export type ProductUpdatePayload = {
  name?: string;
  description?: string;
  prix?: number;
  stock?: number;
  images?: ImageCreationPayload[];
  authorId?: string;
};

export type ImageCreationPayload = {
  url: string;
  alt?: string;
};

export type ProductSortKey = "name" | "price" | "stock";

export interface Product {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  price: Decimal;
  description: string;
  stock: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string | null;
  colorId: string | null;
  createdAt: Date;
  updatedAt: Date;
  store?: Store;
  category?: Category;
  images?: Images[];
  size?: Size;
  color?: Color;
  orderItems?: OrderItem[];
}

export interface Size {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
}

export interface Color {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
}

export interface Images {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
}