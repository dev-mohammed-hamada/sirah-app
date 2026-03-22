import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { colors, gradients, radius, shadows, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';

// ─── Arabic numeral helper ────────────────────────────────────────
function toAr(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
}

// ─── Mock data ────────────────────────────────────────────────────
const MOCK_SON = {
  displayName: 'محمد أحمد',
  username: 'mohammed_123',
  xp: 340,
  streak: 7,
  stars: 18,
  stagesCompleted: 4,
  totalStages: 10,
} as const;

const MOCK_STAGES = [
  { id: 1, title: 'عام الفيل', completed: true, stars: 3, score: 95 },
  { id: 2, title: 'المولد النبوي', completed: true, stars: 2, score: 78 },
  { id: 3, title: 'الطفولة المباركة', completed: true, stars: 3, score: 88 },
  { id: 4, title: 'الشباب والأمانة', completed: true, stars: 1, score: 52 },
  { id: 5, title: 'غار حراء', completed: false, stars: 0, score: 0 },
  { id: 6, title: 'بدء الوحي', completed: false, stars: 0, score: 0 },
  { id: 7, title: 'الدعوة السرية', completed: false, stars: 0, score: 0 },
  { id: 8, title: 'الإسراء والمعراج', completed: false, stars: 0, score: 0 },
  { id: 9, title: 'الهجرة إلى المدينة', completed: false, stars: 0, score: 0 },
  { id: 10, title: 'غزوة بدر', completed: false, stars: 0, score: 0 },
] as const;

const MOCK_ACTIVITY = [
  { id: 1, icon: '⭐', text: 'أكمل المرحلة ٤ — ⭐', time: ar.father.hoursAgo },
  { id: 2, icon: '⚡', text: 'أكمل تحدي اليوم — +١٥ نقطة', time: ar.father.fiveHoursAgo },
  { id: 3, icon: '🔥', text: 'حقق سلسلة ٧ أيام', time: ar.father.yesterday },
  { id: 4, icon: '⭐', text: 'أكمل المرحلة ٣ — ⭐⭐⭐', time: ar.father.twoDaysAgo },
] as const;

// ─── Stat circle component ────────────────────────────────────────
interface StatCircleProps {
  value: number;
  label: string;
  gradientColors: [string, string, ...string[]];
  gradientStart: { x: number; y: number };
  gradientEnd: { x: number; y: number };
  enterDelay: number;
}

function StatCircle({
  value,
  label,
  gradientColors,
  gradientStart,
  gradientEnd,
  enterDelay,
}: StatCircleProps) {
  const scale = useSharedValue(0);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    scale.value = withDelay(enterDelay, withSpring(1, { damping: 12, stiffness: 180 }));
  }, [scale, enterDelay]);

  useEffect(() => {
    const duration = 400;
    const delayMs = enterDelay + 150;
    const startTime = Date.now() + delayMs;
    let rafId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [value, enterDelay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[circleStyles.wrapper, animatedStyle]}>
      <LinearGradient
        colors={gradientColors}
        start={gradientStart}
        end={gradientEnd}
        style={circleStyles.circle}
      >
        <AppText style={circleStyles.value} color={colors.starlightWhite}>
          {toAr(displayed)}
        </AppText>
      </LinearGradient>
      <AppText style={circleStyles.label} color={colors.mutedGray}>
        {label}
      </AppText>
    </Animated.View>
  );
}

const circleStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  value: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    maxWidth: 64,
  },
});

// ─── Progress bar ─────────────────────────────────────────────────
interface ProgressBarProps {
  completed: number;
  total: number;
}

function ProgressBar({ completed, total }: ProgressBarProps) {
  const progress = useSharedValue(0);
  const targetWidth = completed / total;

  useEffect(() => {
    progress.value = withTiming(targetWidth, { duration: 600 });
  }, [progress, targetWidth]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={progressStyles.container}>
      <View style={progressStyles.labelRow}>
        <AppText style={progressStyles.label} color={colors.mutedGray}>
          {`${toAr(completed)} ${ar.father.stagesOf} ${toAr(total)} ${ar.father.stagesLabel}`}
        </AppText>
      </View>
      <View style={progressStyles.track}>
        <Animated.View style={[progressStyles.fill, fillStyle]} />
      </View>
    </View>
  );
}

