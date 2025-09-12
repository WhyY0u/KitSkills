import { competenciesService } from './competenciesService';
import type { CompetencyResponse } from './competenciesService';
import { get } from '../../../core/utils/api';

// Мокаем модуль api
vi.mock('../../../core/utils/api', () => ({
  get: vi.fn(),
}));

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('competenciesService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен преобразовывать данные с бэкенда в формат приложения', async () => {
    // Мок данных с бэкенда
    const mockApiResponse = {
      data: [
        {
          id: '2bc809b4-1356-459f-8ea2-f587da563e06',
          name: 'Веб разработка',
          topUsers: [
            {
              userId: '65b22f0e-1e83-42c9-bb90-68f22d4a23f1',
              fio: 'Иванов Иван',
              username: 'drtyui_miracle',
              score: 1,
              percentage: 100,
              duration: 430.149
            }
          ]
        }
      ],
      error: null,
      status: 200
    };

    // Устанавливаем мок для функции get
    (get as any).mockResolvedValue(mockApiResponse);

    // Вызываем тестируемую функцию
    const result = await competenciesService.getCompetencies();

    // Проверяем, что функция get была вызвана с правильными параметрами
    expect(get).toHaveBeenCalledWith('/competencies', { auth: true });

    // Проверяем результат преобразования
    expect(result).toEqual([
      {
        id: '2bc809b4-1356-459f-8ea2-f587da563e06',
        name: 'Веб разработка',
        description: '',
        topResult: [
          {
            user: {
              id: '65b22f0e-1e83-42c9-bb90-68f22d4a23f1',
              fullname: 'Иванов Иван',
              telegramUser: 'drtyui_miracle',
              group: ''
            },
            time: '07:10',
            score: 1
          }
        ]
      }
    ]);
  });

  it('должен возвращать пустой массив при ошибке', async () => {
    // Мок ошибки
    (get as any).mockResolvedValue({
      data: null,
      error: 'Ошибка сети',
      status: 500
    });

    // Вызываем тестируемую функцию
    const result = await competenciesService.getCompetencies();

    // Проверяем результат
    expect(result).toEqual([]);
  });
});