import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { colors, radius, shadows, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';
import type { FatherGoalsStackParamList } from '../../app/navigation/types';

// ─── Arabic numeral helper ─────────────────────────────────────────
function toAr(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
}

// ─── Types ─────────────────────────────────────────────────────────
type GoalStatus = 'active' | 'completed' | 'expired';

interface Goal {
  id: string;
  sonId: string;
  description: string;
  stagesCompleted: number;
  stagesTotal: number;
  deadline: string;
  daysLeft: number | null;
  reward: string;
  status: GoalStatus;
}

interface Son {
  id: string;
  displayName: string;
  initials: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────
const MOCK_SONS: Son[] = [
  { id: '1', displayName: 'محمد أحمد', initials: 'م' },
  { id: '2', displayName: 'عبدالله أحمد', initials: 'ع' },
];

const MOCK_GOALS: Goal[] = [
  {
    id: 'g1',
    sonId: '1',
    description: 'أكمل مراحل قصة الفيل',
    stagesCompleted: 4,
    stagesTotal: 6,
    deadline: '١٥ مارس ٢٠٢٦',
    daysLeft: 3,
    reward: '٢٠ ريال',
    status: 'active',
  },
  {
    id: 'g2',
    sonId: '1',
    description: 'أكمل المرحلة الأولى',
    stagesCompleted: 10,
    stagesTotal: 10,
    deadline: '١ فبراير ٢٠٢٦',
    daysLeft: null,
    reward: 'آيس كريم',
    status: 'completed',
  },
  {
    id: 'g3',
    sonId: '2',
    description: 'أكمل ٣ مراحل',
    stagesCompleted: 1,
    stagesTotal: 3,
    deadline: '١ يناير ٢٠٢٦',
    daysLeft: null,
    reward: 'رحلة ترفيهية',
    status: 'expired',
  },
  {
    id: 'g4',
    sonId: '2',
    description: 'أكمل مرحلة غار حراء',
    stagesCompleted: 0,
    stagesTotal: 1,
    deadline: '٣٠ مارس ٢٠٢٦',
    daysLeft: 18,
    reward: 'كتاب جديد',
    status: 'active',
  },
];

// ─── Filter tabs ───────────────────────────────────────────────────
type FilterKey = 'all' | 'active' | 'completed' | 'expired';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: ar.father.goals },
  { key: 'active', label: ar.father.activeGoals },
  { key: 'completed', label: ar.father.completedGoals },
  { key: 'expired', label: ar.father.expiredGoals },
];

function filterGoals(goals: Goal[], filter: FilterKey): Goal[] {
  if (filter === 'all') return goals;
  return goals.filter((g) => g.status === filter);
}

function getCountForFilter(goals: Goal[], filter: FilterKey): number {
  if (filter === 'all') return goals.length;
  return goals.filter((g) => g.status === filter).length;
}

// ─── Status colors ─────────────────────────────────────────────────
const STATUS_COLORS: Record<GoalStatus, { border: string; bgOpacity: string; text: string }> = {
  active: {
    border: colors.desertGold,
    bgOpacity: colors.desertGoldGlowSubtle,
    text: colors.desertGold,
  },
  completed: {
    border: colors.successGreen,
    bgOpacity: colors.successGreenBgMedium,
    text: colors.successGreen,
  },
  expired: {
    border: colors.errorRed,
    bgOpacity: colors.errorRedBgMedium,
    text: colors.errorRed,
  },
};

const STATUS_LABELS: Record<GoalStatus, string> = {
  active: ar.father.goalStatusActive,
  completed: ar.father.goalStatusCompleted,
  expired: ar.father.goalStatusExpired,
};

// ─── Progress Bar (animated) ───────────────────────────────────────
interface GoalProgressBarProps {
  completed: number;
  total: number;
  fillColor: string;
}

function GoalProgressBar({ completed, total, fillColor }: GoalProgressBarProps) {
  const progress = useSharedValue(0);
  const targetRatio = total > 0 ? completed / total : 0;

  useEffect(() => {
    progress.value = withTiming(targetRatio, { duration: 400 });
  }, [progress, targetRatio]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={progressStyles.track}>
      <Animated.View style={[progressStyles.fill, { backgroundColor: fillColor }, fillStyle]} />
    </View>
  );
}

const progressStyles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: colors.mutedGrayLight,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  fill: {
    height: '100%',
    borderRadius: radius.full,
  },
});