const progressStyles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  labelRow: {
    alignItems: 'flex-end',
    marginBottom: spacing.xs,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
  },
  track: {
    height: 8,
    backgroundColor: colors.mutedGrayLight,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.desertGold,
    borderRadius: radius.full,
  },
});

// ─── Stage row ────────────────────────────────────────────────────
interface StageRowProps {
  id: number;
  title: string;
  completed: boolean;
  stars: number;
  score: number;
  index: number;
}

function StageRow({ id, title, completed, stars, score, index }: StageRowProps) {
  const filledStars = Array.from({ length: 3 }, (_, i) => (i < stars ? '⭐' : '☆'));

  return (
    <Animated.View entering={FadeIn.delay(index * 50).duration(300)} style={stageRowStyles.row}>
      {/* Stars / status on start side (end in RTL = visual start) */}
      <View style={stageRowStyles.starsContainer}>
        {completed ? (
          <View style={stageRowStyles.starsCol}>
            <AppText style={stageRowStyles.stars}>{filledStars.join('')}</AppText>
            <AppText style={stageRowStyles.score} color={colors.mutedGray}>
              {toAr(score)}/١٠٠
            </AppText>
          </View>
        ) : (
          <AppText style={stageRowStyles.notStarted} color={colors.mutedGray}>
            {ar.father.notStarted}
          </AppText>
        )}
      </View>

      {/* Title */}
      <AppText
        style={[stageRowStyles.title, !completed && stageRowStyles.titleDim]}
        color={colors.deepNightBlue}
        numberOfLines={1}
      >
        {title}
      </AppText>

      {/* Number circle on end side */}
      <View
        style={[
          stageRowStyles.numCircle,
          completed ? stageRowStyles.numCircleDone : stageRowStyles.numCircleIdle,
        ]}
      >
        <AppText
          style={stageRowStyles.numText}
          color={completed ? colors.starlightWhite : colors.mutedGray}
        >
          {toAr(id)}
        </AppText>
      </View>
    </Animated.View>
  );
}

const stageRowStyles = StyleSheet.create({
  row: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.mutedGrayLight,
    gap: spacing.sm,
  },
  numCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  numCircleDone: {
    backgroundColor: colors.desertGold,
  },
  numCircleIdle: {
    backgroundColor: colors.mutedGrayLight,
  },
  numText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  title: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'right',
  },
  titleDim: {
    opacity: 0.5,
  },
  starsContainer: {
    flexShrink: 0,
  },
  starsCol: {
    alignItems: 'flex-start',
  },
  stars: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  score: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  notStarted: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
  },
});

// ─── Activity timeline ────────────────────────────────────────────
interface ActivityItem {
  id: number;
  icon: string;
  text: string;
  time: string;
}

interface TimelineProps {
  items: readonly ActivityItem[];
}

