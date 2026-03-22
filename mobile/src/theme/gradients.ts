import { colors } from './colors';

export const gradients = {
  nightSky: {
    colors: [colors.deepNightBlue, colors.midnightPurple, colors.deepNightBlue],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  desertHorizon: {
    colors: [colors.sunsetOrange, colors.desertGold, colors.warmSand],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  goldenGlow: {
    colors: [colors.desertGold, colors.warmSand],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  xpCard: {
    colors: [colors.desertGold, colors.desertGoldLight],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  streakCard: {
    colors: [colors.sunsetOrange, colors.sunsetOrangeLight],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  starsCard: {
    colors: [colors.royalPurple, colors.royalPurpleLight],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  dailyChallenge: {
    colors: [colors.royalPurple, colors.deepNightBlue],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
} as const;
