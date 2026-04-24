import api from './api';
import { Order, OrdersResponse, CreateOrderRequest } from '@/types';

export const ordersService = {
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await api.post<{ success: boolean; data: Order }>('/orders', orderData);
    return response.data.data;
  },

  async getMyOrders(params?: { page?: number; limit?: number }): Promise<OrdersResponse> {
    const response = await api.get<OrdersResponse>('/orders/my', { params });
    return response.data;
  },
};
