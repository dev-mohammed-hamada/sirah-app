import { GoalStatus } from '../enums';

export interface Goal {
  id: string;
  fatherId: string;
  sonId: string;
  sonDisplayName: string;
  description: string;
  stageGroupId: string;
  stageGroupTitle: string;
  deadline: string;
  rewardDescription: string;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoalDto {
  sonId: string;
  description: string;
  stageGroupId: string;
  deadline: string;
  rewardDescription: string;
}

export interface UpdateGoalDto {
  status?: GoalStatus;
  description?: string;
  deadline?: string;
  rewardDescription?: string;
}
