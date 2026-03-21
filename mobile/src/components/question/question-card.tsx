import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../ui/app-text';

interface QuestionCardProps {
  questionText: string;
}

export function QuestionCard({ questionText }: QuestionCardProps) {
  return (
    <Animated.View
      entering={SlideInDown.springify().damping(18).stiffness(200)}
      style={styles.card}
    >
      {/* Narrator mini-avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
        </View>
        <View style={styles.avatarTail} />
      </View>

      {/* Question text */}
      <AppText style={styles.questionText}>{questionText}</AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.warmSand,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.lg,
    ...shadows.medium,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.deepNightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.warmSand,
    position: 'absolute',
    top: 6,
  },
  avatarBody: {
    width: 22,
    height: 14,
    borderTopStartRadius: 11,
    borderTopEndRadius: 11,
    backgroundColor: colors.warmSand,
    position: 'absolute',
    bottom: 2,
  },
  avatarTail: {
    width: 0,
    height: 0,
    borderStartWidth: 6,
    borderEndWidth: 6,
    borderTopWidth: 6,
    borderStartColor: 'transparent',
    borderEndColor: 'transparent',
    borderTopColor: colors.deepNightBlue,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.deepNightBlue,
    textAlign: 'center',
    lineHeight: 30,
  },
});
