import { create } from 'zustand';

interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  correct: boolean;
  timeMs: number;
}

interface QuizState {
  currentStageId: string | null;
  answers: QuizAnswer[];
  heartsRemaining: number;
  currentPanelIndex: number;
  startStage: (stageId: string, hearts: number) => void;
  addAnswer: (answer: QuizAnswer) => void;
  useHeart: () => void;
  nextPanel: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentStageId: null,
  answers: [],
  heartsRemaining: 5,
  currentPanelIndex: 0,

  startStage: (stageId, hearts) =>
    set({ currentStageId: stageId, answers: [], heartsRemaining: hearts, currentPanelIndex: 0 }),

  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),

  useHeart: () => set((state) => ({ heartsRemaining: Math.max(0, state.heartsRemaining - 1) })),

  nextPanel: () => set((state) => ({ currentPanelIndex: state.currentPanelIndex + 1 })),

  reset: () =>
    set({ currentStageId: null, answers: [], heartsRemaining: 5, currentPanelIndex: 0 }),
}));
