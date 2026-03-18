export interface StageProgress {
  id: string;
  stageId: string;
  bestScore: number;
  starsEarned: number;
  attempts: number;
  completedAt: string;
}

export interface HeartsState {
  remaining: number;
  maxHearts: number;
  nextRefillAt?: string;
}

export interface StreakInfo {
  current: number;
  lastActiveDate?: string;
  isActiveToday: boolean;
  nextMilestone?: number;
}

export interface ProgressSummary {
  totalXp: number;
  currentStreak: number;
  totalStars: number;
  stagesCompleted: number;
  totalStages: number;
  hearts: HeartsState;
}

export interface StageCompletionResult {
  score: number;
  maxScore: number;
  scorePercent: number;
  starsEarned: number;
  isNewBest: boolean;
  xpEarned: number;
  totalXp: number;
  streakUpdated: boolean;
  currentStreak: number;
}

export interface SubmitAnswerDto {
  stageId: string;
  questionId: string;
  selectedAnswer: string;
  timeMs: number;
}

export interface CompleteStageDto {
  stageId: string;
  answers: {
    questionId: string;
    selectedAnswer: string;
    timeMs: number;
  }[];
}

export interface DailyChallenge {
  id: string;
  question: import('./stage').QuizQuestion;
  completed: boolean;
  correct?: boolean;
}
