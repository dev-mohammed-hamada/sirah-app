import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../ui/app-text';
import { colors, spacing, radius, shadows } from '../../theme';

interface SummaryCardProps {
  icon: string;
  value: string;
  label: string;
  gradientColors: readonly [string, string, ...string[]];
  index: number;
  numericValue?: number;
  /** Extra content rendered below the label */
  children?: React.ReactNode;
}

function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

export function SummaryCard({
  icon,
  value,
  label,
  gradientColors,
  index,
  numericValue,
  children,
}: SummaryCardProps) {
  const translateX = useSharedValue(120);
  const opacity = useSharedValue(0);
  const [displayText, setDisplayText] = useState(numericValue !== undefined ? '٠' : value);

  useEffect(() => {
    // Slide in from right with stagger
    const delay = index * 100;
    translateX.value = withDelay(
      delay,
      withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) }),
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) }),
    );
  }, [index]);

  // JS-based count-up animation for numeric values
  useEffect(() => {
    if (numericValue === undefined) {
      setDisplayText(value);
      return;
    }

    const target = numericValue;
    const duration = 600;
    const animDelay = index * 100 + 200; // After card settles
    const startTime = Date.now() + animDelay;
    let rafId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayText(toArabicNumeral(current));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [numericValue, value, index]);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.cardWrapper, slideStyle]}>
      <LinearGradient
        colors={gradientColors as unknown as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <AppText style={styles.icon}>{icon}</AppText>
        </View>
        <AppText style={styles.value} color={colors.starlightWhite}>
          {displayText}
        </AppText>
        <AppText style={styles.label} color="rgba(255, 248, 240, 0.8)">
          {label}
        </AppText>
        {children}
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: 140,
    height: 100,
    ...shadows.medium,
  },
  card: {
    flex: 1,
    borderRadius: radius.sm,
    padding: spacing.md,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    top: spacing.sm,
    end: spacing.sm,
  },
  icon: {
    fontSize: 20,
    textAlign: 'center',
  },
  value: {
    fontFamily: 'Cairo_900Black',
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'right',
  },
  label: {
    fontFamily: 'Cairo_400Regular',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
  },
});
