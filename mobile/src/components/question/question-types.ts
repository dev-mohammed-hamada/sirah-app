// ─── Question Type Definitions ───────────────────────────────────
export type QuestionType = 'mcq' | 'true_false' | 'arrange' | 'fill_blank' | 'who_said';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  explanation: string;
}

export interface McqQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correctAnswer: boolean;
}

export interface ArrangeQuestion extends BaseQuestion {
  type: 'arrange';
  items: string[];
  correctOrder: number[];
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill_blank';
  sentence: string; // Use ___ for the blank
  options: string[];
  correctIndex: number;
}

export interface WhoSaidQuestion extends BaseQuestion {
  type: 'who_said';
  quote: string;
  characters: string[];
  correctIndex: number;
}

export type Question =
  | McqQuestion
  | TrueFalseQuestion
  | ArrangeQuestion
  | FillBlankQuestion
  | WhoSaidQuestion;
