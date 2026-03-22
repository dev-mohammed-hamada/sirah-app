export const colors = {
  // ─── Base Colors ───────────────────────────────────────────────
  desertGold: '#D4A843',
  deepNightBlue: '#1A2744',
  warmSand: '#F5E6C8',
  sunsetOrange: '#E8734A',
  royalPurple: '#4A2D6B',
  starlightWhite: '#FFF8F0',
  softCream: '#FAF3E8',
  successGreen: '#4CAF6E',
  errorRed: '#E05555',
  mutedGray: '#8A8A8A',
  flameOrange: '#FF9900',
  flameYellow: '#FFCC00',
  sandTrack: '#E0D5C5',
  white: '#FFFFFF',
  borderGray: '#E0E0E0',
  toggleGray: '#D1D1D6',
  logBrown: '#654321',
  narratorDarkBrown: '#5C3A1E',
  nightBlack: '#1A1A2E',
  deepPurple: '#3D2A50',
  warmBrown: '#6B4A30',
  midnightPurple: '#2D1B4E',
  shadowBlack: '#000',
  confettiBlue: '#5B8DEF',

  // ─── Desert Gold Variants ──────────────────────────────────────
  desertGoldLight: '#E8C36A',
  desertGoldGlowFaint: 'rgba(212, 168, 67, 0.1)',
  desertGoldGlowLight: 'rgba(212, 168, 67, 0.12)',
  desertGoldGlowSubtle: 'rgba(212, 168, 67, 0.15)',
  desertGoldGlow20: 'rgba(212, 168, 67, 0.2)',
  desertGoldGlow25: 'rgba(212, 168, 67, 0.25)',
  desertGoldGlow: 'rgba(212, 168, 67, 0.3)',
  desertGoldGlow40: 'rgba(212, 168, 67, 0.4)',
  desertGoldGlowMedium: 'rgba(212, 168, 67, 0.5)',
  desertGoldGlow70: 'rgba(212, 168, 67, 0.7)',

  // ─── Deep Night Blue Variants ──────────────────────────────────
  deepNightBlueMid: '#2A3A5C',
  deepNightBlueFaint: 'rgba(26, 39, 68, 0.05)',
  deepNightBlueSubtle: 'rgba(26, 39, 68, 0.08)',
  deepNightBlueBg: 'rgba(26, 39, 68, 0.15)',
  deepNightBlueOverlay: 'rgba(26, 39, 68, 0.6)',
  deepNightBlueHeavy: 'rgba(26, 39, 68, 0.85)',

  // ─── Starlight White Variants ──────────────────────────────────
  starlightWhiteFaint: 'rgba(255, 248, 240, 0.3)',
  starlightWhiteDim: 'rgba(255, 248, 240, 0.4)',
  starlightWhiteDimmer: 'rgba(255, 248, 240, 0.8)',

  // ─── Warm Sand Variants ────────────────────────────────────────
  warmSandFaint: 'rgba(245, 230, 200, 0.08)',
  warmSandSubtle: 'rgba(245, 230, 200, 0.15)',
  warmSandLight: 'rgba(245, 230, 200, 0.2)',

  // ─── Success Green Variants ────────────────────────────────────
  successGreenLight: 'rgba(76, 175, 110, 0.1)',
  successGreenBg: 'rgba(76, 175, 110, 0.12)',
  successGreenBgMedium: 'rgba(76, 175, 110, 0.15)',
  successGreenGlow: 'rgba(76, 175, 110, 0.2)',
  successGreenGlowMedium: 'rgba(76, 175, 110, 0.3)',

  // ─── Error Red Variants ────────────────────────────────────────
  errorRedBg: 'rgba(224, 85, 85, 0.08)',
  errorRedLight: 'rgba(224, 85, 85, 0.1)',
  errorRedBgMedium: 'rgba(224, 85, 85, 0.15)',
  errorRedGlow: 'rgba(224, 85, 85, 0.2)',

  // ─── Muted Gray Variants ───────────────────────────────────────
  mutedGraySubtle: 'rgba(138, 138, 138, 0.1)',
  mutedGrayLight: 'rgba(138, 138, 138, 0.2)',
  mutedGrayMedium: 'rgba(138, 138, 138, 0.3)',
  mutedGrayStrong: 'rgba(138, 138, 138, 0.4)',

  // ─── Flame / Orange Variants ───────────────────────────────────
  sunsetOrangeLight: '#F09060',
  flameOrangeGlow: 'rgba(255, 153, 0, 0.2)',
  flameOrangeGlowMedium: 'rgba(255, 153, 0, 0.3)',

  // ─── Purple Variants ───────────────────────────────────────────
  royalPurpleLight: '#6B4A8B',
  royalPurpleGlow: 'rgba(74, 45, 107, 0.2)',

  // ─── White Overlay Scale ───────────────────────────────────────
  whiteGhost: 'rgba(255, 255, 255, 0.08)',
  whiteFaint: 'rgba(255, 255, 255, 0.1)',
  whiteMist: 'rgba(255, 255, 255, 0.12)',
  whiteSubtle: 'rgba(255, 255, 255, 0.15)',
  whiteLight: 'rgba(255, 255, 255, 0.2)',
  whiteSoft: 'rgba(255, 255, 255, 0.3)',
  whiteMedium: 'rgba(255, 255, 255, 0.5)',
  whiteStrong: 'rgba(255, 255, 255, 0.6)',

  // ─── Black Overlay Scale ───────────────────────────────────────
  overlayFaint: 'rgba(0, 0, 0, 0.03)',
  overlaySoft: 'rgba(0, 0, 0, 0.1)',
  overlayLight: 'rgba(0, 0, 0, 0.06)',
  overlayHeavy: 'rgba(0, 0, 0, 0.4)',
  overlayMedium: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  overlayDarker: 'rgba(0, 0, 0, 0.8)',
} as const;

export type ColorName = keyof typeof colors;
