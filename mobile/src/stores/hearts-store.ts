import { create } from 'zustand';

const MAX_HEARTS = 5;
const REFILL_DURATION_MS = 30 * 60 * 1000; // 30 minutes

interface HeartsState {
  heartsRemaining: number;
  maxHearts: number;
  nextRefillAt: number | null; // timestamp ms
  lastLostAt: number | null; // timestamp ms

  decrementHeart: () => void;
  refillHearts: () => void;
  checkAndRefill: () => void;
  setHeartsFromServer: (remaining: number, nextRefillAt: string | null) => void;
  getSecondsUntilRefill: () => number;
  isFull: () => boolean;
}

export const useHeartsStore = create<HeartsState>((set, get) => ({
  heartsRemaining: MAX_HEARTS,
  maxHearts: MAX_HEARTS,
  nextRefillAt: null,
  lastLostAt: null,

  decrementHeart: () => {
    const { heartsRemaining } = get();
    if (heartsRemaining <= 0) return;

    const now = Date.now();
    const newRemaining = heartsRemaining - 1;

    set({
      heartsRemaining: newRemaining,
      lastLostAt: now,
      nextRefillAt: newRemaining < MAX_HEARTS ? now + REFILL_DURATION_MS : null,
    });
  },

  refillHearts: () => {
    set({
      heartsRemaining: MAX_HEARTS,
      nextRefillAt: null,
      lastLostAt: null,
    });
  },

  checkAndRefill: () => {
    const { nextRefillAt, heartsRemaining } = get();
    if (heartsRemaining >= MAX_HEARTS) return;

    const now = Date.now();

    // Check midnight refill — if the last loss was on a previous day, refill
    if (get().lastLostAt) {
      const lastLostDate = new Date(get().lastLostAt!);
      const today = new Date();
      if (
        lastLostDate.getDate() !== today.getDate() ||
        lastLostDate.getMonth() !== today.getMonth() ||
        lastLostDate.getFullYear() !== today.getFullYear()
      ) {
        get().refillHearts();
        return;
      }
    }

    // Check 30-minute refill
    if (nextRefillAt && now >= nextRefillAt) {
      get().refillHearts();
    }
  },

  setHeartsFromServer: (remaining, nextRefillAtStr) => {
    set({
      heartsRemaining: remaining,
      nextRefillAt: nextRefillAtStr ? new Date(nextRefillAtStr).getTime() : null,
    });
  },

  getSecondsUntilRefill: () => {
    const { nextRefillAt, heartsRemaining, maxHearts } = get();
    if (heartsRemaining >= maxHearts || !nextRefillAt) return 0;
    const diff = Math.max(0, nextRefillAt - Date.now());
    return Math.ceil(diff / 1000);
  },

  isFull: () => {
    return get().heartsRemaining >= get().maxHearts;
  },
}));
