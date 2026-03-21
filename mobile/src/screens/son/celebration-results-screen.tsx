import React, { useEffect, useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  Easing,
  FadeIn,
  SlideInDown,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, fontFamily } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { SecondaryButton } from '../../components/ui/secondary-button';
import { NarratorSilhouette } from '../../components/narrator/narrator-silhouette';
import { NarratorBubble } from '../../components/narrator/narrator-bubble';
import { ar } from '../../i18n/ar';
import type { QuizResult } from './final-quiz-screen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Animation Timing (ms) ──────────────────────────────────────
const TIMING = {
  goldenFlash: { start: 0, duration: 200 },
  star1: { start: 200, flyDuration: 300, fillDuration: 200 },
  star2: { start: 700, flyDuration: 300, fillDuration: 200 },
  star3: { start: 1200, flyDuration: 300, fillDuration: 300 },
  perfectBanner: { start: 1600, duration: 400 },
  confetti: { start: 1600, duration: 2000 },
  scoreTick: { start: 1800, duration: 800 },
  xpPill: { start: 2200, duration: 200 },
  xpBreakdown: { start: 2400, duration: 200 },
  streak: { start: 2600, duration: 400 },
  narrator: { start: 2800, duration: 600 },
  buttons: { start: 3400, duration: 200, stagger: 100 },
} as const;

// ─── Arabic number helper ────────────────────────────────────────
function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

// ─── Floating Particles ─────────────────────────────────────────
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  startX: Math.random() * SCREEN_WIDTH,
  size: 3 + Math.random() * 4,
  duration: 4000 + Math.random() * 5000,
  delay: Math.random() * 3000,
}));

// ─── Confetti Particles ─────────────────────────────────────────
const CONFETTI_COLORS = [colors.desertGold, colors.starlightWhite, '#5B8DEF', colors.sunsetOrange];
const CONFETTI_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * SCREEN_WIDTH * 0.8,
  y: -(Math.random() * SCREEN_HEIGHT * 0.5 + 100),
  rotation: Math.random() * 360,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 4 + Math.random() * 6,
  delay: Math.random() * 400,
}));

// ─── Props ───────────────────────────────────────────────────────
interface CelebrationResultsScreenProps {
  result: QuizResult;
  stageId: string;
  streakDays?: number;
  nextStageTeaser?: string;
  onNextStage: () => void;
  onRetry: () => void;
  onBackToMap: () => void;
}

