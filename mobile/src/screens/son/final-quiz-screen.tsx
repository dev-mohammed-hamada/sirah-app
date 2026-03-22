import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOutLeft,
  SlideInRight,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { QuestionCard } from '../../components/question/question-card';
import { McqOptions } from '../../components/question/mcq-options';
import { TrueFalseOptions } from '../../components/question/true-false-options';
import { FillBlankOptions } from '../../components/question/fill-blank-options';
import { WhoSaidOptions } from '../../components/question/who-said-options';
import { ArrangeOptions } from '../../components/question/arrange-options';
import { AnswerFeedback } from '../../components/question/answer-feedback';
import { ProgressDots } from '../../components/question/progress-dots';
import { SpeedTimer } from '../../components/question/speed-timer';
import { HeartsDepletionModal } from '../../components/question/hearts-depletion-modal';
import { HeartsDisplay } from '../../components/hearts/hearts-display';
import { ar } from '../../i18n/ar';
import type { Question } from '../../components/question/question-types';

const SPEED_BONUS_THRESHOLD_MS = 8000; // 8 seconds for speed bonus
const TIMER_DURATION_MS = 15000; // 15 seconds total per question
const BREATHING_PAUSE_MS = 500;

// ─── Scoring Types ───────────────────────────────────────────────
export interface QuizResult {
  score: number; // percentage 0-100
  starsEarned: number; // 1-3
  xpEarned: number;
  correctCount: number;
  totalCount: number;
  isPerfect: boolean;
  isFirstTry: boolean;
  bonuses: { type: string; xp: number }[];
}

interface FinalQuizScreenProps {
  questions: Question[];
  hearts: number;
  maxHearts: number;
  isFirstAttempt: boolean;
  onAnswer: (correct: boolean) => void;
  onComplete: (result: QuizResult) => void;
  onHeartsEmpty: () => void;
  onBackToMap: () => void;
}

// ─── Arabic number helper ────────────────────────────────────────
function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