function ActivityTimeline({ items }: TimelineProps) {
  return (
    <View style={timelineStyles.container}>
      {items.map((item, index) => (
        <Animated.View
          key={item.id}
          entering={FadeInRight.delay(index * 150).duration(300)}
          style={timelineStyles.item}
        >
          {/* Vertical line + dot on end side */}
          <View style={timelineStyles.lineCol}>
            {index < items.length - 1 && <View style={timelineStyles.line} />}
            <View style={timelineStyles.dot} />
          </View>

          {/* Content */}
          <View style={timelineStyles.content}>
            <AppText style={timelineStyles.eventText} color={colors.deepNightBlue}>
              {item.text}
            </AppText>
            <AppText style={timelineStyles.timestamp} color={colors.mutedGray}>
              {item.time}
            </AppText>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const timelineStyles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    minHeight: 56,
    gap: spacing.md,
  },
  lineCol: {
    width: 10,
    alignItems: 'center',
    flexShrink: 0,
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: 10,
    bottom: 0,
    width: 2,
    backgroundColor: colors.desertGold,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.desertGold,
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  eventText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'right',
  },
  timestamp: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
    marginTop: 2,
  },
});

// ─── Props ────────────────────────────────────────────────────────
interface SonProgressScreenProps {
  sonId?: string;
  onBack: () => void;
  onCreateGoal: () => void;
}

// ─── Main screen ──────────────────────────────────────────────────
export function SonProgressScreen({ sonId: _sonId, onBack, onCreateGoal }: SonProgressScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header row */}
      <View style={styles.header}>
        {/* Back arrow on end (RTL: visually on the right, pointing right) */}
        <TouchableOpacity
          onPress={onBack}
          style={styles.backBtn}
          hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
        >
          <AppText style={styles.backArrow} color={colors.mutedGray}>
            {'→'}
          </AppText>
        </TouchableOpacity>

        <AppText style={styles.headerTitle} color={colors.deepNightBlue}>
          {MOCK_SON.displayName}
        </AppText>

        {/* Spacer to balance the back arrow */}
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 88 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero section */}
        <Animated.View entering={FadeIn.duration(300)} style={styles.hero}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <AppText style={styles.avatarInitials} color={colors.deepNightBlue}>
              {MOCK_SON.displayName.trim().charAt(0)}
            </AppText>
          </View>

          <AppText style={styles.heroName} color={colors.deepNightBlue}>
            {MOCK_SON.displayName}
          </AppText>

          {/* Stat circles */}
          <View style={styles.circles}>
            <StatCircle
              value={MOCK_SON.xp}
              label={ar.father.xpLabel}
              gradientColors={[gradients.xpCard.colors[0], gradients.xpCard.colors[1]]}
              gradientStart={gradients.xpCard.start}
              gradientEnd={gradients.xpCard.end}
              enterDelay={0}
            />
            <StatCircle
              value={MOCK_SON.streak}
              label={ar.father.streakLabel}
              gradientColors={[gradients.streakCard.colors[0], gradients.streakCard.colors[1]]}
              gradientStart={gradients.streakCard.start}
              gradientEnd={gradients.streakCard.end}
              enterDelay={150}
            />
            <StatCircle
              value={MOCK_SON.stars}
              label={ar.father.starsLabel}
              gradientColors={[gradients.starsCard.colors[0], gradients.starsCard.colors[1]]}
              gradientStart={gradients.starsCard.start}
              gradientEnd={gradients.starsCard.end}
              enterDelay={300}
            />
          </View>
        </Animated.View>

        {/* Stages progress section */}
        <AppText style={styles.sectionHeader} color={colors.deepNightBlue}>
          {ar.father.stagesProgress}
        </AppText>

        <ProgressBar completed={MOCK_SON.stagesCompleted} total={MOCK_SON.totalStages} />

        <View style={styles.stageList}>
          {MOCK_STAGES.map((stage, index) => (
            <StageRow
              key={stage.id}
              id={stage.id}
              title={stage.title}
              completed={stage.completed}
              stars={stage.stars}
              score={stage.score}
              index={index}
            />
          ))}
        </View>

        {/* Activity timeline section */}
        <AppText style={styles.sectionHeader} color={colors.deepNightBlue}>
          {ar.father.recentActivity}
        </AppText>

        <ActivityTimeline items={MOCK_ACTIVITY} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.ctaBar, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PrimaryButton title={ar.father.createNewGoal} onPress={onCreateGoal} />
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.mutedGrayLight,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.desertGold,
    backgroundColor: colors.desertGoldGlowSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
  },
  heroName: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  circles: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
    justifyContent: 'center',
  },
  sectionHeader: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'right',
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    marginBottom: spacing.xs,
  },
  stageList: {
    marginTop: spacing.sm,
  },
  ctaBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.mutedGrayLight,
    backgroundColor: colors.softCream,
  },
});
