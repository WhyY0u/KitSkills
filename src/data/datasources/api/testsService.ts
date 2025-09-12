import { get, post } from '../../../core/utils/api';

// Интерфейсы для данных теста
export interface TestQuestion {
  id: string;
  question: string;
  answers: string[];
}

export interface TestSubmitRequest {
  testId: string;
  answer: string;
}

export interface TestSubmitResponse {
  success: boolean;
  message?: string;
  score?: number;
}

export interface TestsService {
  getCompetencyTests: (competencyId: string) => Promise<TestQuestion[]>;
  submitTestAnswer: (data: TestSubmitRequest) => Promise<TestSubmitResponse | null>;
}

export const testsService: TestsService = {
  getCompetencyTests: async (competencyId: string) => {
    const response = await get<TestQuestion[]>(`/tests/competency/${competencyId}`, { auth: true });
    
    if (response.error || !response.data) {
      console.error('Ошибка при получении вопросов теста:', response.error);
      return [];
    }
    
    return response.data;
  },
  
  submitTestAnswer: async (data: TestSubmitRequest) => {
    const response = await post<TestSubmitResponse>('/tests/submit', data, { auth: true });
    
    if (response.error || !response.data) {
      console.error('Ошибка при отправке ответа:', response.error);
      return null;
    }
    
    return response.data;
  },
};