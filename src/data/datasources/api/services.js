/**
 * API сервисы для работы с бэкендом
 */
import { post, get } from '../../../core/utils/api';

/**
 * Типы данных для авторизации
 */
export const AuthInitRequest = {
  initData: '',
  fio: '',
  group: ''
};

export const User = {
  id: '',
  telegramId: '',
  username: '',
  fio: '',
  groupNumber: '',
  createdAt: '',
  updatedAt: '',
  Admin: {
    id: '',
    userId: ''
  }
};

export const AuthResponse = {
  token: '',
  user: User
};

/**
 * Сервис авторизации
 */
export const authService = {
  /**
   * Инициализация пользователя через Telegram
   * @param data - данные для инициализации
   * @returns результат авторизации
   */
  init: (data) => {
    return post('/auth/init', data);
  },

  /**
   * Получение данных текущего пользователя
   * @returns данные пользователя
   */
  getCurrentUser: () => {
    return get('/auth/me', { auth: true });
  },
};