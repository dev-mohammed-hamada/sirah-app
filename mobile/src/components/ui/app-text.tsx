import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { colors, typography } from '../../theme';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'bodyLarge' | 'body' | 'caption' | 'small';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export function AppText({
  variant = 'body',
  color = colors.deepNightBlue,
  style,
  children,
  ...rest
}: AppTextProps) {
  const textStyle: TextStyle = {
    ...typography[variant],
    color,
    writingDirection: 'rtl',
    textAlign: 'right',
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
