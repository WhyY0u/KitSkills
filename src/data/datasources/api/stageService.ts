
import { get } from '../../../core/utils/api';

export interface Stage {
  id: string;
  startedAt: string;
  endsAt: string;
  active: boolean;
}

export interface StageStatus {
  status: string;
  stage: Stage;
}

export interface StageService {

  getStatus: () => Promise<StageStatus>;
}


export const stageService: StageService = {
  getStatus: () => {
    return get<StageStatus>('/stages/status');
  },
};