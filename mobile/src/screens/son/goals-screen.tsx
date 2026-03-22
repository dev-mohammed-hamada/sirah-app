import React, { useCallback, useState } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, spacing } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { NarratorSilhouette } from '../../components/narrator';
import { GoalCard } from '../../components/goals';
import type { Goal } from '../../components/goals';
import { ar } from '../../i18n/ar';

// ─── Mock Data ───────────────────────────────────────────────────
const MOCK_ACTIVE_GOALS: Goal[] = [
  {
    id: '1',
    description: 'أكمل مراحل قصة الفيل',
    completedStages: 4,
    totalStages: 6,
    daysRemaining: 3,
    reward: '٢٠ ريال',
    source: 'أبي',
    isCompleted: false,
    stages: [
      { id: 's1', title: 'عام الفيل', completed: true },
      { id: 's2', title: 'المولد النبوي', completed: true },
      { id: 's3', title: 'الطفولة', completed: true },
      { id: 's4', title: 'الشباب', completed: true },
      { id: 's5', title: 'غار حراء', completed: false },
      { id: 's6', title: 'الوحي الأول', completed: false },
    ],
  },
  {
    id: '2',
    description: 'أكمل ٥ مراحل',
    completedStages: 3,
    totalStages: 5,
    daysRemaining: 7,
    reward: 'لعبة',
    source: 'أبي',
    isCompleted: false,
    stages: [
      { id: 's1', title: 'عام الفيل', completed: true },
      { id: 's2', title: 'المولد النبوي', completed: true },
      { id: 's3', title: 'الطفولة', completed: true },
      { id: 's4', title: 'الشباب', completed: false },
      { id: 's5', title: 'غار حراء', completed: false },
    ],
  },
];

const MOCK_COMPLETED_GOALS: Goal[] = [
  {
    id: '3',
    description: 'أكمل المرحلة الأولى',
    completedStages: 1,
    totalStages: 1,
    daysRemaining: 0,
    reward: 'آيس كريم',
    source: 'أبي',
    isCompleted: true,
    completedDate: '١٤٤٧/٣/١٥',
    stages: [{ id: 's1', title: 'عام الفيل', completed: true }],
  },
];

// ─── Empty State ─────────────────────────────────────────────────
function EmptyState() {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={emptyStyles.container}>
      <NarratorSilhouette scale={1.5} />
      <AppText variant="bodyLarge" color={colors.mutedGray} style={emptyStyles.title}>
        {ar.goals.noGoalsSon}
      </AppText>
      <AppText variant="body" color={colors.mutedGray} style={emptyStyles.subtitle}>
        {ar.goals.noGoalsSonDesc}
      </AppText>
    </Animated.View>
  );
}

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
    gap: spacing.md,
  },
  title: {
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.6,
  },
});

// ─── Goals Screen ────────────────────────────────────────────────
export function GoalsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeGoals] = useState<Goal[]>(MOCK_ACTIVE_GOALS);
  const [completedGoals] = useState<Goal[]>(MOCK_COMPLETED_GOALS);

  const hasGoals = activeGoals.length > 0 || completedGoals.length > 0;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // TODO: Fetch goals from API
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {hasGoals ? (
        <Animated.ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.desertGold}
            />
          }
        >
          {/* Header */}
          <AppText variant="h2" color={colors.deepNightBlue} style={styles.header}>
            {ar.goals.myGoals}
          </AppText>

          {/* Active Goals Section */}
          {activeGoals.length > 0 && (
            <View style={styles.section}>
              <AppText variant="h4" color={colors.deepNightBlue} style={styles.sectionLabel}>
                {ar.goals.activeGoals}
              </AppText>
              <View style={styles.cardList}>
                {activeGoals.map((goal, index) => (
                  <GoalCard key={goal.id} goal={goal} index={index} />
                ))}
              </View>
            </View>
          )}

          {/* Completed Goals Section */}
          {completedGoals.length > 0 && (
            <View style={styles.section}>
              <AppText variant="h4" color={colors.deepNightBlue} style={styles.sectionLabel}>
                {ar.goals.completedGoals}
              </AppText>
              <View style={styles.cardList}>
                {completedGoals.map((goal, index) => (
                  <GoalCard key={goal.id} goal={goal} index={index + activeGoals.length} />
                ))}
              </View>
            </View>
          )}
        </Animated.ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          {/* Header still shown */}
          <AppText variant="h2" color={colors.deepNightBlue} style={styles.header}>
            {ar.goals.myGoals}
          </AppText>
          <EmptyState />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxxl,
  },
  emptyContainer: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  section: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  sectionLabel: {
    textAlign: 'right',
    marginBottom: spacing.md,
  },
  cardList: {
    gap: spacing.md,
  },
});
