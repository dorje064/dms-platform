import api from './axios';

export interface Donor {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  amount: number;
  currency: string;
  location: string;
  type: string;
  date: string;
  avatar?: string;
  message?: string;
  createdAt: string;
}

export interface DonorListParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}

export interface CreateDonorDto {
  name: string;
  email?: string;
  phone?: string;
  amount: number;
  currency?: string;
  location: string;
  type?: string;
  date?: string;
  avatar?: string;
  message?: string;
}

export const donorApi = {
  list: (params: DonorListParams = {}) =>
    api.get('/donors', { params }),

  getOne: (id: string) =>
    api.get(`/donors/${id}`),

  create: (data: CreateDonorDto) =>
    api.post('/donors', data),

  update: (id: string, data: Partial<CreateDonorDto>) =>
    api.put(`/donors/${id}`, data),

  delete: (id: string) =>
    api.delete(`/donors/${id}`),
};