export function FinalQuizScreen({
  questions,
  hearts,
  maxHearts,
  isFirstAttempt,
  onAnswer,
  onComplete,
  onHeartsEmpty,
  onBackToMap,
}: FinalQuizScreenProps) {
  const insets = useSafeAreaInsets();
  const total = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showDepletionModal, setShowDepletionModal] = useState(false);
  const answerReported = useRef(false);

  // Track answers for scoring
  const answersRef = useRef<{ correct: boolean; timeMs: number; fast: boolean }[]>([]);
  const questionStartTime = useRef(Date.now());

  // Selection state per question type
  const [selectedMcq, setSelectedMcq] = useState<number | null>(null);
  const [selectedTF, setSelectedTF] = useState<boolean | null>(null);
  const [selectedFill, setSelectedFill] = useState<number | null>(null);
  const [selectedWho, setSelectedWho] = useState<number | null>(null);
  const [arrangeOrder, setArrangeOrder] = useState<number[]>([]);
  const [arrangeSubmitted, setArrangeSubmitted] = useState(false);

  // Screen shake for wrong answers
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  // Star burst for correct answers
  const starScale = useSharedValue(0);
  const starOpacity = useSharedValue(0);

  const question = questions[currentIndex];

  // Reset state for each new question
  useEffect(() => {
    setAnswered(false);
    setIsCorrect(false);
    setSelectedMcq(null);
    setSelectedTF(null);
    setSelectedFill(null);
    setSelectedWho(null);
    setArrangeSubmitted(false);
    answerReported.current = false;
    questionStartTime.current = Date.now();

    if (question?.type === 'arrange') {
      const indices = question.items.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setArrangeOrder(indices);
    }
  }, [currentIndex, question]);

  // Calculate scoring
  const calculateResult = useCallback((): QuizResult => {
    const answers = answersRef.current;
    const correctCount = answers.filter((a) => a.correct).length;
    const score = Math.round((correctCount / total) * 100);
    const isPerfect = correctCount === total;

    const bonuses: { type: string; xp: number }[] = [];
    let xpEarned = correctCount * 10; // base XP

    // Speed bonuses
    const speedBonusCount = answers.filter((a) => a.correct && a.fast).length;
    if (speedBonusCount > 0) {
      const speedXp = speedBonusCount * 5;
      xpEarned += speedXp;
      bonuses.push({ type: 'speed', xp: speedXp });
    }

    // Perfect bonus
    if (isPerfect) {
      xpEarned += 20;
      bonuses.push({ type: 'perfect', xp: 20 });
    }

    // First try bonus
    if (isFirstAttempt) {
      xpEarned += 10;
      bonuses.push({ type: 'firstTry', xp: 10 });
    }

    // Stars
    let starsEarned = 1;
    if (score >= 81) starsEarned = 3;
    else if (score >= 51) starsEarned = 2;

    return {
      score,
      starsEarned,
      xpEarned,
      correctCount,
      totalCount: total,
      isPerfect,
      isFirstTry: isFirstAttempt,
      bonuses,
    };
  }, [total, isFirstAttempt]);

  // Report answer
  const reportAnswer = useCallback(
    (correct: boolean) => {
      if (answerReported.current) return;
      answerReported.current = true;

      const timeMs = Date.now() - questionStartTime.current;
      const fast = timeMs < SPEED_BONUS_THRESHOLD_MS;

      answersRef.current.push({ correct, timeMs, fast });
      setAnswered(true);
      setIsCorrect(correct);
      onAnswer(correct);

      if (correct) {
        // Star burst
        starScale.value = withSequence(
          withTiming(1.5, { duration: 300 }),
          withTiming(0, { duration: 300 }),
        );
        starOpacity.value = withSequence(
          withTiming(1, { duration: 150 }),
          withDelay(250, withTiming(0, { duration: 200 })),
        );
      } else {
        // Screen shake
        shakeX.value = withSequence(
          withTiming(8, { duration: 50 }),
          withTiming(-8, { duration: 50 }),
          withTiming(6, { duration: 50 }),
          withTiming(-6, { duration: 50 }),
          withTiming(0, { duration: 50 }),
        );
      }

      // Auto-advance after delay
      const delay = correct ? 1500 : 2000;
      setTimeout(() => {
        // Check hearts depletion
        if (!correct && hearts <= 1) {
          setShowDepletionModal(true);
          return;
        }

        if (currentIndex < total - 1) {
          // Breathing pause between questions
          setShowQuestion(false);
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            setShowQuestion(true);
          }, BREATHING_PAUSE_MS);
        } else {
          // Quiz complete
          onComplete(calculateResult());
        }
      }, delay);
    },
    [
      hearts,
      currentIndex,
      total,
      onAnswer,
      onComplete,
      calculateResult,
      shakeX,
      starScale,
      starOpacity,
    ],
  );

  // ─── Question type handlers ────────────────────────────────────
  const handleMcqSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedMcq(index);
      if (question.type === 'mcq') reportAnswer(index === question.correctIndex);
    },
    [answered, question, reportAnswer],
  );

  const handleTFSelect = useCallback(
    (answer: boolean) => {
      if (answered) return;
      setSelectedTF(answer);
      if (question.type === 'true_false') reportAnswer(answer === question.correctAnswer);
    },
    [answered, question, reportAnswer],
  );

  const handleFillSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedFill(index);
      if (question.type === 'fill_blank') reportAnswer(index === question.correctIndex);
    },
    [answered, question, reportAnswer],
  );

  const handleWhoSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedWho(index);
      if (question.type === 'who_said') reportAnswer(index === question.correctIndex);
    },
    [answered, question, reportAnswer],
  );

  const handleArrangeSubmit = useCallback(() => {
    if (answered || question.type !== 'arrange') return;
    setArrangeSubmitted(true);
    const correct = arrangeOrder.every((item, pos) => question.correctOrder[pos] === item);
    reportAnswer(correct);
  }, [answered, arrangeOrder, question, reportAnswer]);

  // Correct answer text for feedback
  const getCorrectAnswerText = (): string | undefined => {
    switch (question.type) {
      case 'mcq':
        return question.options[question.correctIndex];
      case 'true_false':
        return question.correctAnswer ? ar.quiz.trueLabel : ar.quiz.falseLabel;
      case 'fill_blank':
        return question.options[question.correctIndex];
      case 'who_said':
        return question.characters[question.correctIndex];
      case 'arrange':
        return question.correctOrder.map((i) => question.items[i]).join(' → ');
      default:
        return undefined;
    }
  };

  // Speed bonus indicator
  const wasSpeedBonus =
    answered &&
    isCorrect &&
    answersRef.current.length > 0 &&
    answersRef.current[answersRef.current.length - 1].fast;

  // Question counter text
  const counterText = ar.quiz.questionOf
    .replace('{current}', toArabicNumeral(currentIndex + 1))
    .replace('{total}', toArabicNumeral(total));

  // Star burst animation style
  const starBurstStyle = useAnimatedStyle(() => ({
    transform: [{ scale: starScale.value }],
    opacity: starOpacity.value,
  }));

  if (!question) return null;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.deepNightBlue, colors.deepNightBlueMid, colors.royalPurple]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.content, shakeStyle]}>
        {/* Top area */}
        <View style={[styles.topArea, { paddingTop: insets.top + spacing.sm }]}>
          {/* Hearts */}
          <HeartsDisplay
            hearts={hearts}
            maxHearts={maxHearts}
            size={16}
            animate={true}
            style={styles.heartsRow}
          />

          {/* Question counter */}
          <AppText style={styles.counter}>{counterText}</AppText>

          {/* Progress dots + timer */}
          <View style={styles.dotsTimerRow}>
            <ProgressDots
              total={total}
              current={currentIndex}
              answered={answered ? currentIndex + 1 : currentIndex}
            />
            <SpeedTimer durationMs={TIMER_DURATION_MS} running={showQuestion && !answered} />
          </View>
        </View>

        {/* Question area */}
        {showQuestion && (
          <Animated.View
            key={`q-${currentIndex}`}
            entering={SlideInRight.duration(300).springify().damping(18)}
            style={styles.questionArea}
          >
            {/* Question card with dark theme */}
            <View style={styles.cardBorder}>
              <QuestionCard questionText={question.text} />
            </View>

            {/* Options */}
            <View style={styles.optionsArea}>
              {question.type === 'mcq' && (
                <McqOptions
                  options={question.options}
                  selectedIndex={selectedMcq}
                  correctIndex={answered ? question.correctIndex : null}
                  disabled={answered}
                  onSelect={handleMcqSelect}
                />
              )}

              {question.type === 'true_false' && (
                <TrueFalseOptions
                  selectedAnswer={selectedTF}
                  correctAnswer={answered ? question.correctAnswer : null}
                  disabled={answered}
                  onSelect={handleTFSelect}
                />
              )}

              {question.type === 'fill_blank' && (
                <FillBlankOptions
                  sentence={question.sentence}
                  options={question.options}
                  selectedIndex={selectedFill}
                  correctIndex={answered ? question.correctIndex : null}
                  disabled={answered}
                  onSelect={handleFillSelect}
                />
              )}

              {question.type === 'who_said' && (
                <WhoSaidOptions
                  quote={question.quote}
                  characters={question.characters}
                  selectedIndex={selectedWho}
                  correctIndex={answered ? question.correctIndex : null}
                  disabled={answered}
                  onSelect={handleWhoSelect}
                />
              )}

              {question.type === 'arrange' && (
                <ArrangeOptions
                  items={question.items}
                  currentOrder={arrangeOrder}
                  isSubmitted={arrangeSubmitted}
                  isCorrect={answered ? isCorrect : null}
                  correctOrder={question.correctOrder}
                  disabled={answered}
                  onReorder={setArrangeOrder}
                  onSubmit={handleArrangeSubmit}
                />
              )}
            </View>

            {/* Speed bonus indicator */}
            {wasSpeedBonus && (
              <Animated.View entering={FadeIn.duration(300)} style={styles.speedBonusContainer}>
                <AppText style={styles.speedBonusText}>⚡ {ar.quiz.speedBonus}</AppText>
                <AppText style={styles.speedBonusXp}>{ar.quiz.speedBonusXp}</AppText>
              </Animated.View>
            )}
          </Animated.View>
        )}

        {/* Star burst effect for correct answers */}
        <Animated.View style={[styles.starBurst, starBurstStyle]} pointerEvents="none">
          {STAR_PARTICLES.map((star) => (
            <View
              key={star.id}
              style={[
                styles.starParticle,
                {
                  top: star.y,
                  start: star.x,
                  width: star.size,
                  height: star.size,
                },
              ]}
            />
          ))}
        </Animated.View>
      </Animated.View>

      {/* Feedback overlay */}
      <AnswerFeedback
        isCorrect={isCorrect}
        correctAnswerText={!isCorrect ? getCorrectAnswerText() : undefined}
        explanation={!isCorrect ? question.explanation : undefined}
        visible={answered}
      />

      {/* Hearts depletion modal */}
      <HeartsDepletionModal
        visible={showDepletionModal}
        onRetry={onHeartsEmpty}
        onBackToMap={onBackToMap}
      />
    </View>
  );
}

// ─── Star particles data ─────────────────────────────────────────
const STAR_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.cos((i * 45 * Math.PI) / 180) * 60,
  y: Math.sin((i * 45 * Math.PI) / 180) * 60,
  size: 4 + Math.random() * 4,
}));

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  topArea: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    zIndex: 10,
  },
  heartsRow: {
    justifyContent: 'flex-end',
  },
  counter: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.starlightWhite,
    textAlign: 'center',
  },
  dotsTimerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  questionArea: {
    flex: 1,
    paddingTop: spacing.xxl,
  },
  cardBorder: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.md + 2,
    padding: 2,
    backgroundColor: colors.royalPurple,
    ...shadows.medium,
  },
  optionsArea: {
    marginTop: spacing.xxl,
  },
  speedBonusContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: 2,
  },
  speedBonusText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.desertGold,
    textAlign: 'center',
  },
  speedBonusXp: {
    fontSize: 12,
    color: colors.desertGold,
    textAlign: 'center',
  },
  starBurst: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    width: 120,
    height: 120,
  },
  starParticle: {
    position: 'absolute',
    backgroundColor: colors.desertGold,
    borderRadius: 4,
  },
});
