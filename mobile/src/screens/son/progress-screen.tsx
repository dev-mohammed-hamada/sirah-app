import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, gradients } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { SummaryCard } from '../../components/progress/summary-card';
import { StageProgressRow } from '../../components/progress/stage-progress-row';
import { WeeklyChart } from '../../components/progress/weekly-chart';
import { ar } from '../../i18n/ar';
import { toAr as toArabicNumeral } from '../../utils/arabic-numerals';

// ─── Mock Data ───────────────────────────────────────────────────
const MOCK_TOTAL_XP = 340;
const MOCK_STREAK = 7;
const MOCK_TOTAL_STARS = 18;
const MOCK_MAX_STARS = 30;

const MOCK_STREAK_DAYS = [true, true, true, false, true, true, true];

const MOCK_STAGES = [
  { id: '1', title: 'عام الفيل', status: 'completed' as const, starsEarned: 3, bestScore: 95 },
  { id: '2', title: 'المولد النبوي', status: 'completed' as const, starsEarned: 2, bestScore: 78 },
  { id: '3', title: 'الطفولة', status: 'completed' as const, starsEarned: 3, bestScore: 88 },
  { id: '4', title: 'الشباب', status: 'current' as const, starsEarned: 0 },
  { id: '5', title: 'غار حراء', status: 'locked' as const, starsEarned: 0 },
  { id: '6', title: 'الوحي الأول', status: 'locked' as const, starsEarned: 0 },
  { id: '7', title: 'الدعوة السرية', status: 'locked' as const, starsEarned: 0 },
  { id: '8', title: 'الجهر بالدعوة', status: 'locked' as const, starsEarned: 0 },
  { id: '9', title: 'الهجرة الأولى', status: 'locked' as const, starsEarned: 0 },
  { id: '10', title: 'عام الحزن', status: 'locked' as const, starsEarned: 0 },
];

const ARABIC_DAY_LABELS = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];

const MOCK_WEEKLY_DATA = [
  { label: ARABIC_DAY_LABELS[0], xp: 45, isToday: false },
  { label: ARABIC_DAY_LABELS[1], xp: 0, isToday: false },
  { label: ARABIC_DAY_LABELS[2], xp: 30, isToday: false },
  { label: ARABIC_DAY_LABELS[3], xp: 60, isToday: false },
  { label: ARABIC_DAY_LABELS[4], xp: 25, isToday: false },
  { label: ARABIC_DAY_LABELS[5], xp: 50, isToday: true },
  { label: ARABIC_DAY_LABELS[6], xp: 0, isToday: false },
];

// ─── Gradient Colors (from theme) ────────────────────────────────
const XP_GRADIENT: [string, string] = [...gradients.xpCard.colors] as [string, string];
const STREAK_GRADIENT: [string, string] = [...gradients.streakCard.colors] as [string, string];
const STARS_GRADIENT: [string, string] = [...gradients.starsCard.colors] as [string, string];

export function ProgressScreen() {
  const handleStagePress = (stageId: string) => {
    // TODO: Navigate to StageDetail when navigation is wired
    // navigation.navigate('StageDetail', { stageId });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <AppText variant="h2" color={colors.deepNightBlue} style={styles.header}>
          {ar.progress.title}
        </AppText>

        {/* Summary Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
          style={styles.cardsScroll}
        >
          <SummaryCard
            icon="🛡️"
            value={toArabicNumeral(MOCK_TOTAL_XP)}
            label={ar.progress.totalXp}
            gradientColors={XP_GRADIENT}
            index={0}
            numericValue={MOCK_TOTAL_XP}
          />
          <SummaryCard
            icon="🔥"
            value={toArabicNumeral(MOCK_STREAK)}
            label={ar.progress.currentStreak}
            gradientColors={STREAK_GRADIENT}
            index={1}
            numericValue={MOCK_STREAK}
          >
            <StreakDots days={MOCK_STREAK_DAYS} />
          </SummaryCard>
          <SummaryCard
            icon="⭐"
            value={`${toArabicNumeral(MOCK_TOTAL_STARS)}/${toArabicNumeral(MOCK_MAX_STARS)}`}
            label={ar.progress.totalStars}
            gradientColors={STARS_GRADIENT}
            index={2}
          />
        </ScrollView>

        {/* Stage Progress List */}
        <AppText variant="h3" color={colors.deepNightBlue} style={styles.sectionHeader}>
          {ar.progress.stages}
        </AppText>
        <View style={styles.stageList}>
          {MOCK_STAGES.map((stage, i) => (
            <StageProgressRow
              key={stage.id}
              stageNumber={i + 1}
              title={stage.title}
              status={stage.status}
              starsEarned={stage.starsEarned}
              bestScore={stage.bestScore}
              index={i}
              onPress={() => handleStagePress(stage.id)}
            />
          ))}
        </View>

        {/* Weekly Activity Chart */}
        <AppText variant="h3" color={colors.deepNightBlue} style={styles.sectionHeader}>
          {ar.progress.weeklyActivity}
        </AppText>
        <WeeklyChart data={MOCK_WEEKLY_DATA} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Streak Dots Component ───────────────────────────────────────
function StreakDots({ days }: { days: boolean[] }) {
  return (
    <View style={styles.dotsRow}>
      {days.map((active, i) => (
        <View key={i} style={[styles.dot, active ? styles.dotActive : styles.dotInactive]} />
      ))}
    </View>
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
  header: {
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  cardsScroll: {
    flexGrow: 0,
  },
  cardsRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
    textAlign: 'right',
  },
  stageList: {
    paddingHorizontal: spacing.sm,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: colors.starlightWhite,
  },
  dotInactive: {
    backgroundColor: colors.starlightWhiteFaint,
  },
});
