import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { colors, typography, radius, spacing } from '../../theme';
import { AppText } from '../ui/app-text';

interface NarratorBubbleProps {
  text: string;
  typewriter?: boolean;
  typewriterSpeed?: number;
  onFinishTyping?: () => void;
  /** Use compact variant (login screen: 12px 20px padding, 18px font) */
  compact?: boolean;
}

export function NarratorBubble({
  text,
  typewriter = true,
  typewriterSpeed = 40,
  onFinishTyping,
  compact = false,
}: NarratorBubbleProps) {
  const [displayedText, setDisplayedText] = useState(typewriter ? '' : text);
  const bubbleScale = useSharedValue(0.9);
  const bubbleOpacity = useSharedValue(0);

  useEffect(() => {
    bubbleScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    bubbleOpacity.value = withTiming(1, { duration: 300 });
  }, []);

  useEffect(() => {
    if (!typewriter) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText('');
    const words = text.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(words.slice(0, currentIndex).join(' '));
      if (currentIndex >= words.length) {
        clearInterval(interval);
        onFinishTyping?.();
      }
    }, typewriterSpeed);

    return () => clearInterval(interval);
  }, [text, typewriter, typewriterSpeed]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bubbleScale.value }],
    opacity: bubbleOpacity.value,
  }));

  return (
    <Animated.View style={[styles.bubble, compact && styles.bubbleCompact, animatedStyle]}>
      <View style={styles.tail} />
      <AppText
        variant={compact ? 'h4' : 'h3'}
        color={colors.deepNightBlue}
        style={compact ? styles.compactText : undefined}
      >
        {displayedText}
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.starlightWhite,
    borderWidth: 1,
    borderColor: colors.desertGold,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginHorizontal: spacing.xl,
    shadowColor: colors.deepNightBlueSubtle,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  bubbleCompact: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginHorizontal: 0,
  },
  compactText: {
    fontSize: 18,
    fontWeight: '700',
  },
  tail: {
    position: 'absolute',
    bottom: -8,
    end: 30,
    width: 14,
    height: 14,
    backgroundColor: colors.starlightWhite,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.desertGold,
    transform: [{ rotate: '45deg' }],
  },
});
