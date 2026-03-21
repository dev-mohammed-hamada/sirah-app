export const colors = {
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
  successGreenLight: 'rgba(76, 175, 110, 0.1)',
  successGreenBg: 'rgba(76, 175, 110, 0.12)',
  errorRedLight: 'rgba(224, 85, 85, 0.1)',
  errorRedBg: 'rgba(224, 85, 85, 0.08)',
} as const;

export type ColorName = keyof typeof colors;
