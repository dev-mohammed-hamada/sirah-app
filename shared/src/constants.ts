// Hearts
export const MAX_HEARTS = 5;
export const HEART_REFILL_MINUTES = 30;

// Stars
export const STAR_THRESHOLDS = {
  ONE_STAR: 1,
  TWO_STARS: 51,
  THREE_STARS: 81,
} as const;

// XP Bonuses
export const XP_BONUS = {
  PERFECT_RUN: 20,
  FIRST_TRY: 10,
  SPEED: 5,
} as const;

// Streak milestones
export const STREAK_MILESTONES = [3, 7, 14, 30] as const;

// Group unlock
export const STARS_TO_UNLOCK_NEXT_GROUP = 24;
export const MAX_STARS_PER_GROUP = 30;

// Linking
export const MAX_FATHERS_PER_SON = 2;

// Stage flow
export const MAX_SENTENCES_PER_PANEL = 3;

// V1 limits
export const V1_TOTAL_STAGES = 10;
export const V1_TOTAL_GROUPS = 1;
