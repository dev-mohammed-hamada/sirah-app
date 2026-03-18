export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Landing: undefined;
  SignUp: undefined;
  Login: undefined;
};

export type SonTabParamList = {
  HomeTab: undefined;
  ProgressTab: undefined;
  GoalsTab: undefined;
  AwardsTab: undefined;
  SettingsTab: undefined;
};

export type SonHomeStackParamList = {
  HomeJourneyMap: undefined;
  StageDetail: { stageId: string };
  NarratorWelcome: { stageId: string };
  StoryPanel: { stageId: string; panelIndex: number };
  InlineQuestion: { stageId: string; questionId: string };
  FinalQuiz: { stageId: string };
  CelebrationResults: { stageId: string };
};

export type FatherTabParamList = {
  SonsTab: undefined;
  GoalsTab: undefined;
};

export type FatherSonsStackParamList = {
  FatherHome: undefined;
  SonProgressDetail: { sonId: string };
  CreateGoal: { sonId?: string };
};

export type FatherGoalsStackParamList = {
  GoalsFatherView: undefined;
  CreateGoal: { sonId?: string };
};

export type RootStackParamList = {
  Auth: undefined;
  SonTabs: undefined;
  FatherTabs: undefined;
  DailyChallenge: undefined;
  LinkRequest: { linkId: string };
};
