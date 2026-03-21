import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, radius } from '../../theme';
import { AppText } from '../ui/app-text';
import { ar } from '../../i18n/ar';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswerText?: string;
  explanation?: string;
  visible: boolean;
}

export function AnswerFeedback({
  isCorrect,
  correctAnswerText,
  explanation,
  visible,
}: AnswerFeedbackProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Screen flash overlay */}
      <ScreenFlash isCorrect={isCorrect} />

      {/* XP float for correct */}
      {isCorrect && <XpFloat />}

      {/* Narrator reaction */}
      <Animated.View
        entering={FadeIn.delay(300).duration(300)}
        style={[
          styles.reactionContainer,
          isCorrect ? styles.reactionCorrect : styles.reactionWrong,
        ]}
      >
        {isCorrect ? (
          <CorrectFeedback />
        ) : (
          <WrongFeedback correctAnswerText={correctAnswerText} explanation={explanation} />
        )}
      </Animated.View>

      {/* Mini confetti for correct */}
      {isCorrect && <MiniConfetti />}
    </View>
  );
}

// ─── Screen Flash ────────────────────────────────────────────────
function ScreenFlash({ isCorrect }: { isCorrect: boolean }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(isCorrect ? 0.2 : 0.15, { duration: 100 }),
      withTiming(0, { duration: 100 }),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: isCorrect ? colors.successGreen : colors.errorRed },
        style,
      ]}
      pointerEvents="none"
    />
  );
}

// ─── XP Float ────────────────────────────────────────────────────
function XpFloat() {
  const translateY = useSharedValue(0);
  const floatOpacity = useSharedValue(1);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    translateY.value = withTiming(-80, { duration: 600, easing: Easing.out(Easing.ease) });
    floatOpacity.value = withDelay(300, withTiming(0, { duration: 300 }));
    scale.value = withSequence(
      withTiming(1.2, { duration: 200 }),
      withTiming(1, { duration: 400 }),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: floatOpacity.value,
  }));

  return (
    <Animated.View style={[styles.xpFloat, style]} pointerEvents="none">
      <AppText style={styles.xpText}>{ar.quiz.xpGained}</AppText>
    </Animated.View>
  );
}

// ─── Correct Feedback ────────────────────────────────────────────
function CorrectFeedback() {
  const praise = ar.quiz.narratorPraise[Math.floor(Math.random() * ar.quiz.narratorPraise.length)];

  return (
    <View style={styles.feedbackContent}>
      <AppText style={styles.checkmark}>✓</AppText>
      <AppText style={styles.praiseText}>{praise}</AppText>
    </View>
  );
}

// ─── Wrong Feedback ──────────────────────────────────────────────
function WrongFeedback({
  correctAnswerText,
  explanation,
}: {
  correctAnswerText?: string;
  explanation?: string;
}) {
  return (
    <View style={styles.feedbackContent}>
      <AppText style={styles.xMark}>✗</AppText>
      {correctAnswerText && (
        <AppText style={styles.correctAnswerText}>
          {ar.quiz.correctAnswer} {correctAnswerText}
        </AppText>
      )}
      {explanation && <AppText style={styles.explanationText}>{explanation}</AppText>}
    </View>
  );
}

// ─── Mini Confetti ───────────────────────────────────────────────
const CONFETTI_PIECES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  color: [colors.desertGold, colors.successGreen, colors.starlightWhite, colors.flameYellow][i % 4],
  angle: i * 30 * (Math.PI / 180),
}));

function MiniConfetti() {
  return (
    <View style={styles.confettiContainer} pointerEvents="none">
      {CONFETTI_PIECES.map((piece) => (
        <ConfettiPiece key={piece.id} color={piece.color} angle={piece.angle} />
      ))}
    </View>
  );
}

function ConfettiPiece({ color, angle }: { color: string; angle: number }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const confettiOpacity = useSharedValue(1);
  const rotation = useSharedValue(0);

  const distance = 40 + Math.random() * 60;

  useEffect(() => {
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance - 20;
    translateX.value = withTiming(targetX, { duration: 600, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(targetY, { duration: 600, easing: Easing.out(Easing.ease) });
    confettiOpacity.value = withDelay(400, withTiming(0, { duration: 200 }));
    rotation.value = withTiming(360 * (Math.random() > 0.5 ? 1 : -1), { duration: 600 });
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: confettiOpacity.value,
  }));

  return <Animated.View style={[styles.confettiPiece, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    start: 0,
    end: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  xpFloat: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  },
  xpText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.desertGold,
    textAlign: 'center',
  },
  reactionContainer: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  reactionCorrect: {
    backgroundColor: colors.successGreenBg,
  },
  reactionWrong: {
    backgroundColor: colors.errorRedBg,
  },
  feedbackContent: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkmark: {
    fontSize: 32,
    color: colors.successGreen,
    fontWeight: '700',
    textAlign: 'center',
  },
  xMark: {
    fontSize: 32,
    color: colors.errorRed,
    fontWeight: '700',
    textAlign: 'center',
  },
  praiseText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.successGreen,
    textAlign: 'center',
  },
  correctAnswerText: {
    fontSize: 14,
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 14,
    color: colors.mutedGray,
    textAlign: 'center',
  },
  confettiContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
    width: 0,
    height: 0,
  },
  confettiPiece: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
