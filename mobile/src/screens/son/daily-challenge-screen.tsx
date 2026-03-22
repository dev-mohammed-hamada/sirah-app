import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, DimensionValue } from 'react-native';
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows, gradients } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { QuestionCard } from '../../components/question/question-card';
import { McqOptions } from '../../components/question/mcq-options';
import { TrueFalseOptions } from '../../components/question/true-false-options';
import { FillBlankOptions } from '../../components/question/fill-blank-options';
import { WhoSaidOptions } from '../../components/question/who-said-options';
import { ArrangeOptions } from '../../components/question/arrange-options';
import { AnswerFeedback } from '../../components/question/answer-feedback';
import { CountdownRing } from '../../components/daily-challenge/countdown-ring';
import { ar } from '../../i18n/ar';
import type { McqQuestion } from '../../components/question/question-types';

// ─── Arabic numeral helper ────────────────────────────────────────
function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

// ─── Challenge states ─────────────────────────────────────────────
type ChallengeState = 'active' | 'correct' | 'wrong' | 'expired' | 'already_done';

// ─── Props ────────────────────────────────────────────────────────
interface DailyChallengeScreenProps {
  onBack: () => void;
  /** Pass true to show the "already completed" state */
  alreadyCompleted?: boolean;
  /** Hours until next challenge (used in already_done state) */
  hoursUntilNext?: number;
}

// ─── Mock question (TODO: replace with POST /daily-challenge/submit server-side validation) ──
const MOCK_QUESTION: McqQuestion = {
  id: 'daily-mock-1',
  type: 'mcq',
  text: 'ما اسم أم النبي ﷺ؟',
  options: ['آمنة بنت وهب', 'خديجة بنت خويلد', 'فاطمة بنت أسد', 'حليمة السعدية'],
  correctIndex: 0,
  explanation: 'أم النبي ﷺ هي آمنة بنت وهب، وقد توفيت وهو صغير.',
};

// ─── Background star particles ────────────────────────────────────
const STAR_DOTS = [
  { top: '4%', start: '12%', size: 3, delay: 0 },
  { top: '7%', start: '72%', size: 2, delay: 600 },
  { top: '10%', start: '40%', size: 2, delay: 1100 },
  { top: '14%', start: '88%', size: 3, delay: 300 },
  { top: '18%', start: '22%', size: 2, delay: 900 },
  { top: '22%', start: '58%', size: 3, delay: 200 },
  { top: '26%', start: '8%', size: 2, delay: 1400 },
  { top: '30%', start: '78%', size: 3, delay: 700 },
  { top: '35%', start: '33%', size: 2, delay: 500 },
  { top: '40%', start: '92%', size: 2, delay: 1200 },
  { top: '55%', start: '5%', size: 2, delay: 400 },
  { top: '65%', start: '95%', size: 2, delay: 800 },
] as const;

// ─── Gold particles for correct result ───────────────────────────
const GOLD_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  angle: (i * (360 / 14) * Math.PI) / 180,
  distance: 60 + Math.random() * 60,
  size: 5 + Math.random() * 5,
}));

// ─── Star twinkle dot ─────────────────────────────────────────────
function TwinkleDot({ size, delay }: { size: number; delay: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.9, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      ),
    );
    return () => cancelAnimation(opacity);
  }, [delay, opacity]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.starlightWhite,
        },
        animStyle,
      ]}
    />
  );
}

// ─── Gold particle (correct result burst) ────────────────────────
function GoldParticle({
  angle,
  distance,
  size,
}: {
  angle: number;
  distance: number;
  size: number;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const particleOpacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(Math.cos(angle) * distance, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    translateY.value = withTiming(Math.sin(angle) * distance - 30, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    particleOpacity.value = withDelay(500, withTiming(0, { duration: 300 }));
  }, [angle, distance, particleOpacity, translateX, translateY]);

  const particleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: particleOpacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.desertGold,
        },
        particleStyle,
      ]}
    />
  );
}

