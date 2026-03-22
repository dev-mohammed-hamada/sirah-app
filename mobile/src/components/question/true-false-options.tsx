import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing, radius } from '../../theme';
import { AppText } from '../ui/app-text';
import { ar } from '../../i18n/ar';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TrueFalseOptionsProps {
  selectedAnswer: boolean | null;
  correctAnswer: boolean | null; // null until answered
  disabled: boolean;
  onSelect: (answer: boolean) => void;
}

export function TrueFalseOptions({
  selectedAnswer,
  correctAnswer,
  disabled,
  onSelect,
}: TrueFalseOptionsProps) {
  const buttons: { value: boolean; label: string; tint: string; border: string }[] = [
    {
      value: true,
      label: `${ar.quiz.trueLabel} ✓`,
      tint: colors.successGreenLight,
      border: colors.successGreen,
    },
    {
      value: false,
      label: `${ar.quiz.falseLabel} ✗`,
      tint: colors.errorRedLight,
      border: colors.errorRed,
    },
  ];

  return (
    <Animated.View entering={FadeIn.delay(150).duration(200)} style={styles.container}>
      {buttons.map((btn) => {
        const isSelected = selectedAnswer === btn.value;
        const isCorrect = correctAnswer === btn.value && correctAnswer !== null;
        const isWrong = isSelected && correctAnswer !== null && correctAnswer !== btn.value;
        const dimmed = selectedAnswer !== null && !isSelected && !isCorrect;

        return (
          <TFButton
            key={String(btn.value)}
            label={btn.label}
            tint={btn.tint}
            border={btn.border}
            isSelected={isSelected}
            isCorrect={isCorrect}
            isWrong={isWrong}
            dimmed={dimmed}
            disabled={disabled}
            onPress={() => onSelect(btn.value)}
          />
        );
      })}
    </Animated.View>
  );
}

interface TFButtonProps {
  label: string;
  tint: string;
  border: string;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  dimmed: boolean;
  disabled: boolean;
  onPress: () => void;
}

function TFButton({
  label,
  tint,
  border,
  isSelected,
  isCorrect,
  isWrong,
  dimmed,
  disabled,
  onPress,
}: TFButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: dimmed ? 0.5 : 1,
  }));

  const handlePressIn = () => {
    if (!disabled) scale.value = withTiming(0.97, { duration: 100 });
  };
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const bgColor = isCorrect ? colors.successGreen : isWrong ? colors.errorRed : tint;

  const textColor = isCorrect || isWrong ? colors.starlightWhite : colors.deepNightBlue;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor: isCorrect ? colors.successGreen : isWrong ? colors.errorRed : border,
        },
        animatedStyle,
      ]}
    >
      <AppText style={[styles.buttonText, { color: textColor, textAlign: 'center' }]}>
        {label}
      </AppText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
  },
  button: {
    flex: 1,
    height: 64,
    borderRadius: radius.md,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
