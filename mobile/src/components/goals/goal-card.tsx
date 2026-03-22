import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  SlideInDown,
} from 'react-native-reanimated';
import { colors, spacing, radius, shadows, fontFamily } from '../../theme';
import { AppText } from '../ui/app-text';
import { ar } from '../../i18n/ar';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── Arabic number helper ────────────────────────────────────────
function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

// ─── Types ───────────────────────────────────────────────────────
export interface GoalStage {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  description: string;
  completedStages: number;
  totalStages: number;
  daysRemaining: number;
  reward: string;
  source: string;
  isCompleted: boolean;
  completedDate?: string;
  stages: GoalStage[];
}

interface GoalCardProps {
  goal: Goal;
  index: number;
}

// ─── Animated Progress Bar ───────────────────────────────────────
function AnimatedProgressBar({ progress }: { progress: number }) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View style={progressStyles.track}>
      <Animated.View style={[progressStyles.fill, fillStyle]} />
    </View>
  );
}

const progressStyles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.sandTrack,
    overflow: 'hidden',
    flex: 1,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.desertGold,
  },
});

// ─── Urgent Pulse Text ───────────────────────────────────────────
function UrgentDeadlineText({ daysRemaining }: { daysRemaining: number }) {
  const opacity = useSharedValue(1);
  const isUrgent = daysRemaining <= 3;

  useEffect(() => {
    if (isUrgent) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [isUrgent]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: isUrgent ? opacity.value : 1,
  }));

  const textColor = isUrgent ? colors.sunsetOrange : colors.mutedGray;

  return (
    <Animated.View style={animatedStyle}>
      <AppText variant="body" color={textColor}>
        {ar.goals.deadlinePrefix} {toArabicNumeral(daysRemaining)} {ar.goals.deadlineSuffix}
      </AppText>
    </Animated.View>
  );
}

// ─── Stage List (Accordion Content) ─────────────────────────────
function StageList({ stages }: { stages: GoalStage[] }) {
  return (
    <View style={stageListStyles.container}>
      {stages.map((stage) => (
        <View key={stage.id} style={stageListStyles.row}>
          <AppText
            variant="caption"
            color={stage.completed ? colors.successGreen : colors.mutedGray}
          >
            {stage.completed ? '✓' : '○'}
          </AppText>
          <AppText
            variant="caption"
            color={stage.completed ? colors.successGreen : colors.deepNightBlue}
            style={stageListStyles.stageTitle}
          >
            {stage.title}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const stageListStyles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.sandTrack,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  stageTitle: {
    flex: 1,
  },
});

// ─── Goal Card Component ─────────────────────────────────────────
export function GoalCard({ goal, index }: GoalCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  const progress = goal.totalStages > 0 ? goal.completedStages / goal.totalStages : 0;
  const borderColor = goal.isCompleted ? colors.successGreen : colors.desertGold;
  const staggerDelay = index * 100;

  return (
    <Animated.View
      entering={SlideInDown.delay(staggerDelay).duration(150).springify().damping(15)}
      style={[
        cardStyles.card,
        { borderEndWidth: 3, borderEndColor: borderColor },
        goal.isCompleted && cardStyles.completedCard,
      ]}
    >
      <Pressable onPress={handlePress} android_ripple={{ color: colors.sandTrack }}>
        {/* Completed Badge */}
        {goal.isCompleted && (
          <View style={cardStyles.badge}>
            <AppText variant="small" color={colors.starlightWhite} style={cardStyles.badgeText}>
              {ar.goals.completedBadge}
            </AppText>
          </View>
        )}

        {/* Description */}
        <AppText
          variant="bodyLarge"
          color={colors.deepNightBlue}
          style={{ fontFamily: fontFamily.bold }}
        >
          {goal.description}
        </AppText>

        {/* Progress Bar */}
        <View style={cardStyles.progressRow}>
          <AnimatedProgressBar progress={progress} />
          <AppText variant="caption" color={colors.mutedGray} style={cardStyles.progressLabel}>
            {toArabicNumeral(goal.completedStages)} {ar.goals.of}{' '}
            {toArabicNumeral(goal.totalStages)} {ar.goals.stages}
          </AppText>
        </View>

        {/* Bottom Row: Deadline + Reward */}
        <View style={cardStyles.bottomRow}>
          {!goal.isCompleted ? (
            <UrgentDeadlineText daysRemaining={goal.daysRemaining} />
          ) : (
            <AppText variant="body" color={colors.mutedGray}>
              {goal.completedDate ?? ''}
            </AppText>
          )}
          <AppText variant="body" color={colors.desertGold}>
            {ar.goals.rewardIcon} {goal.reward}
          </AppText>
        </View>

        {/* Source */}
        <AppText variant="caption" color={colors.mutedGray} style={cardStyles.source}>
          {ar.goals.from} {goal.source}
        </AppText>

        {/* Accordion: Stage List */}
        {expanded && <StageList stages={goal.stages} />}
      </Pressable>
    </Animated.View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.warmSand,
    borderRadius: radius.md,
    padding: spacing.lg,
    ...shadows.soft,
  },
  completedCard: {
    opacity: 0.9,
  },
  badge: {
    alignSelf: 'flex-end',
    backgroundColor: colors.successGreen,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  progressLabel: {
    minWidth: 80,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  source: {
    marginTop: spacing.sm,
  },
});
