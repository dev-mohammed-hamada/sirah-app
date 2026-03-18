import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'Cairo_400Regular',
  medium: 'Cairo_500Medium',
  semiBold: 'Cairo_600SemiBold',
  bold: 'Cairo_700Bold',
  black: 'Cairo_900Black',
} as const;

export const typography: Record<string, TextStyle> = {
  h1: { fontFamily: fontFamily.black, fontSize: 32, lineHeight: 48 },
  h2: { fontFamily: fontFamily.bold, fontSize: 24, lineHeight: 36 },
  h3: { fontFamily: fontFamily.bold, fontSize: 20, lineHeight: 30 },
  h4: { fontFamily: fontFamily.semiBold, fontSize: 18, lineHeight: 27 },
  bodyLarge: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24 },
  body: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 21 },
  caption: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 18 },
  small: { fontFamily: fontFamily.regular, fontSize: 10, lineHeight: 15 },
};
