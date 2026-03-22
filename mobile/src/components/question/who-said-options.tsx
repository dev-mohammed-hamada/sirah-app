import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../ui/app-text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface WhoSaidOptionsProps {
  quote: string;
  characters: string[];
  selectedIndex: number | null;
  correctIndex: number | null;
  disabled: boolean;
  onSelect: (index: number) => void;
}

export function WhoSaidOptions({
  quote,
  characters,
  selectedIndex,
  correctIndex,
  disabled,
  onSelect,
}: WhoSaidOptionsProps) {
  return (
    <Animated.View entering={FadeIn.delay(150).duration(200)} style={styles.container}>
      {/* Decorative quote bubble */}
      <View style={styles.quoteBubble}>
        <AppText style={styles.quoteText}>❝ {quote} ❞</AppText>
      </View>

      {/* Character name buttons */}
      <View style={styles.charactersList}>
        {characters.map((name, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = correctIndex === index;
          const isWrong = isSelected && correctIndex !== null && correctIndex !== index;
          const dimmed = selectedIndex !== null && !isSelected && !isCorrect;

          return (
            <CharacterButton
              key={index}
              name={name}
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

interface CharacterButtonProps {
  name: string;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  dimmed: boolean;
  disabled: boolean;
  onPress: () => void;
}

function CharacterButton({
  name,
  isSelected,
  isCorrect,
  isWrong,
  dimmed,
  disabled,
  onPress,
}: CharacterButtonProps) {
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
      style={[styles.characterBtn, { backgroundColor: bgColor }, animatedStyle]}
    >
      {/* Silhouette icon */}
      <View style={[styles.silhouette, (isCorrect || isWrong) && styles.silhouetteLight]}>
        <View style={[styles.silHead, (isCorrect || isWrong) && styles.silPartLight]} />
        <View style={[styles.silBody, (isCorrect || isWrong) && styles.silPartLight]} />
      </View>
      <AppText style={[styles.characterName, { color: textColor }]}>{name}</AppText>
      {isCorrect && <AppText style={styles.icon}>✓</AppText>}
      {isWrong && <AppText style={styles.icon}>✗</AppText>}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  quoteBubble: {
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.desertGold,
    padding: spacing.xl,
    ...shadows.soft,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: colors.deepNightBlue,
    lineHeight: 30,
    textAlign: 'center',
  },
  charactersList: {
    gap: spacing.md,
  },
  characterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.sandTrack,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  silhouette: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.deepNightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  silhouetteLight: {
    backgroundColor: colors.whiteSoft,
  },
  silHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.warmSand,
    position: 'absolute',
    top: 4,
  },
  silBody: {
    width: 16,
    height: 10,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    backgroundColor: colors.warmSand,
    position: 'absolute',
    bottom: 1,
  },
  silPartLight: {
    backgroundColor: colors.starlightWhite,
  },
  characterName: {
    fontSize: 16,
    flex: 1,
  },
  icon: {
    fontSize: 18,
    color: colors.starlightWhite,
    fontWeight: '700',
  },
});
