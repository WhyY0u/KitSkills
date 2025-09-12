/**
 * API сервисы для работы с бэкендом
 */
import { post, get } from '../../../core/utils/api';
import type { AuthInitRequest, User, AuthResponse, AuthService } from './services.d';

/**
 * Сервис авторизации
 */
export const authService: AuthService = {
  /**
   * Инициализация пользователя через Telegram
   * @param data - данные для инициализации
   * @returns результат авторизации
   */
  init: (data: AuthInitRequest) => {
    return post<AuthResponse>('/auth/init', data);
  },

  /**
   * Получение данных текущего пользователя
   * @returns данные пользователя
   */
  getCurrentUser: () => {
    return get<User>('/auth/me', { auth: true });
  },
};

// Реэкспорт типов для удобства использования
export { AuthInitRequest, User, AuthResponse };