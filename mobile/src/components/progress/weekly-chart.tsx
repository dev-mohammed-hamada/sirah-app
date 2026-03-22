import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { AppText } from '../ui/app-text';
import { colors, spacing, radius, fontFamily } from '../../theme';

interface DayData {
  label: string;
  xp: number;
  isToday: boolean;
}

interface WeeklyChartProps {
  data: DayData[];
}

const CHART_HEIGHT = 120;
const BAR_WIDTH = 24;

function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

function ChartBar({
  xp,
  maxXp,
  isToday,
  index,
}: {
  xp: number;
  maxXp: number;
  isToday: boolean;
  index: number;
}) {
  const barHeight = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  const targetHeight = xp === 0 ? 4 : Math.max(8, (xp / maxXp) * CHART_HEIGHT);

  useEffect(() => {
    const delay = index * 100;
    barHeight.value = withDelay(
      delay,
      withTiming(targetHeight, { duration: 400, easing: Easing.out(Easing.ease) }),
    );

    if (isToday && xp > 0) {
      glowOpacity.value = withDelay(
        delay + 400,
        withRepeat(
          withSequence(
            withTiming(0.6, { duration: 600, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.2, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          false,
        ),
      );
    }
  }, [xp, maxXp, isToday, index, targetHeight]);

  const barStyle = useAnimatedStyle(() => ({
    height: barHeight.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glowOpacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.bar,
        barStyle,
        xp === 0 && styles.barEmpty,
        isToday && styles.barToday,
        isToday && glowStyle,
      ]}
    />
  );
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const maxXp = Math.max(...data.map((d) => d.xp), 1);

  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>
        {data.map((day, i) => (
          <View key={i} style={styles.column}>
            <View style={styles.barContainer}>
              <ChartBar xp={day.xp} maxXp={maxXp} isToday={day.isToday} index={i} />
            </View>
            <AppText
              style={[styles.dayLabel, day.isToday && styles.dayLabelToday]}
              color={day.isToday ? colors.desertGold : colors.mutedGray}
            >
              {day.label}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: CHART_HEIGHT + 30,
  },
  column: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  barContainer: {
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: BAR_WIDTH,
    backgroundColor: colors.desertGold,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    minHeight: 4,
  },
  barEmpty: {
    backgroundColor: colors.mutedGrayLight,
  },
  barToday: {
    backgroundColor: colors.desertGoldLight,
    shadowColor: colors.desertGold,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  dayLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
  },
  dayLabelToday: {
    fontFamily: fontFamily.bold,
  },
});
