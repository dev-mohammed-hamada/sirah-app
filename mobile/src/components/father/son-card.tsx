import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { AppText } from '../ui/app-text';
import { colors, radius, shadows, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';

// ─── Arabic numeral helper ────────────────────────────────────────
function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

// ─── Types ────────────────────────────────────────────────────────
export interface SonCardProps {
  displayName: string;
  username: string;
  streak: number;
  stars: number;
  xp: number;
  stagesCompleted: number;
  totalStages: number;
  isActiveToday: boolean;
  lastActiveText?: string;
  onPress: () => void;
  enterDelay?: number;
}

// ─── Pulse dot ────────────────────────────────────────────────────
function PulseDot() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.3, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1,
      false,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.activeDot, animatedStyle]} />;
}

// ─── Son Card ─────────────────────────────────────────────────────
export function SonCard({
  displayName,
  username,
  streak,
  stars,
  xp,
  stagesCompleted,
  totalStages,
  isActiveToday,
  lastActiveText,
  onPress,
  enterDelay = 0,
}: SonCardProps) {
  const initials = displayName.trim().charAt(0);
  const progressRatio = totalStages > 0 ? stagesCompleted / totalStages : 0;

  return (
    <Animated.View entering={FadeInRight.duration(300).delay(enterDelay)}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        {/* Row 1: Avatar + name/username */}
        <View style={styles.topRow}>
          <View style={styles.avatarCircle}>
            <AppText style={styles.avatarInitials} color={colors.deepNightBlue}>
              {initials}
            </AppText>
          </View>
          <View style={styles.nameColumn}>
            <AppText style={styles.displayName} color={colors.deepNightBlue}>
              {displayName}
            </AppText>
            <AppText style={styles.username} color={colors.mutedGray}>
              {'@' + username}
            </AppText>
          </View>
        </View>

        {/* Row 2: Quick stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText style={styles.statText} color={colors.deepNightBlue}>
              {'🔥 ' + toArabicNumeral(streak) + ' ' + ar.father.streak}
            </AppText>
          </View>
          <View style={styles.statItem}>
            <AppText style={styles.statText} color={colors.deepNightBlue}>
              {'⭐ ' + toArabicNumeral(stars)}
            </AppText>
          </View>
          <View style={styles.statItem}>
            <AppText style={styles.statText} color={colors.deepNightBlue}>
              {'📊 ' + toArabicNumeral(xp)}
            </AppText>
          </View>
        </View>

        {/* Row 3: Last active indicator */}
        <View style={styles.activeRow}>
          {isActiveToday ? (
            <>
              <PulseDot />
              <AppText style={styles.activeText} color={colors.successGreen}>
                {ar.father.activeToday}
              </AppText>
            </>
          ) : (
            <>
              <View style={styles.inactiveDot} />
              <AppText style={styles.inactiveText} color={colors.mutedGray}>
                {lastActiveText ?? ar.father.lastActive}
              </AppText>
            </>
          )}
        </View>

        {/* Row 4: Progress bar + label */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressRatio * 100}%` }]} />
          </View>
          <AppText style={styles.progressLabel} color={colors.mutedGray}>
            {toArabicNumeral(stagesCompleted) +
              '/' +
              toArabicNumeral(totalStages) +
              ' ' +
              ar.father.stages}
          </AppText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.warmSand,
    borderRadius: radius.md,
    ...shadows.soft,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.desertGoldGlowSubtle,
    borderWidth: 2,
    borderColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
  },
  nameColumn: {
    flex: 1,
    gap: spacing.xs,
  },
  displayName: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  },
  username: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  activeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.successGreen,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.mutedGray,
  },
  activeText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
  },
  inactiveText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
  },
  progressContainer: {
    gap: spacing.xs,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.mutedGrayLight,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.desertGold,
  },
  progressLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'right',
  },
});
