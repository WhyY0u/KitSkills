/**
 * Утилиты для работы с API
 */

// Получаем базовый URL из переменных окружения
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Типы для запросов
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions extends RequestInit {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  auth?: boolean;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Кастомный fetch для работы с API
 * @param endpoint - путь к эндпоинту
 * @param options - опции запроса
 * @returns результат запроса
 */
export const fetchApi = async <T>(endpoint: string, options: FetchOptions): Promise<ApiResponse<T>> => {
  try {
    const { method, headers = {}, body, auth = false } = options;
    
    // Формируем URL
    const url = `${BASE_URL}${endpoint}`;
    
    // Формируем заголовки
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...headers,
    };
    
    // Если требуется авторизация, добавляем токен
    if (auth) {
      const token = localStorage.getItem('token');
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }
    
    // Формируем опции запроса
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: 'include',
    };
    
    // Если есть тело запроса, добавляем его
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    
    // Выполняем запрос
    const response = await fetch(url, requestOptions);
    
    // Получаем данные
    let data: T | null = null;
    try {
      data = await response.json();
    } catch (e) {
      // Если не удалось распарсить JSON, оставляем data = null
    }
    
    // Если статус не в диапазоне 200-299, считаем это ошибкой
    if (!response.ok) {
      return {
        data: null,
        error: data ? JSON.stringify(data) : response.statusText,
        status: response.status,
      };
    }
    
    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 0, // 0 означает, что запрос не был выполнен (например, из-за проблем с сетью)
    };
  }
};

/**
 * GET запрос
 */
export const get = <T>(endpoint: string, options: Omit<FetchOptions, 'method'> = {}): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, { ...options, method: 'GET' });
};

/**
 * POST запрос
 */
export const post = <T>(endpoint: string, body: any, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, { ...options, method: 'POST', body });
};

/**
 * PUT запрос
 */
export const put = <T>(endpoint: string, body: any, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, { ...options, method: 'PUT', body });
};

/**
 * DELETE запрос
 */
export const del = <T>(endpoint: string, options: Omit<FetchOptions, 'method'> = {}): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
};

/**
 * PATCH запрос
 */
export const patch = <T>(endpoint: string, body: any, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> => {
  return fetchApi<T>(endpoint, { ...options, method: 'PATCH', body });
};