// ─── Active badge pulse animation ─────────────────────────────────
function ActiveBadge() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.5, { duration: 1500 }), withTiming(1, { duration: 1500 })),
      -1,
      false,
    );
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[badgeStyles.badge, { backgroundColor: STATUS_COLORS.active.bgOpacity }, animStyle]}
    >
      <AppText style={badgeStyles.text} color={STATUS_COLORS.active.text}>
        {STATUS_LABELS.active}
      </AppText>
    </Animated.View>
  );
}

// ─── Goal Card ─────────────────────────────────────────────────────
interface GoalCardProps {
  goal: Goal;
  index: number;
}

function GoalCard({ goal, index }: GoalCardProps) {
  const statusColor = STATUS_COLORS[goal.status];

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(300)}
      style={[cardStyles.card, { borderEndColor: statusColor.border }]}
    >
      {/* Status badge */}
      {goal.status === 'active' ? (
        <ActiveBadge />
      ) : (
        <View style={[badgeStyles.badge, { backgroundColor: statusColor.bgOpacity }]}>
          <AppText style={badgeStyles.text} color={statusColor.text}>
            {STATUS_LABELS[goal.status]}
          </AppText>
        </View>
      )}

      {/* Goal description */}
      <AppText style={cardStyles.description} color={colors.deepNightBlue}>
        {goal.description}
      </AppText>

      {/* Progress bar */}
      <GoalProgressBar
        completed={goal.stagesCompleted}
        total={goal.stagesTotal}
        fillColor={statusColor.border}
      />

      {/* Progress label */}
      <AppText style={cardStyles.progressLabel} color={colors.mutedGray}>
        {`${toAr(goal.stagesCompleted)} ${ar.father.stagesOf} ${toAr(goal.stagesTotal)} ${ar.father.stagesUnit}`}
      </AppText>

      {/* Meta row */}
      <View style={cardStyles.metaRow}>
        {goal.daysLeft !== null ? (
          <AppText style={cardStyles.metaText} color={colors.deepNightBlue}>
            {`⏰ ${goal.deadline} · ${ar.father.daysLeft.replace('{days}', toAr(goal.daysLeft))}`}
          </AppText>
        ) : (
          <AppText style={cardStyles.metaText} color={colors.deepNightBlue}>
            {`⏰ ${goal.deadline}`}
          </AppText>
        )}
        <AppText style={cardStyles.rewardText} color={colors.desertGold}>
          {`🏆 ${goal.reward}`}
        </AppText>
      </View>
    </Animated.View>
  );
}

const badgeStyles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.full,
    marginBottom: spacing.sm,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 16,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.warmSand,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderEndWidth: 3,
    ...shadows.soft,
    marginBottom: spacing.md,
  },
  description: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  },
  progressLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  metaText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
  },
  rewardText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
  },
});

// ─── Son Group Header ──────────────────────────────────────────────
interface SonGroupHeaderProps {
  son: Son;
}

function SonGroupHeader({ son }: SonGroupHeaderProps) {
  return (
    <View style={groupStyles.wrapper}>
      <View style={groupStyles.headerRow}>
        <View style={groupStyles.avatar}>
          <AppText style={groupStyles.initials} color={colors.deepNightBlue}>
            {son.initials}
          </AppText>
        </View>
        <AppText style={groupStyles.name} color={colors.deepNightBlue}>
          {son.displayName}
        </AppText>
      </View>
      <View style={groupStyles.divider} />
    </View>
  );
}

const groupStyles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.desertGoldGlowSubtle,
    borderWidth: 1,
    borderColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 18,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: colors.overlayLight,
    marginHorizontal: spacing.lg,
  },
});

// ─── Empty State ───────────────────────────────────────────────────
interface EmptyStateProps {
  onCreateGoal: () => void;
}

function EmptyState({ onCreateGoal }: EmptyStateProps) {
  const bounceY = useSharedValue(0);

  useEffect(() => {
    bounceY.value = withRepeat(
      withSequence(withTiming(-8, { duration: 1000 }), withTiming(0, { duration: 1000 })),
      -1,
      false,
    );
  }, [bounceY]);

  const trophyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceY.value }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(400)} style={emptyStyles.container}>
      {/* Trophy + narrator silhouette */}
      <Animated.View style={[emptyStyles.illustration, trophyStyle]}>
        {/* Trophy */}
        <View style={emptyStyles.trophyBase}>
          <View style={emptyStyles.trophyCup}>
            <AppText style={emptyStyles.trophyEmoji}>🏆</AppText>
          </View>
        </View>
        {/* Narrator silhouette — faceless, from behind */}
        <View style={emptyStyles.silhouetteWrapper}>
          <View style={emptyStyles.silhouetteHead} />
          <View style={emptyStyles.silhouetteBody} />
        </View>
      </Animated.View>

      <AppText style={emptyStyles.title} color={colors.deepNightBlue}>
        {ar.father.noGoalsYet}
      </AppText>
      <AppText style={emptyStyles.subtitle} color={colors.mutedGray}>
        {ar.father.noGoalsSubtitle}
      </AppText>
      <PrimaryButton
        title={ar.father.createFirstGoal}
        onPress={onCreateGoal}
        style={emptyStyles.button}
      />
    </Animated.View>
  );
}

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
    gap: spacing.lg,
  },
  illustration: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  trophyBase: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  trophyCup: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.desertGoldGlowSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyEmoji: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
  },
  silhouetteWrapper: {
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  silhouetteHead: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.deepNightBlueSubtle,
  },
  silhouetteBody: {
    width: 40,
    height: 48,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: colors.deepNightBlueSubtle,
    marginTop: 2,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.sm,
  },
});

