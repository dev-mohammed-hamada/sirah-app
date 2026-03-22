import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { AppText } from '../ui/app-text';
import { colors, spacing, radius, fontFamily } from '../../theme';
import { ar } from '../../i18n/ar';

export type StageProgressStatus = 'completed' | 'current' | 'locked';

interface StageProgressRowProps {
  stageNumber: number;
  title: string;
  status: StageProgressStatus;
  starsEarned?: number;
  bestScore?: number;
  index: number;
  onPress?: () => void;
}

function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

export function StageProgressRow({
  stageNumber,
  title,
  status,
  starsEarned = 0,
  bestScore,
  index,
  onPress,
}: StageProgressRowProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);
  const glowOpacity = useSharedValue(0.1);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    // Fade in with stagger
    const delay = index * 50;
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 150, easing: Easing.out(Easing.ease) }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: 150, easing: Easing.out(Easing.ease) }),
    );

    // Glow pulse for current stage
    if (status === 'current') {
      glowOpacity.value = withRepeat(
        withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    }
  }, [index, status]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    backgroundColor:
      status === 'current' ? `rgba(212, 168, 67, ${glowOpacity.value})` : 'transparent',
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const handlePress = () => {
    if (status === 'locked') {
      // Subtle shake
      shakeX.value = withTiming(5, { duration: 50 }, () => {
        shakeX.value = withTiming(-5, { duration: 50 }, () => {
          shakeX.value = withTiming(3, { duration: 50 }, () => {
            shakeX.value = withTiming(0, { duration: 50 });
          });
        });
      });
      return;
    }
    onPress?.();
  };

  const maxStars = 3;

  return (
    <Animated.View style={fadeStyle}>
      <Pressable onPress={handlePress}>
        <Animated.View style={[styles.row, glowStyle]}>
          <Animated.View style={[styles.content, shakeStyle]}>
            {/* Stage number circle */}
            <View
              style={[
                styles.numberCircle,
                status === 'completed' && styles.numberCircleCompleted,
                status === 'current' && styles.numberCircleCurrent,
                status === 'locked' && styles.numberCircleLocked,
              ]}
            >
              <AppText
                style={styles.numberText}
                color={status === 'locked' ? colors.mutedGray : colors.starlightWhite}
              >
                {toArabicNumeral(stageNumber)}
              </AppText>
            </View>

            {/* Title area */}
            <View style={[styles.titleArea, status === 'locked' && styles.locked]}>
              <AppText
                variant="bodyLarge"
                color={status === 'locked' ? colors.mutedGray : colors.deepNightBlue}
              >
                {title}
              </AppText>
              {status === 'current' && (
                <View style={styles.nowBadge}>
                  <AppText style={styles.nowBadgeText} color={colors.starlightWhite}>
                    {ar.home.stageCurrent}
                  </AppText>
                </View>
              )}
            </View>

            {/* Stars / Lock */}
            <View style={styles.endArea}>
              {status === 'locked' ? (
                <AppText style={styles.lockIcon}>🔒</AppText>
              ) : status === 'completed' ? (
                <>
                  <View style={styles.starsRow}>
                    {Array.from({ length: maxStars }).map((_, i) => (
                      <AppText key={i} style={[styles.star, i >= starsEarned && styles.starEmpty]}>
                        {i < starsEarned ? '⭐' : '☆'}
                      </AppText>
                    ))}
                  </View>
                  {bestScore !== undefined && (
                    <AppText variant="caption" color={colors.mutedGray}>
                      {toArabicNumeral(bestScore)}/١٠٠
                    </AppText>
                  )}
                </>
              ) : null}
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.mutedGrayLight,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  numberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberCircleCompleted: {
    backgroundColor: colors.desertGold,
  },
  numberCircleCurrent: {
    backgroundColor: colors.desertGold,
  },
  numberCircleLocked: {
    backgroundColor: colors.mutedGrayLight,
  },
  numberText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    textAlign: 'center',
  },
  titleArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  locked: {
    opacity: 0.5,
  },
  nowBadge: {
    backgroundColor: colors.desertGold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  nowBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    textAlign: 'center',
  },
  endArea: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  star: {
    fontSize: 12,
    textAlign: 'center',
  },
  starEmpty: {
    opacity: 0.3,
  },
  lockIcon: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.5,
  },
});
