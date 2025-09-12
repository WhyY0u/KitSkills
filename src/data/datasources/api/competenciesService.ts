import { get, post } from '../../../core/utils/api';
import type { Skill, Result } from '../../../domain/entities/skill/Skill';
import type { User } from '../../../domain/entities/user/User';

// Интерфейсы для данных, получаемых с бэкенда
export interface CompetencyUser {
  userId: string;
  fio: string;
  username: string;
  score: number;
  percentage: number;
  duration: number;
}

export interface CompetencyResponse {
  id: string;
  name: string;
  topUsers: CompetencyUser[];
}

// Интерфейс для ответа от API при выборе компетенции
export interface CompetencySelectResponse {
  userId: string;
  competencyId: string;
  startedAt: string;
  expiresAt: string;
  completedAt: string;
  score: number;
  percentage: number;
  passed: boolean;
  competency: {
    id: string;
    name: string;
  };
}

export interface CompetenciesService {
  getCompetencies: () => Promise<Skill[]>;
  selectCompetency: (id: string) => Promise<CompetencySelectResponse | null>;
}

// Функция для преобразования данных с бэкенда в формат приложения
const mapCompetencyToSkill = (competency: CompetencyResponse): Skill => {
  const topResult: Result[] = competency.topUsers.map(user => {
    // Преобразуем длительность в формат времени (минуты:секунды)
    const minutes = Math.floor(user.duration / 60);
    const seconds = Math.floor(user.duration % 60);
    const time = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const mappedUser: User = {
      id: user.userId,
      fullname: user.fio,
      telegramUser: user.username,
      group: '' // В ответе API нет информации о группе
    };
    
    return {
      user: mappedUser,
      time,
      score: user.score
    };
  });
  
  return {
    id: competency.id,
    name: competency.name,
    description: '', // В ответе API нет описания
    topResult
  };
};

export const competenciesService: CompetenciesService = {
  getCompetencies: async () => {
    const response = await get<CompetencyResponse[]>('/competencies', { auth: true });
    
    if (response.error || !response.data) {
      return [];
    }
    
    return response.data.map(mapCompetencyToSkill);
  },
  
  selectCompetency: async (id: string) => {
    const response = await post<CompetencySelectResponse>(`/competencies/${id}/select`, {}, { auth: true });
    
    if (response.error || !response.data) {
      console.error('Ошибка при выборе компетенции:', response.error);
      return null;
    }
    
    return response.data;
  },
};