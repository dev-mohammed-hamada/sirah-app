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

interface McqOptionsProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number | null; // null until answered
  disabled: boolean;
  onSelect: (index: number) => void;
}

export function McqOptions({
  options,
  selectedIndex,
  correctIndex,
  disabled,
  onSelect,
}: McqOptionsProps) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <OptionButton
          key={index}
          index={index}
          text={option}
          isSelected={selectedIndex === index}
          isCorrect={correctIndex === index}
          isWrong={selectedIndex === index && correctIndex !== null && correctIndex !== index}
          dimmed={selectedIndex !== null && selectedIndex !== index && correctIndex !== index}
          disabled={disabled}
          onPress={() => onSelect(index)}
        />
      ))}
    </View>
  );
}

interface OptionButtonProps {
  index: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  dimmed: boolean;
  disabled: boolean;
  onPress: () => void;
}

function OptionButton({
  index,
  text,
  isSelected,
  isCorrect,
  isWrong,
  dimmed,
  disabled,
  onPress,
}: OptionButtonProps) {
  const scale = useSharedValue(1);
  const prefix = ar.quiz.optionPrefixes[index] ?? '';

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

  const bgColor = isCorrect
    ? colors.successGreen
    : isWrong
      ? colors.errorRed
      : colors.starlightWhite;

  const textColor = isCorrect || isWrong ? colors.starlightWhite : colors.deepNightBlue;

  return (
    <AnimatedPressable
      entering={FadeIn.delay(100 + index * 50).duration(200)}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.option,
        { backgroundColor: bgColor },
        isCorrect && styles.optionCorrect,
        isWrong && styles.optionWrong,
        animatedStyle,
      ]}
    >
      <AppText
        style={[
          styles.prefix,
          { color: isCorrect || isWrong ? colors.starlightWhite : colors.desertGold },
        ]}
      >
        {prefix}.
      </AppText>
      <AppText style={[styles.optionText, { color: textColor }]}>{text}</AppText>
      {isCorrect && <AppText style={styles.icon}>✓</AppText>}
      {isWrong && <AppText style={styles.icon}>✗</AppText>}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    marginHorizontal: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.sandTrack,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  optionCorrect: {
    borderColor: colors.successGreen,
  },
  optionWrong: {
    borderColor: colors.errorRed,
  },
  prefix: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  icon: {
    fontSize: 18,
    color: colors.starlightWhite,
    fontWeight: '700',
  },
});