// ─── Main Screen ──────────────────────────────────────────────────
export function DailyChallengeScreen({
  onBack,
  alreadyCompleted = false,
  hoursUntilNext = 7,
}: DailyChallengeScreenProps) {
  const insets = useSafeAreaInsets();
  const question = MOCK_QUESTION;

  const [challengeState, setChallengeState] = useState<ChallengeState>(
    alreadyCompleted ? 'already_done' : 'active',
  );
  const [answered, setAnswered] = useState(false);
  const [selectedMcq, setSelectedMcq] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timerRunning, setTimerRunning] = useState(!alreadyCompleted);
  const [showFeedback, setShowFeedback] = useState(false);

  const answerReported = useRef(false);

  // Screen entrance animation
  const screenScale = useSharedValue(1.08);
  const screenOpacity = useSharedValue(0);

  // XP award scale animation for correct state
  const xpScale = useSharedValue(0);
  const xpOpacity = useSharedValue(0);

  // Streak fire scale
  const streakScale = useSharedValue(0);

  useEffect(() => {
    screenScale.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
    screenOpacity.value = withTiming(1, { duration: 400 });
  }, [screenOpacity, screenScale]);

  // Trigger correct animations when entering correct state
  useEffect(() => {
    if (challengeState === 'correct') {
      xpScale.value = withSequence(
        withSpring(1.3, { damping: 10 }),
        withSpring(1.0, { damping: 14 }),
      );
      xpOpacity.value = withTiming(1, { duration: 300 });
      streakScale.value = withDelay(
        400,
        withSequence(withSpring(1.2, { damping: 10 }), withSpring(1.0, { damping: 14 })),
      );
    }
  }, [challengeState, streakScale, xpOpacity, xpScale]);

  const xpStyle = useAnimatedStyle(() => ({
    transform: [{ scale: xpScale.value }],
    opacity: xpOpacity.value,
  }));

  const streakStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakScale.value }],
  }));

  const screenStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ scale: screenScale.value }],
    opacity: screenOpacity.value,
  }));

  // Handle timer expiry
  const handleTimerExpire = useCallback(() => {
    if (answerReported.current) return;
    answerReported.current = true;
    setTimerRunning(false);
    setAnswered(true);
    setIsCorrect(false);
    setShowFeedback(true);
    // Brief delay then switch to expired state
    setTimeout(() => {
      setShowFeedback(false);
      setChallengeState('expired');
    }, 1800);
  }, []);

  // Handle MCQ selection
  const handleMcqSelect = useCallback(
    (index: number) => {
      if (answered || answerReported.current) return;
      answerReported.current = true;
      setSelectedMcq(index);
      setTimerRunning(false);
      const correct = index === question.correctIndex;
      setIsCorrect(correct);
      setAnswered(true);
      setShowFeedback(true);

      setTimeout(
        () => {
          setShowFeedback(false);
          setChallengeState(correct ? 'correct' : 'wrong');
        },
        correct ? 1400 : 2000,
      );
    },
    [answered, question.correctIndex],
  );

  const getCorrectAnswerText = (): string => {
    return question.options[question.correctIndex];
  };

  // ── STATE: Already Done ────────────────────────────────────────
  if (challengeState === 'already_done') {
    return (
      <View style={styles.root}>
        <LinearGradient
          colors={gradients.dailyChallenge.colors as [string, string]}
          start={gradients.dailyChallenge.start}
          end={gradients.dailyChallenge.end}
          style={StyleSheet.absoluteFill}
        />
        <StarField />
        <Animated.View
          entering={FadeIn.duration(500)}
          style={[
            styles.content,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl },
          ]}
        >
          {/* Header */}
          <AppText style={styles.headerTitle}>
            {'⚡ '}
            {ar.dailyChallenge.title}
          </AppText>

          {/* Done card */}
          <View style={styles.doneCard}>
            <AppText style={styles.doneCheckmark}>✓</AppText>
            <AppText style={styles.doneTitle}>{ar.dailyChallenge.completedToday}</AppText>
            <AppText style={styles.doneSubtitle}>{ar.dailyChallenge.comeBackTomorrow}</AppText>
            <AppText style={styles.doneNextLabel}>
              {ar.dailyChallenge.nextChallengeIn}{' '}
              <AppText style={styles.doneNextHours}>
                {toArabicNumeral(hoursUntilNext)} {ar.dailyChallenge.hours}
              </AppText>
            </AppText>

            {/* Slow depletion ring showing hours */}
            <View style={styles.doneRingWrapper}>
              <CountdownRing
                duration={hoursUntilNext * 60 * 60 * 1000}
                onExpire={() => {}}
                running={false}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.8}>
            <AppText style={styles.backButtonText}>{ar.dailyChallenge.back}</AppText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // ── STATE: Correct Result ─────────────────────────────────────
  if (challengeState === 'correct') {
    return (
      <View style={styles.root}>
        <LinearGradient
          colors={gradients.dailyChallenge.colors as [string, string]}
          start={gradients.dailyChallenge.start}
          end={gradients.dailyChallenge.end}
          style={StyleSheet.absoluteFill}
        />
        <StarField />
        <Animated.View
          entering={FadeIn.duration(400)}
          style={[
            styles.content,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl },
          ]}
        >
          <AppText style={styles.headerTitle}>
            {'⚡ '}
            {ar.dailyChallenge.title}
          </AppText>

          <View style={styles.resultArea}>
            {/* Gold particle burst */}
            <View style={styles.particleContainer} pointerEvents="none">
              {GOLD_PARTICLES.map((p) => (
                <GoldParticle key={p.id} angle={p.angle} distance={p.distance} size={p.size} />
              ))}
            </View>

            {/* XP award */}
            <Animated.View style={[styles.xpAwardContainer, xpStyle]}>
              <AppText style={styles.xpAwardText}>{ar.dailyChallenge.xpReward}</AppText>
            </Animated.View>

            {/* Streak confirmed */}
            <Animated.View style={[styles.streakContainer, streakStyle]}>
              <AppText style={styles.streakText}>
                {'🔥 '}
                {ar.dailyChallenge.streakConfirmed}
              </AppText>
            </Animated.View>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.8}>
            <AppText style={styles.backButtonText}>{ar.dailyChallenge.back}</AppText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // ── STATE: Wrong Result ───────────────────────────────────────
  if (challengeState === 'wrong' || challengeState === 'expired') {
    return (
      <View style={styles.root}>
        <LinearGradient
          colors={gradients.dailyChallenge.colors as [string, string]}
          start={gradients.dailyChallenge.start}
          end={gradients.dailyChallenge.end}
          style={StyleSheet.absoluteFill}
        />
        <StarField />
        <Animated.View
          entering={FadeIn.duration(400)}
          style={[
            styles.content,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl },
          ]}
        >
          <AppText style={styles.headerTitle}>
            {'⚡ '}
            {ar.dailyChallenge.title}
          </AppText>

          <View style={styles.resultArea}>
            {challengeState === 'expired' && (
              <Animated.View entering={FadeIn.duration(300)} style={styles.expiredBadge}>
                <AppText style={styles.expiredText}>
                  {'⏰ '}
                  {ar.dailyChallenge.timeExpired}
                </AppText>
              </Animated.View>
            )}

            <Animated.View
              entering={FadeIn.delay(200).duration(300)}
              style={styles.wrongFeedbackCard}
            >
              <AppText style={styles.wrongXMark}>✗</AppText>
              <AppText style={styles.wrongNarratorText}>{ar.dailyChallenge.tryTomorrow}</AppText>
              <AppText style={styles.correctAnswerLabel}>{ar.quiz.correctAnswer}</AppText>
              <AppText style={styles.correctAnswerValue}>{getCorrectAnswerText()}</AppText>
            </Animated.View>

            {/* Streak still maintained note */}
            <Animated.View entering={FadeIn.delay(400).duration(300)} style={styles.streakNote}>
              <AppText style={styles.streakNoteText}>
                {'🔥 '}
                {ar.dailyChallenge.streakConfirmed}
              </AppText>
            </Animated.View>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.8}>
            <AppText style={styles.backButtonText}>{ar.dailyChallenge.back}</AppText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // ── STATE: Active Challenge ───────────────────────────────────
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradients.dailyChallenge.colors as [string, string]}
        start={gradients.dailyChallenge.start}
        end={gradients.dailyChallenge.end}
        style={StyleSheet.absoluteFill}
      />
      <StarField />

      <Animated.View style={[screenStyle]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxl },
          ]}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          {/* Header */}
          <AppText style={styles.headerTitle}>
            {'⚡ '}
            {ar.dailyChallenge.title}
          </AppText>

          {/* Countdown ring */}
          <View style={styles.timerRow}>
            <CountdownRing duration={30000} onExpire={handleTimerExpire} running={timerRunning} />
          </View>

          {/* Question card with golden border */}
          <View style={styles.questionWrapper}>
            {/* Lightning bolt in top-end corner */}
            <View style={styles.lightningBolt} pointerEvents="none">
              <AppText style={styles.lightningText}>⚡</AppText>
            </View>
            <View style={styles.goldenBorder}>
              <QuestionCard questionText={question.text} />
            </View>
          </View>

          {/* Options */}
          <View style={styles.optionsWrapper}>
            <McqOptions
              options={question.options}
              selectedIndex={selectedMcq}
              correctIndex={answered ? question.correctIndex : null}
              disabled={answered}
              onSelect={handleMcqSelect}
            />
          </View>
        </ScrollView>
      </Animated.View>

      {/* Answer feedback overlay */}
      <AnswerFeedback
        isCorrect={isCorrect}
        correctAnswerText={!isCorrect ? getCorrectAnswerText() : undefined}
        explanation={!isCorrect ? question.explanation : undefined}
        visible={showFeedback}
      />
    </View>
  );
}

