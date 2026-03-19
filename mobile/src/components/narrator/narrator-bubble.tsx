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
}

export function NarratorBubble({
  text,
  typewriter = true,
  typewriterSpeed = 40,
  onFinishTyping,
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
    <Animated.View style={[styles.bubble, animatedStyle]}>
      <View style={styles.tail} />
      <AppText variant="h3" color={colors.deepNightBlue}>
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
    borderRadius: radius.md,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
  },
  tail: {
    position: 'absolute',
    bottom: -8,
    end: 24,
    width: 16,
    height: 16,
    backgroundColor: colors.starlightWhite,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.desertGold,
    transform: [{ rotate: '45deg' }],
  },
});
