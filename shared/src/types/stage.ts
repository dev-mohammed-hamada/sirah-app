import { QuestionType } from '../enums';

export interface StageGroup {
  id: string;
  orderIndex: number;
  title: string;
  stages: StageSummary[];
}

export interface StageSummary {
  id: string;
  orderIndex: number;
  title: string;
  arabicTitle: string;
  maxScore: number;
  starsEarned?: number;
  isCompleted?: boolean;
}

export interface Stage {
  id: string;
  groupId: string;
  orderIndex: number;
  title: string;
  arabicTitle: string;
  description?: string;
  maxScore: number;
  storyPanels: StoryPanel[];
}

export interface StoryPanel {
  id: string;
  orderIndex: number;
  narrationText: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  questionText: string;
  options: QuestionOption[];
  explanation?: string;
  xpValue: number;
  isInline: boolean;
  orderIndex: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface AnswerResult {
  questionId: string;
  correct: boolean;
  correctAnswer: string;
  explanation?: string;
  xpEarned: number;
}