export function CelebrationResultsScreen({
  result,
  stageId,
  streakDays = 0,
  nextStageTeaser,
  onNextStage,
  onRetry,
  onBackToMap,
}: CelebrationResultsScreenProps) {
  const insets = useSafeAreaInsets();

  // ─── Animation values ───────────────────────────────────────
  const goldenFlashOpacity = useSharedValue(0);
  const star1Scale = useSharedValue(0);
  const star1Opacity = useSharedValue(0);
  const star2Scale = useSharedValue(0);
  const star2Opacity = useSharedValue(0);
  const star3Scale = useSharedValue(0);
  const star3Opacity = useSharedValue(0);
  const bannerScaleX = useSharedValue(0);
  const bannerOpacity = useSharedValue(0);
  const scoreOpacity = useSharedValue(0);
  const xpTranslateY = useSharedValue(40);
  const xpOpacity = useSharedValue(0);
  const xpBreakdownOpacity = useSharedValue(0);
  const streakScale = useSharedValue(0);
  const streakOpacity = useSharedValue(0);
  const narratorTranslateY = useSharedValue(80);
  const narratorOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);
  const soCloseOpacity = useSharedValue(0);

  // Score tick-up
  const [displayedScore, setDisplayedScore] = useState(0);
  const scoreTickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Narrator visibility
  const [showNarrator, setShowNarrator] = useState(false);

  // Confetti
  const confettiValues = useRef(
    CONFETTI_PARTICLES.map(() => ({
      translateY: 0,
      opacity: 0,
    })),
  ).current;
  const [showConfetti, setShowConfetti] = useState(false);

  // Particle animation values
  const particleValues = PARTICLES.map(() => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    return { translateY, opacity };
  });

  // ─── Derived data ─────────────────────────────────────────────
  const { starsEarned, score, xpEarned, isPerfect, bonuses } = result;
  const isStreakMilestone = [3, 7, 14, 30].includes(streakDays);
  const isSoClose = (starsEarned === 2 && score >= 75) || (starsEarned === 1 && score >= 45);

  const narratorSpeech =
    starsEarned === 3
      ? ar.results.narrator3Stars
      : starsEarned === 2
        ? ar.results.narrator2Stars
        : ar.results.narrator1Star;

  const soCloseText = starsEarned === 2 ? ar.results.soClose3Stars : ar.results.soClose2Stars;

  // ─── XP breakdown text ────────────────────────────────────────
  const xpBreakdownParts: string[] = [];
  const baseXp = result.correctCount * 10;
  xpBreakdownParts.push(`+${toArabicNumeral(baseXp)} ${ar.results.xpQuestions}`);
  for (const bonus of bonuses) {
    const label =
      bonus.type === 'perfect'
        ? ar.results.xpPerfect
        : bonus.type === 'speed'
          ? ar.results.xpSpeed
          : ar.results.xpFirstTry;
    xpBreakdownParts.push(`+${toArabicNumeral(bonus.xp)} ${label}`);
  }
  const xpBreakdownText = xpBreakdownParts.join(' | ');

  // ─── Start animation sequence ─────────────────────────────────
  useEffect(() => {
    // 1. Golden flash
    goldenFlashOpacity.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(0, { duration: TIMING.goldenFlash.duration }),
    );

    // 2. Star 1
    star1Scale.value = withDelay(
      TIMING.star1.start,
      withSequence(
        withTiming(1.3, { duration: TIMING.star1.flyDuration }),
        withSpring(1, { damping: 10, stiffness: 150 }),
      ),
    );
    star1Opacity.value = withDelay(TIMING.star1.start, withTiming(1, { duration: 150 }));

    // 3. Star 2
    if (starsEarned >= 2) {
      star2Scale.value = withDelay(
        TIMING.star2.start,
        withSequence(
          withTiming(1.3, { duration: TIMING.star2.flyDuration }),
          withSpring(1, { damping: 10, stiffness: 150 }),
        ),
      );
      star2Opacity.value = withDelay(TIMING.star2.start, withTiming(1, { duration: 150 }));
    } else {
      star2Scale.value = withDelay(
        TIMING.star2.start,
        withSpring(1, { damping: 15, stiffness: 200 }),
      );
      star2Opacity.value = withDelay(TIMING.star2.start, withTiming(0.3, { duration: 300 }));
    }

    // 4. Star 3
    if (starsEarned >= 3) {
      star3Scale.value = withDelay(
        TIMING.star3.start,
        withSequence(
          withTiming(1.5, { duration: TIMING.star3.flyDuration }),
          withSpring(1, { damping: 8, stiffness: 120 }),
        ),
      );
      star3Opacity.value = withDelay(TIMING.star3.start, withTiming(1, { duration: 150 }));
    } else {
      star3Scale.value = withDelay(
        TIMING.star3.start,
        withSpring(1, { damping: 15, stiffness: 200 }),
      );
      star3Opacity.value = withDelay(TIMING.star3.start, withTiming(0.3, { duration: 300 }));
    }

    // 5. Perfect banner (3 stars only)
    if (isPerfect) {
      bannerScaleX.value = withDelay(
        TIMING.perfectBanner.start,
        withSpring(1, { damping: 12, stiffness: 100 }),
      );
      bannerOpacity.value = withDelay(TIMING.perfectBanner.start, withTiming(1, { duration: 200 }));
    }

    // 6. Confetti (3 stars only)
    if (starsEarned === 3) {
      setTimeout(() => setShowConfetti(true), TIMING.confetti.start);
    }

    // 7. Score tick-up
    setTimeout(() => {
      scoreOpacity.value = withTiming(1, { duration: 200 });
      const startTime = Date.now();
      const duration = TIMING.scoreTick.duration;
      scoreTickRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const currentScore = Math.round(eased * score);
        setDisplayedScore(currentScore);
        if (progress >= 1 && scoreTickRef.current) {
          clearInterval(scoreTickRef.current);
        }
      }, 16);
    }, TIMING.scoreTick.start);

    // 8. XP pill
    xpTranslateY.value = withDelay(
      TIMING.xpPill.start,
      withSpring(0, { damping: 12, stiffness: 150 }),
    );
    xpOpacity.value = withDelay(
      TIMING.xpPill.start,
      withTiming(1, { duration: TIMING.xpPill.duration }),
    );

    // 9. XP breakdown
    xpBreakdownOpacity.value = withDelay(
      TIMING.xpBreakdown.start,
      withTiming(1, { duration: TIMING.xpBreakdown.duration }),
    );

    // 10. Streak
    if (streakDays > 0) {
      streakScale.value = withDelay(
        TIMING.streak.start,
        withSequence(
          withTiming(1.2, { duration: 200 }),
          withSpring(1, { damping: 10, stiffness: 150 }),
        ),
      );
      streakOpacity.value = withDelay(TIMING.streak.start, withTiming(1, { duration: 200 }));
    }

    // 11. Narrator
    setTimeout(() => setShowNarrator(true), TIMING.narrator.start);
    narratorTranslateY.value = withDelay(
      TIMING.narrator.start,
      withSpring(0, { damping: 14, stiffness: 100 }),
    );
    narratorOpacity.value = withDelay(
      TIMING.narrator.start,
      withTiming(1, { duration: TIMING.narrator.duration }),
    );

    // 12. Buttons
    buttonsTranslateY.value = withDelay(
      TIMING.buttons.start,
      withSpring(0, { damping: 14, stiffness: 100 }),
    );
    buttonsOpacity.value = withDelay(
      TIMING.buttons.start,
      withTiming(1, { duration: TIMING.buttons.duration }),
    );

    // 13. "So Close" effect
    if (isSoClose) {
      soCloseOpacity.value = withDelay(
        TIMING.buttons.start + 300,
        withTiming(1, { duration: 400 }),
      );
    }

    // 14. Start ambient particles
    particleValues.forEach((pv, i) => {
      const particle = PARTICLES[i];
      const startParticle = () => {
        pv.translateY.value = 0;
        pv.opacity.value = 0;
        pv.translateY.value = withTiming(-SCREEN_HEIGHT, {
          duration: particle.duration,
          easing: Easing.linear,
        });
        pv.opacity.value = withSequence(
          withTiming(0.6, { duration: particle.duration * 0.2 }),
          withTiming(0.4, { duration: particle.duration * 0.6 }),
          withTiming(0, { duration: particle.duration * 0.2 }),
        );
      };
      setTimeout(startParticle, particle.delay);
      // Loop particles
      const interval = setInterval(startParticle, particle.duration + particle.delay);
      // Clean up in return
      return () => clearInterval(interval);
    });

    return () => {
      if (scoreTickRef.current) clearInterval(scoreTickRef.current);
    };
  }, []);

  // ─── Animated styles ──────────────────────────────────────────
  const goldenFlashStyle = useAnimatedStyle(() => ({
    opacity: goldenFlashOpacity.value,
  }));

  const star1Style = useAnimatedStyle(() => ({
    transform: [{ scale: star1Scale.value }],
    opacity: star1Opacity.value,
  }));

  const star2Style = useAnimatedStyle(() => ({
    transform: [{ scale: star2Scale.value }],
    opacity: star2Opacity.value,
  }));

  const star3Style = useAnimatedStyle(() => ({
    transform: [{ scale: star3Scale.value }],
    opacity: star3Opacity.value,
  }));

  const bannerStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: bannerScaleX.value }],
    opacity: bannerOpacity.value,
  }));

  const scoreStyle = useAnimatedStyle(() => ({
    opacity: scoreOpacity.value,
  }));

  const xpStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: xpTranslateY.value }],
    opacity: xpOpacity.value,
  }));

  const xpBreakdownStyle = useAnimatedStyle(() => ({
    opacity: xpBreakdownOpacity.value,
  }));

  const streakStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakScale.value }],
    opacity: streakOpacity.value,
  }));

  const narratorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: narratorTranslateY.value }],
    opacity: narratorOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonsTranslateY.value }],
    opacity: buttonsOpacity.value,
  }));

  const soCloseStyle = useAnimatedStyle(() => ({
    opacity: soCloseOpacity.value,
  }));

  // ─── Render ───────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.sunsetOrange, colors.desertGold, colors.warmSand]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating particles */}
      {PARTICLES.map((particle, i) => {
        const pStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: particleValues[i].translateY.value }],
          opacity: particleValues[i].opacity.value,
        }));
        return (
          <Animated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                start: particle.startX,
                bottom: 0,
                width: particle.size,
                height: particle.size,
                borderRadius: particle.size / 2,
              },
              pStyle,
            ]}
            pointerEvents="none"
          />
        );
      })}

      {/* Golden flash overlay */}
      <Animated.View style={[styles.goldenFlash, goldenFlashStyle]} pointerEvents="none" />

      {/* Confetti (3 stars only) */}
      {showConfetti &&
        CONFETTI_PARTICLES.map((confetti) => (
          <Animated.View
            key={`confetti-${confetti.id}`}
            entering={FadeIn.delay(confetti.delay).duration(200)}
            style={[
              styles.confettiPiece,
              {
                start: SCREEN_WIDTH / 2 + confetti.x,
                top: SCREEN_HEIGHT / 3,
                width: confetti.size,
                height: confetti.size * 1.5,
                backgroundColor: confetti.color,
                borderRadius: confetti.size / 4,
                transform: [{ translateY: confetti.y }, { rotate: `${confetti.rotation}deg` }],
              },
            ]}
            pointerEvents="none"
          />
        ))}

      {/* Main content */}
      <Animated.ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.xl,
            paddingBottom: insets.bottom + spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Perfect banner */}
        {isPerfect && (
          <Animated.View style={[styles.perfectBanner, bannerStyle]}>
            <AppText style={styles.perfectBannerText}>{ar.results.perfectBanner}</AppText>
          </Animated.View>
        )}

        {/* Stars */}
        <View style={styles.starsRow}>
          {/* Star 1 (right in RTL) */}
          <Animated.View style={[styles.starContainer, star1Style]}>
            <AppText style={[styles.starEmoji, starsEarned >= 1 && styles.starEarned]}>
              {starsEarned >= 1 ? '⭐' : '☆'}
            </AppText>
          </Animated.View>

          {/* Star 2 (center) */}
          <Animated.View style={[styles.starContainer, star2Style]}>
            <AppText style={[styles.starEmoji, starsEarned >= 2 && styles.starEarned]}>
              {starsEarned >= 2 ? '⭐' : '☆'}
            </AppText>
          </Animated.View>

          {/* Star 3 (left in RTL) */}
          <Animated.View style={[styles.starContainer, star3Style]}>
            <AppText style={[styles.starEmoji, starsEarned >= 3 && styles.starEarned]}>
              {starsEarned >= 3 ? '⭐' : '☆'}
            </AppText>
          </Animated.View>
        </View>

        {/* Score */}
        <Animated.View style={[styles.scoreContainer, scoreStyle]}>
          <AppText style={styles.scoreText}>
            {toArabicNumeral(displayedScore)}/{toArabicNumeral(100)}
          </AppText>
          <AppText variant="body" color={colors.mutedGray}>
            {ar.results.scoreLabel}
          </AppText>
        </Animated.View>

        {/* XP pill */}
        <Animated.View style={[styles.xpPill, xpStyle]}>
          <AppText style={styles.xpText}>+{toArabicNumeral(xpEarned)} XP</AppText>
        </Animated.View>

        {/* XP breakdown */}
        <Animated.View style={xpBreakdownStyle}>
          <AppText variant="caption" color={colors.mutedGray} style={styles.xpBreakdown}>
            {xpBreakdownText}
          </AppText>
        </Animated.View>

        {/* Streak */}
        {streakDays > 0 && (
          <Animated.View style={[styles.streakContainer, streakStyle]}>
            <AppText style={styles.streakText}>
              {isStreakMilestone
                ? ar.results.streakMilestone.replace('{days}', toArabicNumeral(streakDays))
                : `🔥 ${ar.results.streakDays.replace('{days}', toArabicNumeral(streakDays))}`}
            </AppText>
          </Animated.View>
        )}

        {/* Narrator */}
        <Animated.View style={[styles.narratorContainer, narratorStyle]}>
          {showNarrator && (
            <>
              <NarratorBubble text={narratorSpeech} typewriter typewriterSpeed={40} compact />
              <View style={styles.narratorFigure}>
                <NarratorSilhouette scale={1.2} color={colors.deepNightBlue} />
              </View>
            </>
          )}
        </Animated.View>

        {/* Next stage teaser */}
        {nextStageTeaser && showNarrator && (
          <Animated.View entering={FadeIn.delay(800).duration(400)} style={styles.teaserContainer}>
            <AppText variant="body" color={colors.deepNightBlue} style={styles.teaserText}>
              {nextStageTeaser}
            </AppText>
          </Animated.View>
        )}

        {/* "So Close" prompt */}
        {isSoClose && (
          <Animated.View style={[styles.soCloseContainer, soCloseStyle]}>
            <AppText style={styles.soCloseText}>{soCloseText}</AppText>
          </Animated.View>
        )}

        {/* Action buttons */}
        <Animated.View style={[styles.buttonsContainer, buttonsStyle]}>
          <PrimaryButton title={ar.results.nextStage} onPress={onNextStage} />

          <SecondaryButton title={ar.results.retry} onPress={onRetry} style={styles.retryButton} />

          <Pressable onPress={onBackToMap} style={styles.backToMapLink}>
            <AppText variant="body" color={colors.mutedGray}>
              {ar.results.backToMap}
            </AppText>
          </Pressable>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    flexGrow: 1,
  },
  particle: {
    position: 'absolute',
    backgroundColor: colors.desertGold,
  },
  goldenFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.desertGold,
    zIndex: 100,
  },
  confettiPiece: {
    position: 'absolute',
    zIndex: 50,
  },

  // Perfect banner
  perfectBanner: {
    backgroundColor: colors.desertGold,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.sm,
    marginBottom: spacing.lg,
    shadowColor: colors.desertGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  perfectBannerText: {
    fontFamily: fontFamily.black,
    fontSize: 20,
    color: colors.deepNightBlue,
    textAlign: 'center',
  },

  // Stars
  starsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starEmoji: {
    fontSize: 64,
    textAlign: 'center',
  },
  starEarned: {
    textShadowColor: 'rgba(212, 168, 67, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },

  // Score
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  scoreText: {
    fontFamily: fontFamily.black,
    fontSize: 48,
    color: colors.deepNightBlue,
    textAlign: 'center',
  },

  // XP
  xpPill: {
    backgroundColor: colors.desertGold,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  xpText: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  xpBreakdown: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  // Streak
  streakContainer: {
    marginBottom: spacing.lg,
  },
  streakText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.sunsetOrange,
    textAlign: 'center',
  },

  // Narrator
  narratorContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    width: '100%',
  },
  narratorFigure: {
    marginTop: spacing.md,
  },

  // Teaser
  teaserContainer: {
    backgroundColor: 'rgba(26, 39, 68, 0.08)',
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  teaserText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // So Close
  soCloseContainer: {
    marginBottom: spacing.md,
  },
  soCloseText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.desertGold,
    textAlign: 'center',
  },

  // Buttons
  buttonsContainer: {
    width: '100%',
    gap: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  retryButton: {
    borderColor: colors.deepNightBlue,
  },
  backToMapLink: {
    paddingVertical: spacing.sm,
  },
});