// ─── Filter Tab ────────────────────────────────────────────────────
interface FilterTabProps {
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
}

function FilterTab({ label, count, active, onPress }: FilterTabProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tabStyles.tab, active ? tabStyles.tabActive : tabStyles.tabInactive]}
      activeOpacity={0.75}
    >
      <AppText
        style={[tabStyles.label, active ? tabStyles.labelActive : tabStyles.labelInactive]}
        color={active ? colors.deepNightBlue : colors.mutedGray}
      >
        {label}
      </AppText>
      {count > 0 && (
        <View style={[tabStyles.badge, active ? tabStyles.badgeActive : tabStyles.badgeInactive]}>
          <AppText
            style={tabStyles.badgeText}
            color={active ? colors.deepNightBlue : colors.mutedGray}
          >
            {toAr(count)}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const tabStyles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    gap: spacing.xs,
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: colors.desertGold,
    borderColor: colors.desertGold,
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderColor: colors.mutedGrayLight,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 20,
  },
  labelActive: {
    fontFamily: fontFamily.bold,
  },
  labelInactive: {},
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: {
    backgroundColor: colors.deepNightBlueBg,
  },
  badgeInactive: {
    backgroundColor: colors.mutedGrayLight,
  },
  badgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
  },
});

// ─── Props ─────────────────────────────────────────────────────────
interface GoalsScreenProps {
  navigation: NativeStackNavigationProp<FatherGoalsStackParamList, 'GoalsFatherView'>;
}

// ─── Goals Screen ──────────────────────────────────────────────────
export function GoalsScreen({ navigation }: GoalsScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const listKeyRef = useRef(0);
  const [listKey, setListKey] = useState(0);

  const handleFilterChange = (key: FilterKey) => {
    setActiveFilter(key);
    listKeyRef.current += 1;
    setListKey(listKeyRef.current);
  };

  const filteredGoals = filterGoals(MOCK_GOALS, activeFilter);

  // Group filtered goals by son
  const sonGroups = MOCK_SONS.map((son) => ({
    son,
    goals: filteredGoals.filter((g) => g.sonId === son.id),
  })).filter((group) => group.goals.length > 0);

  const hasGoals = filteredGoals.length > 0;

  const handleCreateGoal = () => {
    navigation.navigate('CreateGoal', { sonId: undefined });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerTitle} color={colors.deepNightBlue}>
          {ar.father.goals}
        </AppText>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={styles.filterScroll}
      >
        {FILTERS.map((f) => (
          <FilterTab
            key={f.key}
            label={f.label}
            count={getCountForFilter(MOCK_GOALS, f.key)}
            active={activeFilter === f.key}
            onPress={() => handleFilterChange(f.key)}
          />
        ))}
      </ScrollView>

      {/* Content */}
      {hasGoals ? (
        <ScrollView
          key={listKey}
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
          showsVerticalScrollIndicator={false}
        >
          {sonGroups.map(({ son, goals }) => (
            <View key={son.id}>
              <SonGroupHeader son={son} />
              <View style={styles.goalsList}>
                {goals.map((goal, index) => (
                  <GoalCard key={goal.id} goal={goal} index={index} />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <EmptyState onCreateGoal={handleCreateGoal} />
      )}

      {/* Sticky Create Button */}
      {hasGoals && (
        <View style={[styles.ctaBar, { paddingBottom: insets.bottom + spacing.lg }]}>
          <PrimaryButton title={ar.father.createNewGoalBtn} onPress={handleCreateGoal} />
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.mutedGrayLight,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.sm,
  },
  goalsList: {
    paddingHorizontal: spacing.lg,
  },
  ctaBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.mutedGrayLight,
    backgroundColor: colors.softCream,
  },
});