// ─── Star field (background ambient) ─────────────────────────────
function StarField() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {STAR_DOTS.map((star, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: star.top as DimensionValue,
            start: star.start as DimensionValue,
          }}
        >
          <TwinkleDot size={star.size} delay={star.delay} />
        </View>
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.desertGold,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  timerRow: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  questionWrapper: {
    position: 'relative',
    marginBottom: spacing.xxl,
  },
  goldenBorder: {
    borderRadius: radius.md + 2,
    borderWidth: 2,
    borderColor: colors.desertGold,
    ...shadows.medium,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    overflow: 'hidden',
  },
  lightningBolt: {
    position: 'absolute',
    top: -spacing.sm,
    end: spacing.lg,
    zIndex: 10,
  },
  lightningText: {
    fontSize: 20,
    color: colors.desertGold,
  },
  optionsWrapper: {
    flex: 1,
  },
  // ── Result states ──────────────────────────────────────────────
  resultArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.xxl,
  },
  particleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: 0,
    height: 0,
  },
  xpAwardContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.desertGoldGlowLight,
    borderWidth: 2,
    borderColor: colors.desertGold,
    ...shadows.medium,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.4,
  },
  xpAwardText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.desertGold,
    textAlign: 'center',
  },
  streakContainer: {
    alignItems: 'center',
  },
  streakText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.flameOrange,
    textAlign: 'center',
  },
  wrongFeedbackCard: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.errorRedLight,
    borderWidth: 1,
    borderColor: colors.errorRed,
    gap: spacing.sm,
    width: '100%',
  },
  wrongXMark: {
    fontSize: 32,
    color: colors.errorRed,
    fontWeight: '700',
    textAlign: 'center',
  },
  wrongNarratorText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.starlightWhite,
    textAlign: 'center',
  },
  correctAnswerLabel: {
    fontSize: 13,
    color: colors.starlightWhiteDim,
    textAlign: 'center',
  },
  correctAnswerValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.starlightWhite,
    textAlign: 'center',
  },
  streakNote: {
    alignItems: 'center',
  },
  streakNoteText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.flameOrange,
    textAlign: 'center',
  },
  expiredBadge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.errorRedBgMedium,
    borderWidth: 1,
    borderColor: colors.errorRed,
  },
  expiredText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.errorRed,
    textAlign: 'center',
  },
  // ── Already done ──────────────────────────────────────────────
  doneCard: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
    borderRadius: radius.lg,
    backgroundColor: colors.successGreenLight,
    borderWidth: 1,
    borderColor: colors.successGreen,
    marginHorizontal: spacing.lg,
    gap: spacing.md,
    ...shadows.medium,
  },
  doneCheckmark: {
    fontSize: 36,
    color: colors.successGreen,
    fontWeight: '700',
    textAlign: 'center',
  },
  doneTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.successGreen,
    textAlign: 'center',
  },
  doneSubtitle: {
    fontSize: 14,
    color: colors.starlightWhiteDim,
    textAlign: 'center',
  },
  doneNextLabel: {
    fontSize: 14,
    color: colors.starlightWhiteDim,
    textAlign: 'center',
  },
  doneNextHours: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.desertGold,
  },
  doneRingWrapper: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  // ── Back button ───────────────────────────────────────────────
  backButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.desertGoldGlowSubtle,
    borderWidth: 1.5,
    borderColor: colors.desertGold,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.desertGold,
    textAlign: 'center',
  },
});
