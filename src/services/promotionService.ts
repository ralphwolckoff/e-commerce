import { CreatePromotionPayload, Promotion, UpdatePromotionPayload } from "@/types/promotion";
import api from "./api";

class PromotionService {
 
  async findAll(): Promise<Promotion[]> {
    const response = await api.get<Promotion[]>("/promotions");
    return response.data;
  }


  async findByStoreId(storeId: string): Promise<Promotion[]> {
    const response = await api.get<Promotion[]>(`/promotions/store/${storeId}`);
    return response.data;
  }

  async findOne(id: string): Promise<Promotion> {
    const response = await api.get<Promotion>(`/promotions/${id}`);
    return response.data;
  }

 
  async create(data: CreatePromotionPayload): Promise<Promotion> {
    const response = await api.post<Promotion>("/promotions", data);
    return response.data;
  }

  async update(id: string, data: UpdatePromotionPayload): Promise<Promotion> {
    const response = await api.patch<Promotion>(`/promotions/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await api.delete(`/promotions/${id}`);
  }
}

const promotionService = new PromotionService();
export default promotionService;
