import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, spacing, typography } from '../../theme';
import { AppText } from '../ui/app-text';

interface TopStatusBarProps {
  displayName: string;
  avatarUrl?: string;
  hearts: number;
  maxHearts?: number;
  streak: number;
  xp: number;
}

export function TopStatusBar({
  displayName,
  hearts,
  maxHearts = 5,
  streak,
  xp,
}: TopStatusBarProps) {
  return (
    <BlurView intensity={80} tint="dark" style={styles.container}>
      <View style={styles.inner}>
        {/* Right side (RTL): Avatar + Name */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <AppText variant="bodyLarge" color={colors.starlightWhite}>
              {displayName.charAt(0)}
            </AppText>
          </View>
          <AppText
            variant="bodyLarge"
            color={colors.starlightWhite}
            numberOfLines={1}
            style={styles.name}
          >
            {displayName}
          </AppText>
        </View>

        {/* Left side (RTL): Stats */}
        <View style={styles.stats}>
          {/* XP */}
          <View style={styles.stat}>
            <AppText variant="caption" color={colors.desertGold}>
              XP
            </AppText>
            <AppText variant="caption" color={colors.starlightWhite} style={styles.statValue}>
              {xp}
            </AppText>
          </View>

          {/* Streak */}
          <View style={styles.stat}>
            <AppText variant="caption" color={colors.sunsetOrange}>
              🔥
            </AppText>
            <AppText variant="caption" color={colors.starlightWhite} style={styles.statValue}>
              {streak}
            </AppText>
          </View>

          {/* Hearts */}
          <View style={styles.stat}>
            <View style={styles.hearts}>
              {Array.from({ length: maxHearts }).map((_, i) => (
                <AppText
                  key={i}
                  variant="caption"
                  color={i < hearts ? colors.sunsetOrange : colors.mutedGray}
                >
                  {i < hearts ? '♥' : '♡'}
                </AppText>
              ))}
            </View>
          </View>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(212, 168, 67, 0.3)',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    paddingTop: spacing.xxxl + spacing.xl, // Safe area offset
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.royalPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    maxWidth: 120,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValue: {
    fontFamily: typography.h2.fontFamily,
  },
  hearts: {
    flexDirection: 'row',
    gap: 2,
  },
});
