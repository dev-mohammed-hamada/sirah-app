import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, radius } from '../../theme';
import { AppText } from '../ui/app-text';
import { HeartsDisplay } from '../hearts/hearts-display';
import { RefillCountdown } from '../hearts/refill-countdown';

interface StatusBarProps {
  displayName: string;
  hearts: number;
  maxHearts?: number;
  heartsFull?: boolean;
  streak: number;
  xp: number;
}

export function JourneyStatusBar({
  displayName,
  hearts,
  maxHearts = 5,
  heartsFull = true,
  streak,
  xp,
}: StatusBarProps) {
  return (
    <View style={styles.container}>
      {/* Profile section */}
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <AppText style={styles.avatarText}>{displayName.charAt(0)}</AppText>
        </View>
        <AppText style={styles.name}>{displayName}</AppText>
      </View>

      {/* Stats section */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <AppText style={styles.statIcon}>{'\uD83D\uDD25'}</AppText>
          <AppText style={[styles.statValue, { color: colors.sunsetOrange }]}>{streak}</AppText>
        </View>
        <View style={styles.heartsStat}>
          <HeartsDisplay hearts={hearts} maxHearts={maxHearts} size={13} animate={true} />
          {!heartsFull && <RefillCountdown compact />}
        </View>
        <View style={styles.stat}>
          <AppText style={styles.statIcon}>{'\uD83D\uDEE1\uFE0F'}</AppText>
          <AppText style={[styles.statValue, { color: colors.desertGold }]}>{xp}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.deepNightBlueHeavy,
    paddingVertical: spacing.sm,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    marginHorizontal: spacing.md,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.desertGold,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.starlightWhite,
    textAlign: 'right',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  heartsStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 13,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
