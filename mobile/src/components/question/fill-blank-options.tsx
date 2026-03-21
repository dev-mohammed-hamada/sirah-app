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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FillBlankOptionsProps {
  sentence: string; // Contains ___ for blank
  options: string[];
  selectedIndex: number | null;
  correctIndex: number | null;
  disabled: boolean;
  onSelect: (index: number) => void;
}

export function FillBlankOptions({
  sentence,
  options,
  selectedIndex,
  correctIndex,
  disabled,
  onSelect,
}: FillBlankOptionsProps) {
  // Split sentence around the blank
  const parts = sentence.split('___');
  const filledWord = selectedIndex !== null ? options[selectedIndex] : null;

  return (
    <Animated.View entering={FadeIn.delay(150).duration(200)} style={styles.container}>
      {/* Sentence with blank */}
      <View style={styles.sentenceContainer}>
        <AppText style={styles.sentenceText}>
          {parts[0]}
          <AppText
            style={[
              styles.blankText,
              filledWord &&
                correctIndex !== null &&
                selectedIndex === correctIndex &&
                styles.blankCorrect,
              filledWord &&
                correctIndex !== null &&
                selectedIndex !== correctIndex &&
                styles.blankWrong,
            ]}
          >
            {filledWord ?? ' _______ '}
          </AppText>
          {parts[1] ?? ''}
        </AppText>
      </View>

      {/* Options */}
      <View style={styles.optionsRow}>
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = correctIndex === index;
          const isWrong = isSelected && correctIndex !== null && correctIndex !== index;
          const dimmed = selectedIndex !== null && !isSelected && !isCorrect;

          return (
            <FillOption
              key={index}
              text={option}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isWrong={isWrong}
              dimmed={dimmed}
              disabled={disabled}
              onPress={() => onSelect(index)}
            />
          );
        })}
      </View>
    </Animated.View>
  );
}

interface FillOptionProps {
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  dimmed: boolean;
  disabled: boolean;
  onPress: () => void;
}

function FillOption({
  text,
  isSelected,
  isCorrect,
  isWrong,
  dimmed,
  disabled,
  onPress,
}: FillOptionProps) {
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

  const bgColor = isCorrect
    ? colors.successGreen
    : isWrong
      ? colors.errorRed
      : colors.starlightWhite;

  const textColor = isCorrect || isWrong ? colors.starlightWhite : colors.deepNightBlue;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.option, { backgroundColor: bgColor }, animatedStyle]}
    >
      <AppText style={[styles.optionText, { color: textColor, textAlign: 'center' }]}>
        {text}
      </AppText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  sentenceContainer: {
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.sandTrack,
  },
  sentenceText: {
    fontSize: 18,
    color: colors.deepNightBlue,
    lineHeight: 30,
    textAlign: 'center',
  },
  blankText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.desertGold,
    textDecorationLine: 'underline',
  },
  blankCorrect: {
    color: colors.successGreen,
  },
  blankWrong: {
    color: colors.errorRed,
  },
  optionsRow: {
    gap: spacing.md,
  },
  option: {
    height: 52,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.sandTrack,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  optionText: {
    fontSize: 16,
  },
});
