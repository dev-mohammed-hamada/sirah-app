import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { ProgressBar } from '../../components/stage/progress-bar';
import { QuestionCard } from '../../components/question/question-card';
import { McqOptions } from '../../components/question/mcq-options';
import { TrueFalseOptions } from '../../components/question/true-false-options';
import { FillBlankOptions } from '../../components/question/fill-blank-options';
import { WhoSaidOptions } from '../../components/question/who-said-options';
import { ArrangeOptions } from '../../components/question/arrange-options';
import { AnswerFeedback } from '../../components/question/answer-feedback';
import { ar } from '../../i18n/ar';
import type { Question } from '../../components/question/question-types';

interface InlineQuestionScreenProps {
  question: Question;
  stageLabel: string;
  totalSteps: number;
  currentStep: number;
  hearts: number;
  maxHearts: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export function InlineQuestionScreen({
  question,
  stageLabel,
  totalSteps,
  currentStep,
  hearts,
  maxHearts,
  onAnswer,
  onNext,
}: InlineQuestionScreenProps) {
  const insets = useSafeAreaInsets();
  const progress = totalSteps > 0 ? currentStep / totalSteps : 0;

  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const answerReported = useRef(false);

  // Arrange-specific state
  const [arrangeOrder, setArrangeOrder] = useState<number[]>(() => {
    if (question.type === 'arrange') {
      // Shuffle items for initial display
      const indices = question.items.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
    }
    return [];
  });

  // Selection state for tap-based question types
  const [selectedMcq, setSelectedMcq] = useState<number | null>(null);
  const [selectedTF, setSelectedTF] = useState<boolean | null>(null);
  const [selectedFill, setSelectedFill] = useState<number | null>(null);
  const [selectedWho, setSelectedWho] = useState<number | null>(null);

  // Show "Next" button after delay
  useEffect(() => {
    if (answered) {
      const delay = isCorrect ? 1500 : 2000;
      const timer = setTimeout(() => setShowNext(true), delay);
      return () => clearTimeout(timer);
    }
  }, [answered, isCorrect]);

  const reportAnswer = useCallback(
    (correct: boolean) => {
      if (answerReported.current) return;
      answerReported.current = true;
      setAnswered(true);
      setIsCorrect(correct);
      onAnswer(correct);
    },
    [onAnswer],
  );

  // ─── MCQ handler ─────────────────────────────────────────────
  const handleMcqSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedMcq(index);
      if (question.type === 'mcq') {
        reportAnswer(index === question.correctIndex);
      }
    },
    [answered, question, reportAnswer],
  );

  // ─── True/False handler ──────────────────────────────────────
  const handleTFSelect = useCallback(
    (answer: boolean) => {
      if (answered) return;
      setSelectedTF(answer);
      if (question.type === 'true_false') {
        reportAnswer(answer === question.correctAnswer);
      }
    },
    [answered, question, reportAnswer],
  );

  // ─── Fill-in-blank handler ───────────────────────────────────
  const handleFillSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedFill(index);
      if (question.type === 'fill_blank') {
        reportAnswer(index === question.correctIndex);
      }
    },
    [answered, question, reportAnswer],
  );

  // ─── Who-said handler ────────────────────────────────────────
  const handleWhoSelect = useCallback(
    (index: number) => {
      if (answered) return;
      setSelectedWho(index);
      if (question.type === 'who_said') {
        reportAnswer(index === question.correctIndex);
      }
    },
    [answered, question, reportAnswer],
  );

  // ─── Arrange handler ────────────────────────────────────────
  const handleArrangeSubmit = useCallback(() => {
    if (answered || question.type !== 'arrange') return;
    const correct = arrangeOrder.every((item, pos) => question.correctOrder[pos] === item);
    reportAnswer(correct);
  }, [answered, arrangeOrder, question, reportAnswer]);

  // Get correct answer text for wrong-answer feedback
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

  return (
    <View style={styles.root}>
      {/* Top bar */}
      <View style={[styles.topArea, { paddingTop: insets.top + spacing.sm }]}>
        <ProgressBar progress={progress} />
        <View style={styles.topBar}>
          <View style={styles.heartsRow}>
            {Array.from({ length: maxHearts }).map((_, i) => (
              <AppText key={i} style={styles.heart}>
                {i < hearts ? '❤️' : '🤍'}
              </AppText>
            ))}
          </View>
          <AppText style={styles.stageLabel}>{stageLabel}</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Question card */}
        <QuestionCard questionText={question.text} />

        <View style={styles.optionsArea}>
          {/* MCQ */}
          {question.type === 'mcq' && (
            <McqOptions
              options={question.options}
              selectedIndex={selectedMcq}
              correctIndex={answered ? question.correctIndex : null}
              disabled={answered}
              onSelect={handleMcqSelect}
            />
          )}

          {/* True/False */}
          {question.type === 'true_false' && (
            <TrueFalseOptions
              selectedAnswer={selectedTF}
              correctAnswer={answered ? question.correctAnswer : null}
              disabled={answered}
              onSelect={handleTFSelect}
            />
          )}

          {/* Fill in the Blank */}
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

          {/* Who Said It */}
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

          {/* Arrange in Order */}
          {question.type === 'arrange' && (
            <ArrangeOptions
              items={question.items}
              currentOrder={arrangeOrder}
              isSubmitted={answered}
              isCorrect={answered ? isCorrect : null}
              correctOrder={question.correctOrder}
              disabled={answered}
              onReorder={setArrangeOrder}
              onSubmit={handleArrangeSubmit}
            />
          )}
        </View>
      </ScrollView>

      {/* Next button (appears after feedback delay) */}
      {showNext && (
        <Animated.View
          entering={FadeInUp.duration(200)}
          style={[styles.buttonArea, { paddingBottom: insets.bottom + 20 }]}
        >
          <PrimaryButton title={ar.next} onPress={onNext} />
        </Animated.View>
      )}

      {/* Feedback overlay */}
      <AnswerFeedback
        isCorrect={isCorrect}
        correctAnswerText={!isCorrect ? getCorrectAnswerText() : undefined}
        explanation={!isCorrect ? question.explanation : undefined}
        visible={answered}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  topArea: {
    paddingHorizontal: spacing.lg,
    gap: 6,
    zIndex: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  heart: {
    fontSize: 14,
    textAlign: 'center',
  },
  stageLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.mutedGray,
    textAlign: 'center',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.xxl,
    paddingBottom: 100,
  },
  optionsArea: {
    marginTop: spacing.xxl,
  },
  buttonArea: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    zIndex: 20,
  },
});
