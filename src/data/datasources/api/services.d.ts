export interface AuthInitRequest {
  initData: string;
  fio: string;
  group: string;
}

export interface User {
  id: string;
  telegramId: string;
  username: string;
  fio: string;
  groupNumber: string;
  createdAt: string;
  updatedAt: string;
  Admin?: {
    id: string;
    userId: string;
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthService {
  init: (data: AuthInitRequest) => Promise<AuthResponse>;
  getCurrentUser: () => Promise<User>;
}

export const authService: AuthService;