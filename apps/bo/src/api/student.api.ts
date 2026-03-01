import api from './axios';

export interface Student {
  _id: string;
  name: string;
  grade: string;
  school: string;
  region: string;
  status: string;
  avatar?: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
}

export interface StudentListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateStudentDto {
  name: string;
  grade: string;
  school: string;
  region: string;
  status?: string;
  email?: string;
  phone?: string;
  notes?: string;
  avatar?: string;
}

export const studentApi = {
  list: (params: StudentListParams = {}) =>
    api.get('/students', { params }),

  getOne: (id: string) =>
    api.get(`/students/${id}`),

  create: (data: CreateStudentDto) =>
    api.post('/students', data),

  update: (id: string, data: Partial<CreateStudentDto>) =>
    api.put(`/students/${id}`, data),

  delete: (id: string) =>
    api.delete(`/students/${id}`),

  uploadImage: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post('/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
