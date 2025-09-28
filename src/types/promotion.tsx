import { Store } from "./store";

export type Promotion = {
  id: string;
  productName: string;
  message: {
    messageTitle: string;
    messageContent: string;
  };
  discountPercentage: number;
  finalPrice: number;
  deadline: string;
  storeId: string;
  store: Store;
  createdAt: string;
  updatedAt: string;
};


export interface CreatePromotionPayload {
  productName: string;
  message: {
    messageTitle: string;
    messageContent: string;
  };
  discountPercentage: number;
  finalPrice: number;
  deadline: string;
  storeId: string;
}

export interface UpdatePromotionPayload {
  productName?: string;
  messageTitle?: string;
  messageContent?: string;
  discountPercentage?: number;
  finalPrice?: number;
  deadline?: string;
}
