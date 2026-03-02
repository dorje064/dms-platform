import api from './axios';

export interface LoginDto {
  email: string;
  password: string;
}

export const authApi = {
  login: (dto: LoginDto) => api.post('/auth/login', dto),
  profile: () => api.get('/auth/profile'),
};
