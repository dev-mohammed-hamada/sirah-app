import React, { useState, useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors, spacing, radius } from '../../theme';
import { AppText } from '../ui/app-text';
import { ar } from '../../i18n/ar';

const ITEM_HEIGHT = 52;
const ITEM_GAP = 10;
const ITEM_TOTAL = ITEM_HEIGHT + ITEM_GAP;

// Arabic number indicators
const ARABIC_NUMBERS = ['١', '٢', '٣', '٤', '٥'];

interface ArrangeOptionsProps {
  items: string[];
  currentOrder: number[];
  isSubmitted: boolean;
  isCorrect: boolean | null;
  correctOrder: number[];
  disabled: boolean;
  onReorder: (newOrder: number[]) => void;
  onSubmit: () => void;
}

export function ArrangeOptions({
  items,
  currentOrder,
  isSubmitted,
  isCorrect,
  correctOrder,
  disabled,
  onReorder,
  onSubmit,
}: ArrangeOptionsProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const moveItem = useCallback(
    (fromPos: number, toPos: number) => {
      if (fromPos === toPos || disabled) return;
      const newOrder = [...currentOrder];
      const [moved] = newOrder.splice(fromPos, 1);
      newOrder.splice(toPos, 0, moved);
      onReorder(newOrder);
    },
    [currentOrder, disabled, onReorder],
  );

  return (
    <Animated.View entering={FadeIn.delay(150).duration(200)} style={styles.container}>
      <View style={[styles.itemsList, { height: currentOrder.length * ITEM_TOTAL - ITEM_GAP }]}>
        {currentOrder.map((itemIndex, position) => (
          <DraggableItem
            key={itemIndex}
            text={items[itemIndex]}
            position={position}
            number={ARABIC_NUMBERS[position] ?? String(position + 1)}
            totalItems={currentOrder.length}
            isSubmitted={isSubmitted}
            isCorrectPosition={isSubmitted && correctOrder[position] === itemIndex}
            isWrongPosition={isSubmitted && correctOrder[position] !== itemIndex}
            isDragging={draggingIndex === position}
            disabled={disabled}
            onDragStart={() => setDraggingIndex(position)}
            onDragEnd={() => setDraggingIndex(null)}
            onMove={moveItem}
          />
        ))}
      </View>

      {!isSubmitted && !disabled && (
        <Pressable style={styles.submitButton} onPress={onSubmit}>
          <AppText style={styles.submitText}>{ar.quiz.submitOrder}</AppText>
        </Pressable>
      )}
    </Animated.View>
  );
}

interface DraggableItemProps {
  text: string;
  position: number;
  number: string;
  totalItems: number;
  isSubmitted: boolean;
  isCorrectPosition: boolean;
  isWrongPosition: boolean;
  isDragging: boolean;
  disabled: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onMove: (from: number, to: number) => void;
}

function DraggableItem({
  text,
  position,
  number,
  totalItems,
  isSubmitted,
  isCorrectPosition,
  isWrongPosition,
  isDragging,
  disabled,
  onDragStart,
  onDragEnd,
  onMove,
}: DraggableItemProps) {
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const itemScale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .enabled(!disabled && !isSubmitted)
    .onStart(() => {
      zIndex.value = 100;
      itemScale.value = withTiming(1.03, { duration: 100 });
      runOnJS(onDragStart)();
    })
    .onUpdate((e) => {
      translateY.value = e.translationY;
      // Calculate target position based on drag distance
      const rawTarget = position + Math.round(e.translationY / ITEM_TOTAL);
      const target = Math.max(0, Math.min(totalItems - 1, rawTarget));
      if (target !== position) {
        runOnJS(onMove)(position, target);
        // Reset translation since position changed
        translateY.value = 0;
      }
    })
    .onEnd(() => {
      translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      zIndex.value = 0;
      itemScale.value = withTiming(1, { duration: 100 });
      runOnJS(onDragEnd)();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: itemScale.value }],
    zIndex: zIndex.value,
    top: position * ITEM_TOTAL,
  }));

  const bgColor = isCorrectPosition
    ? colors.successGreen
    : isWrongPosition
      ? colors.errorRed
      : colors.starlightWhite;

  const textColor =
    isCorrectPosition || isWrongPosition ? colors.starlightWhite : colors.deepNightBlue;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.item,
          { backgroundColor: bgColor },
          isDragging && styles.itemDragging,
          animatedStyle,
        ]}
      >
        <View
          style={[
            styles.numberBadge,
            (isCorrectPosition || isWrongPosition) && styles.numberBadgeLight,
          ]}
        >
          <AppText
            style={[
              styles.numberText,
              (isCorrectPosition || isWrongPosition) && { color: colors.starlightWhite },
            ]}
          >
            {number}
          </AppText>
        </View>
        <AppText style={[styles.itemText, { color: textColor }]}>{text}</AppText>
        {!isSubmitted && (
          <AppText
            style={[
              styles.grip,
              (isCorrectPosition || isWrongPosition) && { color: colors.starlightWhite },
            ]}
          >
            ⋮⋮
          </AppText>
        )}
        {isCorrectPosition && <AppText style={styles.icon}>✓</AppText>}
        {isWrongPosition && <AppText style={styles.icon}>✗</AppText>}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  itemsList: {
    position: 'relative',
  },
  item: {
    position: 'absolute',
    start: 0,
    end: 0,
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.sandTrack,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  itemDragging: {
    borderColor: colors.desertGold,
    borderStyle: 'dashed',
    borderWidth: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 168, 67, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBadgeLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  numberText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.desertGold,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  grip: {
    fontSize: 16,
    color: colors.mutedGray,
    letterSpacing: 2,
  },
  icon: {
    fontSize: 18,
    color: colors.starlightWhite,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: colors.desertGold,
    height: 48,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
});
